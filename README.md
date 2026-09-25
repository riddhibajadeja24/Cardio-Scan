# CardioScan 🫀 Cardiovascular Disease Classification

## 🎯 What is CardioScan?

**CardioScan** is a Machine Learning-based web application that classifies cardiovascular disease risk using patient health and clinical parameters. It combines a trained ML model with a modern React interface and backend API to provide an easy-to-use prediction system.

**What it does:**

1. Enter patient health parameters such as age, blood pressure, height, weight, cholesterol, and glucose.
2. The ML model analyzes the provided health data.
3. Returns a cardiovascular disease classification result.
4. Displays the result through a clean and responsive web interface.

## ✨ Key Features

* 🫀 Cardiovascular disease classification
* 🤖 Machine Learning-based prediction
* 📊 Dataset insights and visualizations
* 📈 Model performance evaluation
* 🔌 Backend API integration
* 📱 Fully responsive interface
* 🎨 Modern medical-tech UI design

## 📊 Live Demo

| [Try CardioScan](https://cardio-scan-mu.vercel.app/) |
| -------------------------------------------------------- |

## 🏗️ Tech Stack

```text
Frontend: React.js + Vite + CSS
Backend: Python + Flask
Machine Learning: Scikit-learn + Pandas + NumPy
Model: Classification Model + Joblib
Visualization: Recharts
Deployment: Vercel + Backend Hosting
```

## 📁 Project Structure

```text
CardioScan/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app.py
│   ├── model.pkl
│   ├── cardio_train.csv
│   └── requirements.txt
│
├── notebook/
│   └── CardioScan_ML.ipynb
│
└── README.md
```

## 🚀 Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## 📈 Machine Learning

The project follows a complete ML workflow:

```text
Dataset
   ↓
Data Preprocessing
   ↓
Feature Preparation
   ↓
Train/Test Split
   ↓
Model Training
   ↓
Model Evaluation
   ↓
Prediction
```

### Evaluation Metrics

| Metric           | Purpose                              |
| ---------------- | ------------------------------------ |
| Accuracy         | Overall correct predictions          |
| Precision        | Correct positive predictions         |
| Recall           | Ability to identify positive cases   |
| F1-Score         | Balance between precision and recall |
| Confusion Matrix | Prediction performance by class      |

## 📊 Dataset

The cardiovascular dataset contains **70,000 patient records** with health-related attributes such as:

* Age
* Gender
* Height
* Weight
* Systolic Blood Pressure
* Diastolic Blood Pressure
* Cholesterol
* Glucose
* Cardiovascular Disease Target

## 🎯 Project Objective

The objective of CardioScan is to demonstrate the practical use of **Machine Learning and Web Development** for cardiovascular disease classification while providing a simple and interactive user experience.

## ⚠️ Disclaimer

CardioScan is developed for **academic and educational purposes only**. The prediction is not a medical diagnosis and should not replace professional medical advice, diagnosis, or treatment.

## 👨‍💻 Author

**Riddhiba Jadeja**

[GitHub](https://github.com/riddhibajadeja24) • [LinkedIn](https://www.linkedin.com/in/riddhiba-jadeja-b68428377)
