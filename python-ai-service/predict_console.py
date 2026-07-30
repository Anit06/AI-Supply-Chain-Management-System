"""
predict_console.py
===================
Step 2 of 2 — console app that predicts NEXT MONTH's stock demand.

It automatically looks up, from the history saved by train_model.py:
    - previous month's demand (this year)
    - same month last year's demand
so you only need to pick the warehouse, product, and which month
you're predicting for.

Run train_model.py first (only needs to be done once, or whenever you
retrain / add new months of data). Then run this file each time you
want a prediction:
    python predict_console.py
"""

import os
import sys
import json
import pandas as pd
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "demand_model_monthly.pkl")
OPTIONS_PATH = os.path.join(BASE_DIR, "model_options.json")

MONTH_SEASON = {
    12: "Winter", 1: "Winter", 2: "Winter",
    3: "Summer", 4: "Summer", 5: "Summer", 6: "Summer",
    7: "Monsoon", 8: "Monsoon", 9: "Monsoon",
    10: "Autumn", 11: "Autumn",
}


def load_model_and_options():
    if not os.path.exists(MODEL_PATH) or not os.path.exists(OPTIONS_PATH):
        sys.exit("Model files not found. Run train_model.py first.")
    model = joblib.load(MODEL_PATH)
    with open(OPTIONS_PATH) as f:
        options = json.load(f)
    return model, options


def choose_from_list(prompt, items):
    print(prompt)
    for i, item in enumerate(items, start=1):
        print(f"  {i}. {item}")
    while True:
        choice = input("Enter number: ").strip()
        if choice.isdigit() and 1 <= int(choice) <= len(items):
            return items[int(choice) - 1]
        print("Invalid choice, try again.")


def ask_int(prompt, min_val=None, max_val=None):
    while True:
        value = input(prompt).strip()
        if value.isdigit():
            n = int(value)
            if (min_val is None or n >= min_val) and (max_val is None or n <= max_val):
                return n
        print("Please enter a valid number" + (f" between {min_val} and {max_val}" if min_val else "") + ".")


def find_history_value(history, warehouse, product, year, month):
    for h in history:
        if (h["warehouseName"] == warehouse and h["productName"] == product
                and h["year"] == year and h["month"] == month):
            return h["monthlyDemand"]
    return None


def predict_once(model, options):
    history = options["history"]
    month_names = options["monthNames"]

    warehouses = list(options["warehouses"].keys())
    warehouse = choose_from_list("\nSelect a warehouse:", warehouses)

    products_info = options["warehouses"][warehouse]
    product_names = [p["product"] for p in products_info]
    product = choose_from_list("\nSelect a product:", product_names)
    category = next(p["category"] for p in products_info if p["product"] == product)
    print(f"Category: {category}")

    print("\nWhich month are you predicting demand FOR?")
    target_year = ask_int("Enter the year (e.g. 2026): ", min_val=2000, max_val=2100)
    target_month = ask_int("Enter the month number (1-12): ", min_val=1, max_val=12)
    print(f"Predicting for: {month_names[target_month - 1]} {target_year}")

    # previous month (this year, unless target month is January)
    prev_month = target_month - 1 if target_month > 1 else 12
    prev_year = target_year if target_month > 1 else target_year - 1

    # same month, last year
    same_month_last_year = target_year - 1

    previous_month_demand = find_history_value(history, warehouse, product, prev_year, prev_month)
    same_month_last_year_demand = find_history_value(history, warehouse, product, same_month_last_year, target_month)

    if previous_month_demand is None:
        print(f"\nNo saved history found for {month_names[prev_month-1]} {prev_year}.")
        previous_month_demand = ask_int(f"Enter {month_names[prev_month-1]} {prev_year} demand manually: ")
    else:
        print(f"Found previous month ({month_names[prev_month-1]} {prev_year}) demand: {previous_month_demand:.0f}")

    if same_month_last_year_demand is None:
        print(f"\nNo saved history found for {month_names[target_month-1]} {same_month_last_year}.")
        same_month_last_year_demand = ask_int(
            f"Enter {month_names[target_month-1]} {same_month_last_year} demand manually: "
        )
    else:
        print(f"Found same month last year ({month_names[target_month-1]} {same_month_last_year}) "
              f"demand: {same_month_last_year_demand:.0f}")

    row = pd.DataFrame([{
        "warehouseName": warehouse,
        "productName": product,
        "category": category,
        "targetSeason": MONTH_SEASON[target_month],
        "previousMonthDemand": previous_month_demand,
        "sameMonthLastYearDemand": same_month_last_year_demand,
    }])

    prediction = model.predict(row)[0]
    print(f"\n>>> Predicted stock demand for {month_names[target_month-1]} {target_year}: {prediction:.0f} units\n")


def main():
    model, options = load_model_and_options()
    print("=== Next-Month Stock Demand Predictor (Console) ===")

    while True:
        predict_once(model, options)
        again = input("Make another prediction? (y/n): ").strip().lower()
        if again != "y":
            print("Goodbye!")
            break


if __name__ == "__main__":
    main()
