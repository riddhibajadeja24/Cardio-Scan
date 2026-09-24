import React, { useState } from 'react';
import { 
  Activity, Zap, HeartPulse, User, Gauge, Dumbbell, 
  ShieldAlert, AlertTriangle, RefreshCw, ScanLine, CheckCircle2 
} from 'lucide-react';
import { submitPrediction } from '../api/predictionApi';

export default function Prediction() {
  const [formData, setFormData] = useState({
    age: '50',
    height: '165',
    weight: '70',
    ap_hi: '120',
    ap_lo: '80',
    gender: '1', // 1: Female, 2: Male
    cholesterol: '1', // 1: Normal, 2: Above Normal, 3: Well Above
    gluc: '1',
    smoke: '0',
    alco: '0',
    active: '1'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const age = parseFloat(formData.age);
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    const ap_hi = parseFloat(formData.ap_hi);
    const ap_lo = parseFloat(formData.ap_lo);

    if (isNaN(age) || age < 1 || age > 120) {
      newErrors.age = 'Age must be between 1 and 120 years.';
    }
    if (isNaN(height) || height < 50 || height > 250) {
      newErrors.height = 'Height must be between 50 and 250 cm.';
    }
    if (isNaN(weight) || weight < 20 || weight > 300) {
      newErrors.weight = 'Weight must be between 20 and 300 kg.';
    }
    if (isNaN(ap_hi) || ap_hi < 50 || ap_hi > 250) {
      newErrors.ap_hi = 'Systolic BP must be between 50 and 250 mmHg.';
    }
    if (isNaN(ap_lo) || ap_lo < 30 || ap_lo > 200) {
      newErrors.ap_lo = 'Diastolic BP must be between 30 and 200 mmHg.';
    }
    if (!isNaN(ap_hi) && !isNaN(ap_lo) && ap_hi < ap_lo) {
      newErrors.ap_hi = 'Systolic BP cannot be lower than Diastolic BP.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setApiError(null);

    const payload = {
      age: parseFloat(formData.age),
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      ap_hi: parseFloat(formData.ap_hi),
      ap_lo: parseFloat(formData.ap_lo),
      gender: parseInt(formData.gender),
      cholesterol: parseInt(formData.cholesterol),
      gluc: parseInt(formData.gluc),
      smoke: parseInt(formData.smoke),
      alco: parseInt(formData.alco),
      active: parseInt(formData.active)
    };

    try {
      const response = await submitPrediction(payload);
      if (response && response.success) {
        setResult(response);
      } else {
        setApiError(response.error || 'Failed to execute CardioScan prediction.');
      }
    } catch (err) {
      setApiError(err.message || 'Unable to connect to the CardioScan prediction API.');
    } finally {
      setLoading(false);
    }
  };

  // Live preview values
  const previewAge = formData.age || '--';
  const previewHeight = formData.height || '--';
  const previewWeight = formData.weight || '--';
  const previewBP = `${formData.ap_hi || '--'} / ${formData.ap_lo || '--'}`;
  const bmiVal = (parseFloat(formData.height) && parseFloat(formData.weight)) 
    ? (parseFloat(formData.weight) / ((parseFloat(formData.height) / 100) ** 2)).toFixed(1) 
    : '--';

  const cholText = formData.cholesterol === '1' ? 'Normal' : (formData.cholesterol === '2' ? 'Above Normal' : 'Well Above Normal');
  const glucText = formData.gluc === '1' ? 'Normal' : (formData.gluc === '2' ? 'Above Normal' : 'Well Above Normal');

  return (
    <div className="space-y-10 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Heading */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5BC0BE]/10 border border-[#5BC0BE]/30 text-[#6FFFE9] text-xs font-extrabold uppercase tracking-wider">
            <ScanLine className="w-4 h-4 text-[#6FFFE9]" />
            LIVE ML PREDICTION ENGINE
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Cardiovascular <span className="text-gradient-teal">Scan</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Enter the patient attributes required by the CardioScan model.
        </p>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Patient Measurements */}
        <div className="lg:col-span-7 card-cardioscan p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#5BC0BE]/20">
            <div className="w-10 h-10 rounded-xl bg-[#5BC0BE]/15 border border-[#5BC0BE]/30 flex items-center justify-center text-[#6FFFE9]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Patient Measurements</h2>
              <p className="text-xs text-[#94A3B8]">Provide accurate vitals for ML model evaluation</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Group 1: Patient Biometrics */}
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#6FFFE9]" />
                BIOMETRICS & PHYSICAL METRICS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Age */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">AGE (YEARS)</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="50"
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  />
                  {errors.age && <p className="text-[11px] text-rose-400 mt-1 font-semibold">{errors.age}</p>}
                </div>

                {/* Height */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">HEIGHT (CM)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="165"
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  />
                  {errors.height && <p className="text-[11px] text-rose-400 mt-1 font-semibold">{errors.height}</p>}
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">WEIGHT (KG)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="70"
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  />
                  {errors.weight && <p className="text-[11px] text-rose-400 mt-1 font-semibold">{errors.weight}</p>}
                </div>
              </div>
            </div>

            {/* Group 2: Blood Pressure Vitals */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE] flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-[#6FFFE9]" />
                BLOOD PRESSURE VITALS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Systolic BP */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">SYSTOLIC BP (MMHG)</label>
                  <input
                    type="number"
                    name="ap_hi"
                    value={formData.ap_hi}
                    onChange={handleInputChange}
                    placeholder="120"
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  />
                  {errors.ap_hi && <p className="text-[11px] text-rose-400 mt-1 font-semibold">{errors.ap_hi}</p>}
                </div>

                {/* Diastolic BP */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">DIASTOLIC BP (MMHG)</label>
                  <input
                    type="number"
                    name="ap_lo"
                    value={formData.ap_lo}
                    onChange={handleInputChange}
                    placeholder="80"
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  />
                  {errors.ap_lo && <p className="text-[11px] text-rose-400 mt-1 font-semibold">{errors.ap_lo}</p>}
                </div>
              </div>
            </div>

            {/* Group 3: Clinical & Lifestyle Factors */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE] flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-[#6FFFE9]" />
                CLINICAL LABS & LIFESTYLE
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">GENDER</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  >
                    <option value="1">Female</option>
                    <option value="2">Male</option>
                  </select>
                </div>

                {/* Cholesterol */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">CHOLESTEROL</label>
                  <select
                    name="cholesterol"
                    value={formData.cholesterol}
                    onChange={handleInputChange}
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  >
                    <option value="1">Normal</option>
                    <option value="2">Above Normal</option>
                    <option value="3">Well Above Normal</option>
                  </select>
                </div>

                {/* Glucose */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">GLUCOSE</label>
                  <select
                    name="gluc"
                    value={formData.gluc}
                    onChange={handleInputChange}
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  >
                    <option value="1">Normal</option>
                    <option value="2">Above Normal</option>
                    <option value="3">Well Above Normal</option>
                  </select>
                </div>

                {/* Smoke */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">SMOKING</label>
                  <select
                    name="smoke"
                    value={formData.smoke}
                    onChange={handleInputChange}
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                {/* Alcohol */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">ALCOHOL INTAKE</label>
                  <select
                    name="alco"
                    value={formData.alco}
                    onChange={handleInputChange}
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                {/* Physical Activity */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase">PHYSICAL ACTIVITY</label>
                  <select
                    name="active"
                    value={formData.active}
                    onChange={handleInputChange}
                    className="w-full bg-[#0B132B] border border-[#5BC0BE]/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FFFE9] focus:ring-1 focus:ring-[#6FFFE9] transition-all"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Run CardioScan Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#6FFFE9] text-[#0B132B] font-black text-sm tracking-wider uppercase hover:bg-[#5BC0BE] hover:shadow-xl hover:shadow-[#5BC0BE]/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Activity className="w-5 h-5 animate-spin text-[#0B132B]" />
                  <span>Scanning patient data...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-current" />
                  <span>Run CardioScan</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT PANEL: Scan Summary & Dynamic ML Result */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Scan Summary Card */}
          {/* <div className="card-cardioscan p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#5BC0BE]/15 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#6FFFE9]">Scan Summary</h3>
              <span className="text-[10px] text-[#5BC0BE] font-mono">Live Input Monitor</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 space-y-0.5">
                <span className="text-[#94A3B8] text-[10px] font-extrabold uppercase block">AGE</span>
                <span className="text-white font-black text-sm">{previewAge} years</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 space-y-0.5">
                <span className="text-[#94A3B8] text-[10px] font-extrabold uppercase block">HEIGHT / WEIGHT</span>
                <span className="text-white font-black text-sm">{previewHeight} cm / {previewWeight} kg</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 space-y-0.5">
                <span className="text-[#94A3B8] text-[10px] font-extrabold uppercase block">BLOOD PRESSURE</span>
                <span className="text-[#6FFFE9] font-black text-sm">{previewBP} mmHg</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 space-y-0.5">
                <span className="text-[#94A3B8] text-[10px] font-extrabold uppercase block">CALCULATED BMI</span>
                <span className="text-white font-black text-sm">{bmiVal} kg/m²</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 space-y-0.5">
                <span className="text-[#94A3B8] text-[10px] font-extrabold uppercase block">CHOLESTEROL</span>
                <span className="text-white font-bold text-xs">{cholText}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 space-y-0.5">
                <span className="text-[#94A3B8] text-[10px] font-extrabold uppercase block">GLUCOSE</span>
                <span className="text-white font-bold text-xs">{glucText}</span>
              </div>
            </div>
          </div> */}

          {/* Dynamic CardioScan Result Card */}
          <div className="card-cardioscan p-6 sm:p-8 min-h-[340px] flex flex-col items-center justify-center text-center relative overflow-hidden">
            
            {/* Error State */}
            {apiError ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Backend Connection Error</h3>
                  <p className="text-xs text-rose-300 mt-1 max-w-xs mx-auto">{apiError}</p>
                </div>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-200 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all flex items-center gap-1.5 mx-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retry Scan
                </button>
              </div>
            ) : loading ? (
              /* Scanning Loading State */
              <div className="space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-[#5BC0BE]/20 border border-[#6FFFE9]/40 flex items-center justify-center text-[#6FFFE9] mx-auto glow-teal-sm">
                  <Activity className="w-8 h-8 animate-heartbeat text-[#6FFFE9]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Scanning patient data...</h3>
                  <p className="text-xs text-[#94A3B8] mt-1">Evaluating vitals using RandomForestClassifier model...</p>
                </div>
              </div>
            ) : result ? (
              /* ML Prediction Result Display */
              <div className="space-y-5 w-full animate-fadeIn">
                
                {/* Result Tag */}
                <div className="flex justify-center">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase border shadow-md ${
                    result.prediction === 1 
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/40' 
                      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                  }`}>
                    CardioScan Result
                  </span>
                </div>

                {/* Prediction Heading */}
                <div>
                  <h3 className={`text-2xl font-black tracking-tight ${
                    result.prediction === 1 ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {result.prediction_label}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1.5">
                    Machine-Learning Classification &bull; Latency: <span className="text-[#6FFFE9] font-bold">{result.latency_ms}ms</span>
                  </p>
                </div>

                {/* Risk Gauge Bar */}
                <div className="w-full bg-[#0B132B] p-4 rounded-xl border border-[#5BC0BE]/20 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#94A3B8]">Disease Probability Score</span>
                    <span className={result.prediction === 1 ? 'text-rose-400' : 'text-emerald-400'}>
                      {result.probability_percent}% ({result.risk_level})
                    </span>
                  </div>
                  <div className="w-full bg-[#1C2541] h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        result.prediction === 1 
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500' 
                          : 'bg-gradient-to-r from-[#5BC0BE] to-[#6FFFE9]'
                      }`}
                      style={{ width: `${result.probability_percent}%` }}
                    />
                  </div>
                </div>

                {/* Mandatory Educational Disclaimer */}
                <div className="p-3.5 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 text-[11px] text-[#94A3B8] leading-relaxed text-left flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-[#5BC0BE] shrink-0 mt-0.5" />
                  <span>This result is generated by a machine-learning model and is not a medical diagnosis.</span>
                </div>

              </div>
            ) : (
              /* Standby State */
              <div className="space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-[#1C2541] border border-[#5BC0BE]/30 flex items-center justify-center text-[#5BC0BE] mx-auto">
                  <HeartPulse className="w-8 h-8 opacity-70 text-[#6FFFE9]" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-white">SYSTEM READY</h3>
                  <p className="text-xs text-[#94A3B8] max-w-xs mx-auto mt-1 leading-relaxed">
                    Fill in the patient measurements on the left panel and click <strong className="text-[#6FFFE9]">Run CardioScan</strong>.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
