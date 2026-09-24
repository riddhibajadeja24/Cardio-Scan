import os
import time
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'cardio_model.pkl')
CLEANED_DATA_PATH = os.path.join(BASE_DIR, 'data', 'cardio_cleaned.csv')

model = None
cleaned_df = None
cached_insights = None
cached_model_info = None

def load_ml_assets():
    global model, cleaned_df, cached_insights, cached_model_info
    
    # Load Model
    if os.path.exists(MODEL_PATH):
        try:
            model = joblib.load(MODEL_PATH)
            print(f"[INFO] Loaded ML model ({type(model).__name__}) from {MODEL_PATH}")
        except Exception as e:
            print(f"[ERROR] Failed to load model: {e}")
            model = None

    # Load Cleaned CSV
    if os.path.exists(CLEANED_DATA_PATH):
        try:
            cleaned_df = pd.read_csv(CLEANED_DATA_PATH)
            print(f"[INFO] Loaded CSV dataset ({len(cleaned_df)} rows) from {CLEANED_DATA_PATH}")
        except Exception as e:
            print(f"[ERROR] Failed to load CSV: {e}")
            cleaned_df = None

    # Calculate real data insights if CSV is available
    if cleaned_df is not None:
        raw_total = 70000
        final_total = len(cleaned_df)
        dropped_count = raw_total - final_total
        
        cardio_counts = cleaned_df['cardio'].value_counts().to_dict()
        class_0 = int(cardio_counts.get(0, 35004))
        class_1 = int(cardio_counts.get(1, 34966))

        # Correlation Matrix for key numeric columns
        corr_cols = ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'cardio']
        corr_df = cleaned_df[corr_cols].corr().round(2)
        corr_variables = [c.upper() for c in corr_cols]
        corr_matrix = corr_df.values.tolist()

        # Age distribution
        age_bins = [30, 40, 45, 50, 55, 60, 65, 70]
        age_cut = pd.cut(cleaned_df['age'], bins=age_bins)
        age_grouped = cleaned_df.groupby([age_cut, 'cardio'], observed=False).size().unstack(fill_value=0)
        
        age_distribution = []
        for idx_interval, row in age_grouped.iterrows():
            if pd.notnull(idx_interval):
                label = f"{int(idx_interval.left)}-{int(idx_interval.right)}"
                age_distribution.append({
                    "age_group": label,
                    "healthy": int(row.get(0, 0)),
                    "disease": int(row.get(1, 0))
                })

        # Cholesterol breakdown
        chol_grouped = cleaned_df.groupby(['cholesterol', 'cardio']).size().unstack(fill_value=0)
        chol_labels = {1: "Normal", 2: "Above Normal", 3: "Well Above Normal"}
        cholesterol_breakdown = []
        for lvl in [1, 2, 3]:
            if lvl in chol_grouped.index:
                row = chol_grouped.loc[lvl]
                cholesterol_breakdown.append({
                    "category": chol_labels[lvl],
                    "level": lvl,
                    "healthy": int(row.get(0, 0)),
                    "disease": int(row.get(1, 0))
                })

        cached_insights = {
            "success": True,
            "dataset_metrics": {
                "raw_records": raw_total,
                "records_dropped": dropped_count,
                "final_dataset": final_total,
                "class_0_count": class_0,
                "class_1_count": class_1,
                "class_0_percent": round(class_0 / final_total * 100, 2),
                "class_1_percent": round(class_1 / final_total * 100, 2),
                "missing_values": int(cleaned_df.isnull().sum().sum()),
                "duplicate_rows": int(cleaned_df.duplicated().sum())
            },
            "correlation_matrix": {
                "variables": corr_variables,
                "matrix": corr_matrix
            },
            "age_distribution": age_distribution,
            "cholesterol_levels": cholesterol_breakdown,
            "blood_pressure_summary": {
                "systolic_mean": round(float(cleaned_df['ap_hi'].mean()), 1),
                "diastolic_mean": round(float(cleaned_df['ap_lo'].mean()), 1),
                "systolic_range": [float(cleaned_df['ap_hi'].min()), float(cleaned_df['ap_hi'].max())],
                "diastolic_range": [float(cleaned_df['ap_lo'].min()), float(cleaned_df['ap_lo'].max())]
            }
        }

    # Calculate real model evaluation metrics if model & CSV available
    if model is not None and cleaned_df is not None:
        try:
            feature_names = list(model.feature_names_in_)
            X = cleaned_df[feature_names]
            y = cleaned_df['cardio']
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            
            y_pred = model.predict(X_test)
            acc = float(accuracy_score(y_test, y_pred))
            prec = float(precision_score(y_test, y_pred))
            rec = float(recall_score(y_test, y_pred))
            f1 = float(f1_score(y_test, y_pred))
            cm = confusion_matrix(y_test, y_pred)
            tn, fp, fn, tp = [int(v) for v in cm.ravel()]

            importances = []
            if hasattr(model, 'feature_importances_'):
                raw_imps = model.feature_importances_
                feat_pairs = sorted(zip(feature_names, raw_imps), key=lambda x: x[1], reverse=True)
                filtered_pairs = [(f, imp) for f, imp in feat_pairs if f not in ('id', 'age')]
                total_imp = sum(imp for _, imp in filtered_pairs)
                label_map = {
                    'ap_hi': 'Systolic BP (ap_hi)',
                    'ap_lo': 'Diastolic BP (ap_lo)',
                    'cholesterol': 'Cholesterol',
                    'weight': 'Weight',
                    'height': 'Height',
                    'gluc': 'Glucose',
                    'active': 'Physical Activity',
                    'smoke': 'Smoking',
                    'gender': 'Gender',
                    'alco': 'Alcohol Intake',
                    'age_years': 'Age'
                }
                for f, imp in filtered_pairs:
                    norm_w = (imp / total_imp * 100) if total_imp > 0 else 0
                    importances.append({
                        "feature": f,
                        "label": label_map.get(f, f.upper().replace('_', ' ')),
                        "weight": round(float(norm_w), 2)
                    })

            cached_model_info = {
                "success": True,
                "model_name": type(model).__name__,
                "algorithm": "Random Forest Classifier",
                "validation_accuracy": round(acc * 100, 2),
                "precision": round(prec * 100, 2),
                "recall": round(rec * 100, 2),
                "f1_score": round(f1 * 100, 2),
                "training_records": len(X_train),
                "test_records": len(X_test),
                "confusion_matrix": {
                    "total_test_samples": len(X_test),
                    "true_negative": {"count": tn, "rate_percent": round(tn / len(X_test) * 100, 1)},
                    "false_positive": {"count": fp, "rate_percent": round(fp / len(X_test) * 100, 1)},
                    "false_negative": {"count": fn, "rate_percent": round(fn / len(X_test) * 100, 1)},
                    "true_positive": {"count": tp, "rate_percent": round(tp / len(X_test) * 100, 1)}
                },
                "feature_importance": importances,
                "hyperparameters": getattr(model, 'get_params', lambda: {})()
            }
        except Exception as e:
            print(f"[WARNING] Model evaluation calculation failed: {e}")

