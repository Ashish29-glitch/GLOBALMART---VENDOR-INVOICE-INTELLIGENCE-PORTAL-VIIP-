import joblib
import pandas as pd

MODEL_PATH = "models/predict_freight_model.pkl"


def load_model():
    with open(MODEL_PATH, "rb") as f:
        model = joblib.load(f)
    return model


def predict_freight_cost(input_data):
    model = load_model()

    input_df = pd.DataFrame(input_data)

    # 🔥 Model expects only Dollars
    input_df = input_df.rename(columns={
        "invoice_dollars": "Dollars"
    })

    input_df = input_df[["Dollars"]]

    input_df["Predicted_Freight"] = model.predict(input_df).round()

    return input_df[["Predicted_Freight"]]