import React, { useState, useEffect } from 'react';
import { 
  Cpu, Sliders, ShieldCheck, CheckCircle2, Award, Layers, BarChart2, BookOpen, HelpCircle 
} from 'lucide-react';
import { getModelInfo } from '../api/modelApi';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

export default function ModelInfo() {
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getModelInfo();
        if (res && res.success) {
          setModelData(res);
        }
      } catch (err) {
        console.error('Failed to load model info from API:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const info = modelData || {
    algorithm: "Random Forest Classifier",
    model_name: "RandomForestClassifier",
    validation_accuracy: 72.55,
    precision: 77.29,
    recall: 64.15,
    f1_score: 70.11,
    training_records: 55976,
    test_records: 13994,
    confusion_matrix: {
      true_positive: { count: 4506, rate_percent: 32.2 },
      false_positive: { count: 1324, rate_percent: 9.5 },
      false_negative: { count: 2518, rate_percent: 18.0 },
      true_negative: { count: 5646, rate_percent: 40.3 }
    },
    feature_importance: [
      { feature: 'ap_hi', label: 'Systolic BP (ap_hi)', weight: 50.94 },
      { feature: 'ap_lo', label: 'Diastolic BP (ap_lo)', weight: 21.75 },
      { feature: 'cholesterol', label: 'Cholesterol', weight: 10.64 },
      { feature: 'weight', label: 'Weight', weight: 6.36 },
      { feature: 'height', label: 'Height', weight: 2.91 },
      { feature: 'gluc', label: 'Glucose', weight: 1.53 },
      { feature: 'active', label: 'Physical Activity', weight: 0.79 },
      { feature: 'smoke', label: 'Smoking', weight: 0.55 },
      { feature: 'gender', label: 'Gender', weight: 0.47 },
      { feature: 'alco', label: 'Alcohol Intake', weight: 0.43 }
    ],
    hyperparameters: {
      n_estimators: 50,
      max_depth: 10,
      criterion: "gini",
      random_state: 42
    }
  };

  const explanations = [
    {
      q: "What does this model do?",
      a: "The CardioScan model predicts whether a patient is at risk of cardiovascular disease based on standard clinical measurements and lifestyle factors."
    },
    {
      q: "How was it trained?",
      a: "It was trained on an 80/20 stratified split of 69,970 verified clinical records using a Random Forest Classifier ensemble of decision trees."
    },
    {
      q: "What information does it use?",
      a: "It analyzes 11 key biomarkers including Systolic Blood Pressure (ap_hi), Diastolic Blood Pressure (ap_lo), Cholesterol levels, Weight, Height, Glucose, Age, and Lifestyle choices."
    },
    {
      q: "How is performance measured?",
      a: "Performance is evaluated on 13,994 unseen test samples across standard metrics: Accuracy (72.55%), Precision (77.29%), Recall (64.15%), and F1 Score (70.11%)."
    },
    {
      q: "How should the result be interpreted?",
      a: "The result represents a statistical probability output from a trained ML classifier. It serves as an educational risk profiling tool and is not a medical diagnosis."
    }
  ];

  if (loading) {
    return <LoadingSkeleton text="Retrieving trained model metrics & confusion matrix..." />;
  }

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#5BC0BE]/20">
        <div className="space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-[#5BC0BE]/15 border border-[#5BC0BE]/30 text-[#6FFFE9] text-xs font-black uppercase tracking-wider">
            {info.algorithm}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
            Model <span className="text-gradient-teal">Architecture & Info</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
            Detailed evaluation, hyperparameter specifications, feature weights, and confusion matrix of the trained CardioScan ML engine.
          </p>
        </div>

        {/* Validation Accuracy Hero Card */}
        <div className="card-cardioscan p-6 min-w-[240px] text-center space-y-1 border-[#6FFFE9]/40 bg-gradient-to-b from-[#1C2541] to-[#151D35]">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE] block">TEST ACCURACY</span>
          <div className="text-4xl font-black text-[#6FFFE9] tracking-tight">
            {info.validation_accuracy}%
          </div>
          <span className="inline-block mt-2 text-[10px] font-bold px-3 py-0.5 rounded-full bg-[#5BC0BE]/20 text-[#6FFFE9] border border-[#5BC0BE]/40">
            Validated Benchmark
          </span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="card-cardioscan p-5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Precision</span>
          <div className="text-3xl font-black text-white">{info.precision}%</div>
          <p className="text-[11px] text-[#94A3B8]">Positive predictive value</p>
        </div>

        <div className="card-cardioscan p-5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Recall</span>
          <div className="text-3xl font-black text-white">{info.recall}%</div>
          <p className="text-[11px] text-[#94A3B8]">True positive sensitivity</p>
        </div>

        <div className="card-cardioscan p-5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">F1 Score</span>
          <div className="text-3xl font-black text-[#6FFFE9]">{info.f1_score}%</div>
          <p className="text-[11px] text-[#94A3B8]">Harmonic mean score</p>
        </div>

        <div className="card-cardioscan p-5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Test Records</span>
          <div className="text-3xl font-black text-white">{info.test_records.toLocaleString()}</div>
          <p className="text-[11px] text-[#94A3B8]">20% Holdout dataset</p>
        </div>

      </div>

      {/* Feature Importance & Confusion Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Feature Importance Bar Chart */}
        <div className="lg:col-span-6 card-cardioscan p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#6FFFE9]" />
              Feature Importance Weights
            </h3>
            <p className="text-xs text-[#94A3B8]">Calculated importance for each biomarker in tree splits.</p>
          </div>

          <div className="space-y-3.5">
            {info.feature_importance.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">{item.label}</span>
                  <span className="text-[#6FFFE9] font-mono">{item.weight}%</span>
                </div>
                <div className="w-full bg-[#0B132B] h-2.5 rounded-full overflow-hidden border border-[#5BC0BE]/20">
                  <div 
                    className="h-full bg-gradient-to-r from-[#5BC0BE] to-[#6FFFE9] rounded-full"
                    style={{ width: `${item.weight}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confusion Matrix Display */}
        <div className="lg:col-span-6 card-cardioscan p-6 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#6FFFE9]" />
              Confusion Matrix ({info.test_records.toLocaleString()} Test Samples)
            </h3>
            <p className="text-xs text-[#94A3B8]">Empirical evaluation on unseen test dataset holdout.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* True Positive */}
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-1">
              <div className="text-3xl font-black text-emerald-400">
                {info.confusion_matrix.true_positive.count.toLocaleString()}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 block">TRUE POSITIVE</span>
              <span className="text-[11px] text-emerald-400/80 block font-mono">{info.confusion_matrix.true_positive.rate_percent}%</span>
            </div>

            {/* False Positive */}
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-center space-y-1">
              <div className="text-3xl font-black text-amber-400">
                {info.confusion_matrix.false_positive.count.toLocaleString()}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block">FALSE POSITIVE</span>
              <span className="text-[11px] text-amber-400/80 block font-mono">{info.confusion_matrix.false_positive.rate_percent}%</span>
            </div>

            {/* False Negative */}
            <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-center space-y-1">
              <div className="text-3xl font-black text-rose-400">
                {info.confusion_matrix.false_negative.count.toLocaleString()}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300 block">FALSE NEGATIVE</span>
              <span className="text-[11px] text-rose-400/80 block font-mono">{info.confusion_matrix.false_negative.rate_percent}%</span>
            </div>

            {/* True Negative */}
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/40 text-center space-y-1">
              <div className="text-3xl font-black text-blue-400">
                {info.confusion_matrix.true_negative.count.toLocaleString()}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-300 block">TRUE NEGATIVE</span>
              <span className="text-[11px] text-blue-400/80 block font-mono">{info.confusion_matrix.true_negative.rate_percent}%</span>
            </div>
          </div>

          {/* Hyperparameters Subcard */}
          <div className="p-4 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 text-xs text-[#94A3B8] space-y-1">
            <span className="text-[#6FFFE9] font-extrabold uppercase text-[10px] block">MODEL HYPERPARAMETERS</span>
            <p>n_estimators: <strong className="text-white">50</strong> &bull; max_depth: <strong className="text-white">10</strong> &bull; criterion: <strong className="text-white">gini</strong> &bull; random_state: <strong className="text-white">42</strong></p>
          </div>
        </div>

      </div>

      {/* SECTION 5: Beginner-Friendly Model Explanation */}
      {/* <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2.5 border-b border-[#5BC0BE]/20 pb-3">
          <div className="w-8 h-8 rounded-xl bg-[#5BC0BE]/15 border border-[#5BC0BE]/30 flex items-center justify-center text-[#6FFFE9]">
            <BookOpen className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Model Explanation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {explanations.map((item, idx) => (
            <div key={idx} className="card-cardioscan p-6 space-y-2">
              <h3 className="text-sm font-bold text-[#6FFFE9] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#5BC0BE]" />
                {item.q}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section> */}

    </div>
  );
}