load_ml_assets()

@app.route('/', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "CardioScan ML Backend API",
        "model_loaded": model is not None,
        "dataset_loaded": cleaned_df is not None,
        "version": "2.0.0"
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    start_time = time.time()
    
    if model is None:
        return jsonify({
            "success": False,
            "error": "CardioScan ML model is not loaded on backend server."
        }), 500

    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"success": False, "error": "No JSON payload provided."}), 400

        age = float(data.get('age', 50))
        height = float(data.get('height', 165))
        weight = float(data.get('weight', 70))
        ap_hi = float(data.get('ap_hi', 120))
        ap_lo = float(data.get('ap_lo', 80))
        gender = int(data.get('gender', 1))
        cholesterol = int(data.get('cholesterol', 1))
        gluc = int(data.get('gluc', 1))
        smoke = int(data.get('smoke', 0))
        alco = int(data.get('alco', 0))
        active = int(data.get('active', 1))

        # Real Backend Validation
        if age <= 0 or age > 120:
            return jsonify({"success": False, "error": "Age must be between 1 and 120 years."}), 400
        if height < 50 or height > 250:
            return jsonify({"success": False, "error": "Height must be between 50 cm and 250 cm."}), 400
        if weight < 20 or weight > 300:
            return jsonify({"success": False, "error": "Weight must be between 20 kg and 300 kg."}), 400
        if ap_hi < 50 or ap_hi > 250:
            return jsonify({"success": False, "error": "Systolic BP must be between 50 and 250 mmHg."}), 400
        if ap_lo < 30 or ap_lo > 200:
            return jsonify({"success": False, "error": "Diastolic BP must be between 30 and 200 mmHg."}), 400
        if ap_hi < ap_lo:
            return jsonify({"success": False, "error": "Systolic BP cannot be lower than Diastolic BP."}), 400

        input_dict = {
            'id': 0,
            'age': age,
            'gender': gender,
            'height': height,
            'weight': weight,
            'ap_hi': ap_hi,
            'ap_lo': ap_lo,
            'cholesterol': cholesterol,
            'gluc': gluc,
            'smoke': smoke,
            'alco': alco,
            'active': active,
            'age_years': int(age)
        }
        input_df = pd.DataFrame([input_dict])

        prediction_val = int(model.predict(input_df)[0])
        
        probabilities = [0.5, 0.5]
        if hasattr(model, 'predict_proba'):
            raw_probs = model.predict_proba(input_df)[0]
            probabilities = [float(raw_probs[0]), float(raw_probs[1])]

        disease_prob = probabilities[1]
        confidence_val = probabilities[prediction_val]
        bmi = round(weight / ((height / 100) ** 2), 1)
        latency_ms = round((time.time() - start_time) * 1000, 2)

        return jsonify({
            "success": True,
            "prediction": prediction_val,
            "prediction_label": "Cardiovascular Disease Risk Detected" if prediction_val == 1 else "No Cardiovascular Disease Risk Detected",
            "probability": round(disease_prob, 4),
            "probability_percent": round(disease_prob * 100, 1),
            "confidence_percent": round(confidence_val * 100, 1),
            "risk_level": "High Risk" if disease_prob >= 0.5 else "Low Risk",
            "model_used": type(model).__name__,
            "latency_ms": latency_ms,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
            "patient_summary": {
                "age": int(age),
                "height": int(height),
                "weight": float(weight),
                "ap_hi": int(ap_hi),
                "ap_lo": int(ap_lo),
                "gender": "Male" if gender == 2 else "Female",
                "cholesterol": "Normal" if cholesterol == 1 else ("Above Normal" if cholesterol == 2 else "Well Above Normal"),
                "gluc": "Normal" if gluc == 1 else ("Above Normal" if gluc == 2 else "Well Above Normal"),
                "smoke": "Yes" if smoke == 1 else "No",
                "alco": "Yes" if alco == 1 else "No",
                "active": "Yes" if active == 1 else "No",
                "bmi": bmi
            }
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Error executing CardioScan model: {str(e)}"
        }), 500

@app.route('/api/model-info', methods=['GET'])
def get_model_info():
    if cached_model_info:
        return jsonify(cached_model_info)
    return jsonify({"success": False, "error": "Model evaluation data unavailable"}), 500

@app.route('/api/data-insights', methods=['GET'])
def get_data_insights():
    if cached_insights:
        return jsonify(cached_insights)
    return jsonify({"success": False, "error": "Data insights unavailable"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting CardioScan ML Server on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
