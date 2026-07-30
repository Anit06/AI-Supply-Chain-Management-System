from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import json
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "demand_model_monthly.pkl")
OPTIONS_PATH = os.path.join(BASE_DIR, "model_options.json")

MONTH_SEASON = {
    12: "Winter",
    1: "Winter",
    2: "Winter",
    3: "Summer",
    4: "Summer",
    5: "Summer",
    6: "Summer",
    7: "Monsoon",
    8: "Monsoon",
    9: "Monsoon",
    10: "Autumn",
    11: "Autumn"
}

# ----------------------------
# Load Model
# ----------------------------

try:
    model = joblib.load(MODEL_PATH)

    with open(OPTIONS_PATH, "r") as f:
        options = json.load(f)

    print("AI Model Loaded Successfully")

except Exception as e:

    model = None
    options = {}

    print("Unable to Load Model")
    print(e)


# ----------------------------
# Home
# ----------------------------

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "service": "AI Demand Prediction Microservice",
        "status": "Running"
    })


# ----------------------------
# Health Check
# ----------------------------

@app.route("/health", methods=["GET"])
def health():

    if model is None:

        return jsonify({
            "status": "Model Not Loaded"
        }), 500

    return jsonify({
        "status": "Healthy"
    })


# ----------------------------
# Warehouses
# ----------------------------

@app.route("/warehouses", methods=["GET"])
def warehouses():

    return jsonify({
        "warehouses": list(options.get("warehouses", {}).keys())
    })


# ----------------------------
# Products By Warehouse
# ----------------------------

@app.route("/products/<warehouse>", methods=["GET"])
def products(warehouse):

    products = options.get("warehouses", {}).get(warehouse, [])

    return jsonify({
        "warehouse": warehouse,
        "products": products
    })


# ----------------------------
# Prediction
# ----------------------------

@app.route("/predict", methods=["POST"])
def predict():

    if model is None:

        return jsonify({
            "success": False,
            "message": "Model not loaded"
        }), 500

    try:

        data = request.get_json()

        warehouse = data["warehouseName"]
        product = data["productName"]
        category = data["category"]

        previous = float(data["previousMonthDemand"])
        lastYear = float(data["sameMonthLastYearDemand"])

        if "targetSeason" in data:

            season = data["targetSeason"]

        else:

            month = int(data["targetMonth"])

            season = MONTH_SEASON.get(month, "Summer")

        input_df = pd.DataFrame([{

            "warehouseName": warehouse,

            "productName": product,

            "category": category,

            "targetSeason": season,

            "previousMonthDemand": previous,

            "sameMonthLastYearDemand": lastYear

        }])

        prediction = model.predict(input_df)[0]

        return jsonify({

            "success": True,

            "warehouse": warehouse,

            "product": product,

            "category": category,

            "predictedDemand": round(float(prediction), 2),

            "unit": "Units"

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# ----------------------------
# Model Information
# ----------------------------

@app.route("/model-info", methods=["GET"])
def model_info():

    return jsonify({

        "model": "Random Forest Regressor",

        "features": [

            "warehouseName",

            "productName",

            "category",

            "targetSeason",

            "previousMonthDemand",

            "sameMonthLastYearDemand"

        ],

        "prediction": "Next Month Demand"

    })


# ----------------------------
# Start Server
# ----------------------------

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5001,

        debug=True

    )