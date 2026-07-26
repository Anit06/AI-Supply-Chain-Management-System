"""
train_model.py
===============
Step 1 of 2 — trains a NEXT-MONTH stock demand model using:
    - previousMonthDemand      (last month's demand, this year)
    - sameMonthLastYearDemand  (this same calendar month, last year)
    - warehouse / product / category / target month & season

Data required: monthly_sales_history.csv, with at least 13 months of
history per warehouse-product combo (so a "previous month" and a
"same month last year" both exist for at least one target month).
Columns expected:
    warehouseName, productName, category, year, month, monthName,
    season, monthlyDemand

Run this file whenever you want to (re)train:
    python train_model.py

It produces two files (used later by predict_console.py):
    - demand_model_monthly.pkl   (the trained model)
    - model_options.json         (valid warehouse/product choices +
                                   each combo's monthly demand history,
                                   so the console app can look up
                                   "previous month" / "same month last
                                   year" automatically)

Requirements (one time):
    pip install pandas scikit-learn joblib
"""

import os
import sys
import json
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

# ---------------------------------------------------------------------
# Config — change DATA_PATH to wherever your CSV lives
# ---------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(BASE_DIR, r'C:\Users\DELL\Desktop\2.1 AI-MAIN-Supply-Chain-Management-System\python-ai-service\data\monthly_sales_history.csv')
MODEL_PATH = os.path.join(BASE_DIR, "demand_model_monthly.pkl")
OPTIONS_PATH = os.path.join(BASE_DIR, "model_options.json")

MONTH_NAMES = ["January","February","March","April","May","June",
               "July","August","September","October","November","December"]

MONTH_SEASON = {
    12: "Winter", 1: "Winter", 2: "Winter",
    3: "Summer", 4: "Summer", 5: "Summer", 6: "Summer",
    7: "Monsoon", 8: "Monsoon", 9: "Monsoon",
    10: "Autumn", 11: "Autumn",
}

CATEGORICAL_FEATURES = ["warehouseName", "productName", "category", "targetSeason"]
NUMERIC_FEATURES = ["previousMonthDemand", "sameMonthLastYearDemand"]
TARGET = "monthlyDemand"


def build_lag_features(df):
    """
    For every (warehouse, product, year, month) row, look up:
      - the demand 1 month earlier (previousMonthDemand)
      - the demand 12 months earlier, i.e. same month last year
        (sameMonthLastYearDemand)
    Rows where either lookup isn't available (not enough history yet)
    are dropped.
    """
    df = df.sort_values(["warehouseName", "productName", "year", "month"]).copy()
    df["periodIndex"] = df["year"] * 12 + df["month"]

    lookup = df.set_index(["warehouseName", "productName", "periodIndex"])["monthlyDemand"]

    def get_lag(row, months_back):
        key = (row["warehouseName"], row["productName"], row["periodIndex"] - months_back)
        return lookup.get(key, None)

    df["previousMonthDemand"] = df.apply(lambda r: get_lag(r, 1), axis=1)
    df["sameMonthLastYearDemand"] = df.apply(lambda r: get_lag(r, 12), axis=1)
    df["targetSeason"] = df["month"].map(MONTH_SEASON)

    before = len(df)
    df = df.dropna(subset=["previousMonthDemand", "sameMonthLastYearDemand"])
    print(f"Usable rows after building lag features: {len(df)} / {before} "
          f"(rows dropped are months without a full year of prior history)")

    return df


def train_model():
    if not os.path.exists(DATA_PATH):
        sys.exit(f"Could not find {DATA_PATH}. Update DATA_PATH at the top of this file.")

    raw = pd.read_csv(DATA_PATH)
    df = build_lag_features(raw)

    if len(df) < 10:
        sys.exit("Not enough historical rows to train on. You need at least ~13 months "
                  "of monthly history per warehouse/product combo.")

    X = df[CATEGORICAL_FEATURES + NUMERIC_FEATURES]
    y = df[TARGET]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL_FEATURES),
        ],
        remainder="passthrough",
    )

    model = Pipeline(steps=[
        ("preprocess", preprocessor),
        ("regressor", RandomForestRegressor(n_estimators=300, random_state=42)),
    ])

    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    mae = mean_absolute_error(y_test, preds)
    print(f"Model trained. Test MAE: {mae:.2f} units")

    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

    # Save each combo's full monthly history + valid choices, so the
    # console app can auto-fill "previous month" and "same month last
    # year" instead of asking the user to type them in by hand.
    combos = raw[["warehouseName", "productName", "category"]].drop_duplicates()
    options = {"warehouses": {}}
    for warehouse, group in combos.groupby("warehouseName"):
        options["warehouses"][warehouse] = [
            {"product": row["productName"], "category": row["category"]}
            for _, row in group.iterrows()
        ]

    history = []
    for _, row in raw.iterrows():
        history.append({
            "warehouseName": row["warehouseName"],
            "productName": row["productName"],
            "year": int(row["year"]),
            "month": int(row["month"]),
            "monthlyDemand": float(row["monthlyDemand"]),
        })
    options["history"] = history
    options["monthNames"] = MONTH_NAMES

    with open(OPTIONS_PATH, "w") as f:
        json.dump(options, f, indent=2)
    print(f"Options saved to {OPTIONS_PATH}")


if __name__ == "__main__":
    train_model()
