import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, ArrowRight, Database, Sliders, ShieldCheck, HeartPulse, 
  Stethoscope, FileSpreadsheet, Cpu, Layers, CheckCircle2, ChevronRight, BarChart3, ScanLine
} from 'lucide-react';
import { getDataInsights } from '../api/insightsApi';
import { getModelInfo } from '../api/modelApi';

export default function Dashboard() {
  const navigate = useNavigate();
  const [insights, setInsights] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [insightsRes, modelRes] = await Promise.allSettled([
          getDataInsights(),
          getModelInfo()
        ]);
        if (insightsRes.status === 'fulfilled' && insightsRes.value?.success) {
          setInsights(insightsRes.value);
        }
        if (modelRes.status === 'fulfilled' && modelRes.value?.success) {
          setModelInfo(modelRes.value);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  // Real backend dataset stats & model metrics
  const metrics = insights?.dataset_metrics || {
    raw_records: 70000,
    records_dropped: 30,
    final_dataset: 69970,
    class_0_count: 35004,
    class_0_percent: 50.03,
    class_1_count: 34966,
    class_1_percent: 49.97,
    missing_values: 0,
    duplicate_rows: 0
  };

  const modelStats = modelInfo || {
    algorithm: "Random Forest Classifier",
    model_name: "RandomForestClassifier",
    validation_accuracy: 72.55,
    precision: 77.29,
    recall: 64.15,
    f1_score: 70.11,
    training_records: 55976,
    test_records: 13994
  };

  const processSteps = [
    {
      step: "01",
      title: "Patient Input",
      desc: "Collect essential health biomarkers including blood pressure, age, cholesterol, and physical metrics.",
      icon: Stethoscope
    },
    {
      step: "02",
      title: "Data Validation",
      desc: "Range checks verify input bounds and physiological logic (e.g. Systolic >= Diastolic).",
      icon: ShieldCheck
    },
    {
      step: "03",
      title: "Preprocessing",
      desc: "Transforms patient age into exact years and normalizes features for optimal model ingestion.",
      icon: Layers
    },
    {
      step: "04",
      title: "ML Model Execution",
      desc: "RandomForestClassifier ensemble evaluates tree splits across 11 biomarkers.",
      icon: Cpu
    },
    {
      step: "05",
      title: "Classification Output",
      desc: "Generates risk probability percentage and confidence rating within milliseconds.",
      icon: FileSpreadsheet
    }
  ];

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 pb-8 max-w-4xl mx-auto relative">
        {/* Glow ambient background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#5BC0BE]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5BC0BE]/10 border border-[#5BC0BE]/30 text-[#6FFFE9] text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <Activity className="w-4 h-4 animate-heartbeat text-[#6FFFE9]" />
            CardioScan ML Pipeline Active
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Understand Cardiovascular <br />
          <span className="text-gradient-teal">Risk Classification</span>
        </h1>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-normal">
          An intelligent machine-learning system for cardiovascular disease classification. Driven by real clinical data and verified ML ensemble algorithms.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/prediction')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#6FFFE9] text-[#0B132B] font-black text-sm tracking-wide hover:bg-[#5BC0BE] hover:shadow-xl hover:shadow-[#5BC0BE]/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <ScanLine className="w-4 h-4 text-[#0B132B]" />
            <span>Start Scan</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/model-info')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1C2541] text-white font-bold text-sm tracking-wide border border-[#5BC0BE]/30 hover:border-[#6FFFE9] hover:bg-[#3A506B]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4 text-[#5BC0BE]" />
            <span>Explore Model</span>
          </button>
        </div>
      </section>

      {/* SECTION 1: CardioScan Overview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#5BC0BE]/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#5BC0BE]/15 border border-[#5BC0BE]/30 flex items-center justify-center text-[#6FFFE9]">
              <Activity className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">CardioScan Overview</h2>
          </div>
          <span className="text-xs text-[#5BC0BE] font-mono">System Architecture</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-cardioscan p-6 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Classification Type</span>
            <div className="text-2xl font-black text-white">Binary Risk</div>
            <p className="text-xs text-[#94A3B8]">0 (No Disease) vs 1 (Risk Detected)</p>
          </div>

          <div className="card-cardioscan p-6 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Target Variable</span>
            <div className="text-2xl font-black text-[#6FFFE9]">cardio</div>
            <p className="text-xs text-[#94A3B8]">Supervised clinical target label</p>
          </div>

          <div className="card-cardioscan p-6 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Active ML Model</span>
            <div className="text-2xl font-black text-white">{modelStats.algorithm}</div>
            <p className="text-xs text-[#94A3B8]">Scikit-learn tree ensemble model</p>
          </div>

          <div className="card-cardioscan p-6 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Dataset Size</span>
            <div className="text-2xl font-black text-[#6FFFE9]">{metrics.final_dataset.toLocaleString()}</div>
            <p className="text-xs text-[#94A3B8]">Cleaned anonymized clinical records</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Dataset Snapshot */}
      {/* <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#5BC0BE]/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#5BC0BE]/15 border border-[#5BC0BE]/30 flex items-center justify-center text-[#6FFFE9]">
              <Database className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Dataset Snapshot</h2>
          </div>
          <span className="text-xs text-[#5BC0BE] font-mono">Real CSV Statistics</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="card-cardioscan p-5 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Total Records</span>
            <div className="text-2xl font-black text-white">{metrics.final_dataset.toLocaleString()}</div>
            <span className="text-[11px] text-[#5BC0BE]">Purged bounds</span>
          </div>

          <div className="card-cardioscan p-5 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Features</span>
            <div className="text-2xl font-black text-[#6FFFE9]">11 Input</div>
            <span className="text-[11px] text-[#94A3B8]">Biomarkers</span>
          </div>

          <div className="card-cardioscan p-5 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Class 0 (No Risk)</span>
            <div className="text-2xl font-black text-emerald-400">{metrics.class_0_count.toLocaleString()}</div>
            <span className="text-[11px] text-[#94A3B8]">{metrics.class_0_percent}% of dataset</span>
          </div>

          <div className="card-cardioscan p-5 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Class 1 (Risk)</span>
            <div className="text-2xl font-black text-rose-400">{metrics.class_1_count.toLocaleString()}</div>
            <span className="text-[11px] text-[#94A3B8]">{metrics.class_1_percent}% of dataset</span>
          </div>

          <div className="card-cardioscan p-5 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Missing Values</span>
            <div className="text-2xl font-black text-white">{metrics.missing_values}</div>
            <span className="text-[11px] text-emerald-400">100% Complete</span>
          </div>

          <div className="card-cardioscan p-5 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Duplicate Rows</span>
            <div className="text-2xl font-black text-[#6FFFE9]">{metrics.duplicate_rows}</div>
            <span className="text-[11px] text-[#94A3B8]">Purged from raw</span>
          </div>

        </div>
      </section>  */}

      {/* SECTION 3: From Data to Classification */}
      {/* <section className="space-y-6 pt-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            From Data to <span className="text-[#6FFFE9]">Classification</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            An end-to-end transparent process transforming patient measurements into real-time health risk probability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative pt-2">
          {processSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="card-cardioscan p-5 relative flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5BC0BE]/15 border border-[#5BC0BE]/30 flex items-center justify-center text-[#6FFFE9] group-hover:bg-[#5BC0BE]/30 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-[#3A506B]/50 group-hover:text-[#5BC0BE]/40 transition-colors font-mono">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{s.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section> */}

      {/* SECTION 4: Explore CardioScan */}
      {/* <section className="space-y-6 pt-6"> */}
        {/* <div className="flex items-center justify-between border-b border-[#5BC0BE]/20 pb-3">
          <h2 className="text-xl font-bold text-white tracking-tight">Explore CardioScan</h2>
          <span className="text-xs text-[#5BC0BE] font-mono">Platform Navigation</span>
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
          
          {/* Card 1: Run a Scan */}
          {/* <div 
            onClick={() => navigate('/prediction')}
            className="card-cardioscan p-6 cursor-pointer group hover:border-[#6FFFE9] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5BC0BE]/20 border border-[#5BC0BE]/40 flex items-center justify-center text-[#6FFFE9] group-hover:scale-110 transition-transform">
                <ScanLine className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white group-hover:text-[#6FFFE9] transition-colors flex items-center justify-between">
                  <span>Run a Scan</span>
                  <ChevronRight className="w-5 h-5 text-[#5BC0BE] group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Enter patient vitals and health factors into the prediction engine to execute ML risk classification.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-[#5BC0BE]/15 flex items-center justify-between text-xs font-bold text-[#6FFFE9]">
              <span>Go to Prediction Form</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div> */}

          {/* Card 2: Explore Data */}
          {/* <div 
            onClick={() => navigate('/data-insights')}
            className="card-cardioscan p-6 cursor-pointer group hover:border-[#6FFFE9] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5BC0BE]/20 border border-[#5BC0BE]/40 flex items-center justify-center text-[#6FFFE9] group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white group-hover:text-[#6FFFE9] transition-colors flex items-center justify-between">
                  <span>Explore Data</span>
                  <ChevronRight className="w-5 h-5 text-[#5BC0BE] group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Analyze the 69,970 clinical records corpus, correlation matrices, age distributions, and cholesterol levels.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-[#5BC0BE]/15 flex items-center justify-between text-xs font-bold text-[#6FFFE9]">
              <span>View Data Insights</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div> */}

          {/* Card 3: Understand the Model */}
          {/* <div 
            onClick={() => navigate('/model-info')}
            className="card-cardioscan p-6 cursor-pointer group hover:border-[#6FFFE9] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5BC0BE]/20 border border-[#5BC0BE]/40 flex items-center justify-center text-[#6FFFE9] group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white group-hover:text-[#6FFFE9] transition-colors flex items-center justify-between">
                  <span>Understand the Model</span>
                  <ChevronRight className="w-5 h-5 text-[#5BC0BE] group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Review RandomForestClassifier accuracy, feature importance weights, confusion matrix, and training parameters.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-[#5BC0BE]/15 flex items-center justify-between text-xs font-bold text-[#6FFFE9]">
              <span>View Model Info</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div> */}

        {/* </div> */}
      {/* </section> */}

    </div>
  );
}
