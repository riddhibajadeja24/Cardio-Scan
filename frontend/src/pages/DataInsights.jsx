import React, { useState, useEffect } from 'react';
import { 
  Database, Filter, CheckCircle2, AlertTriangle, Layers, Grid, BarChart3, Activity 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { getDataInsights } from '../api/insightsApi';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

export default function DataInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCell, setActiveCell] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getDataInsights();
        if (res && res.success) {
          setData(res);
        }
      } catch (err) {
        console.error('Failed to load data insights from API:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const metrics = data?.dataset_metrics || {
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

  const bpSummary = data?.blood_pressure_summary || {
    systolic_mean: 127.6,
    diastolic_mean: 82.2,
    systolic_range: [50, 250],
    diastolic_range: [30, 200]
  };

  const ageData = data?.age_distribution || [
    { age_group: '30-40', healthy: 2621, disease: 780 },
    { age_group: '40-45', healthy: 5903, disease: 3171 },
    { age_group: '45-50', healthy: 6963, disease: 5175 },
    { age_group: '50-55', healthy: 9190, disease: 9146 },
    { age_group: '55-60', healthy: 7353, disease: 9820 },
    { age_group: '60-65', healthy: 2970, disease: 6874 }
  ];

  const cholesterolData = data?.cholesterol_levels || [
    { category: 'Normal', level: 1, healthy: 29314, disease: 23044 },
    { category: 'Above Normal', level: 2, healthy: 3799, disease: 5750 },
    { category: 'Well Above Normal', level: 3, healthy: 1891, disease: 6172 }
  ];

  const pieData = [
    { name: 'Class 0: No Disease', value: metrics.class_0_count, color: '#5BC0BE' },
    { name: 'Class 1: Risk Detected', value: metrics.class_1_count, color: '#6FFFE9' }
  ];

  const corrVariables = data?.correlation_matrix?.variables || [
    'AGE', 'GENDER', 'HEIGHT', 'WEIGHT', 'AP_HI', 'AP_LO', 'CHOLESTEROL', 'GLUC', 'CARDIO'
  ];
  
  const corrMatrix = data?.correlation_matrix?.matrix || [
    [1.00, -0.02, -0.08,  0.05,  0.19,  0.13,  0.15,  0.10,  0.24],
    [-0.02, 1.00,  0.51,  0.16,  0.06,  0.06, -0.04, -0.02,  0.01],
    [-0.08, 0.51,  1.00,  0.30,  0.01,  0.02, -0.05, -0.02, -0.01],
    [0.05,  0.16,  0.30,  1.00,  0.26,  0.22,  0.14,  0.11,  0.18],
    [0.19,  0.06,  0.01,  0.26,  1.00,  0.77,  0.18,  0.09,  0.41],
    [0.13,  0.06,  0.02,  0.22,  0.77,  1.00,  0.14,  0.06,  0.30],
    [0.15, -0.04, -0.05,  0.14,  0.18,  0.14,  1.00,  0.45,  0.22],
    [0.10, -0.02, -0.02,  0.11,  0.09,  0.06,  0.45,  1.00,  0.09],
    [0.24,  0.01, -0.01,  0.18,  0.41,  0.30,  0.22,  0.09,  1.00]
  ];

  const getCellBg = (val) => {
    if (val === 1.0) return 'bg-[#6FFFE9] text-[#0B132B] font-black';
    if (val >= 0.4) return 'bg-[#5BC0BE] text-[#0B132B] font-bold';
    if (val >= 0.2) return 'bg-[#5BC0BE]/50 text-white';
    if (val > 0) return 'bg-[#5BC0BE]/20 text-[#94A3B8]';
    if (val < 0) return 'bg-[#3A506B]/40 text-[#94A3B8]';
    return 'bg-[#1C2541] text-[#64748B]';
  };

  if (loading) {
    return <LoadingSkeleton text="Analyzing dataset statistics and correlation matrices..." />;
  }

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#5BC0BE]/10 border border-[#5BC0BE]/30 text-[#6FFFE9] text-xs font-bold uppercase">
            EXPLORATORY DATA ANALYSIS
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Data <span className="text-gradient-teal">Insights</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl">
          Statistical distribution, clinical relationships, and variable correlations derived directly from the CardioScan cleaned dataset.
        </p>
      </div>

      {/* SECTION 1: Dataset Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="card-cardioscan p-5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Raw Dataset</span>
          <div className="text-2xl font-black text-white">{metrics.raw_records.toLocaleString()}</div>
          <p className="text-[11px] text-[#94A3B8]">Original CSV rows</p>
        </div>

        <div className="card-cardioscan p-5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Cleaned Dataset</span>
          <div className="text-2xl font-black text-[#6FFFE9]">{metrics.final_dataset.toLocaleString()}</div>
          <p className="text-[11px] text-[#94A3B8]">Valid medical rows</p>
        </div>

        <div className="card-cardioscan p-5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Missing Values</span>
          <div className="text-2xl font-black text-emerald-400">{metrics.missing_values}</div>
          <p className="text-[11px] text-emerald-400 font-semibold">Zero Nulls</p>
        </div>

        <div className="card-cardioscan p-5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Duplicate Rows</span>
          <div className="text-2xl font-black text-[#6FFFE9]">{metrics.duplicate_rows}</div>
          <p className="text-[11px] text-[#94A3B8]">Unique IDs</p>
        </div>

        <div className="card-cardioscan p-5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Class 0 Ratio</span>
          <div className="text-2xl font-black text-white">{metrics.class_0_percent}%</div>
          <p className="text-[11px] text-[#94A3B8]">{metrics.class_0_count.toLocaleString()} samples</p>
        </div>

        <div className="card-cardioscan p-5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5BC0BE]">Class 1 Ratio</span>
          <div className="text-2xl font-black text-[#6FFFE9]">{metrics.class_1_percent}%</div>
          <p className="text-[11px] text-[#94A3B8]">{metrics.class_1_count.toLocaleString()} samples</p>
        </div>

      </div>

      {/* SECTION 2 & 3: Class Distribution + Blood Pressure Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Class Distribution Donut Chart */}
        <div className="lg:col-span-5 card-cardioscan p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-[#6FFFE9]" />
              Class Balance (cardio)
            </h3>
            <p className="text-xs text-[#94A3B8]">Cardiovascular disease target variable ratio.</p>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C2541', borderColor: 'rgba(91,192,190,0.3)', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 text-center">
              <span className="text-[10px] font-extrabold uppercase text-[#5BC0BE] block">NO RISK (0)</span>
              <span className="text-base font-black text-white">{metrics.class_0_count.toLocaleString()}</span>
              <span className="text-[11px] text-[#94A3B8] block">({metrics.class_0_percent}%)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 text-center">
              <span className="text-[10px] font-extrabold uppercase text-[#6FFFE9] block">RISK DETECTED (1)</span>
              <span className="text-base font-black text-white">{metrics.class_1_count.toLocaleString()}</span>
              <span className="text-[11px] text-[#94A3B8] block">({metrics.class_1_percent}%)</span>
            </div>
          </div>
        </div>

        {/* Blood Pressure Summary Card */}
        <div className="lg:col-span-7 card-cardioscan p-6 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#6FFFE9]" />
              Blood Pressure Baseline Analysis
            </h3>
            <p className="text-xs text-[#94A3B8]">Systolic (ap_hi) and Diastolic (ap_lo) pressure distribution statistics.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/30 space-y-2">
              <span className="text-xs font-extrabold text-[#5BC0BE] uppercase block">Systolic Blood Pressure (ap_hi)</span>
              <div className="text-3xl font-black text-white">{bpSummary.systolic_mean} <span className="text-xs text-[#94A3B8]">mmHg (Mean)</span></div>
              <p className="text-xs text-[#94A3B8]">Cleaned Range: {bpSummary.systolic_range[0]} - {bpSummary.systolic_range[1]} mmHg</p>
            </div>

            <div className="p-5 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/30 space-y-2">
              <span className="text-xs font-extrabold text-[#6FFFE9] uppercase block">Diastolic Blood Pressure (ap_lo)</span>
              <div className="text-3xl font-black text-white">{bpSummary.diastolic_mean} <span className="text-xs text-[#94A3B8]">mmHg (Mean)</span></div>
              <p className="text-xs text-[#94A3B8]">Cleaned Range: {bpSummary.diastolic_range[0]} - {bpSummary.diastolic_range[1]} mmHg</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B132B] border border-[#5BC0BE]/20 text-xs text-[#94A3B8] leading-relaxed">
            <strong className="text-[#6FFFE9]">Clinical Insight:</strong> Systolic blood pressure (ap_hi) demonstrates the strongest positive correlation (+0.41) with cardiovascular disease in the entire feature set.
          </div>
        </div>

      </div>

      {/* SECTION 4: Interactive Correlation Heatmap */}
      <div className="card-cardioscan p-6 sm:p-8 space-y-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5BC0BE]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5BC0BE]/20 border border-[#5BC0BE]/40 flex items-center justify-center text-[#6FFFE9]">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Correlation Matrix</h2>
              <p className="text-xs text-[#94A3B8]">Interactive heatmap displaying Pearson correlation values between clinical features.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold text-[#94A3B8]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#6FFFE9]"></span> Identity (1.0)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#5BC0BE]"></span> High Correlation</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#5BC0BE]/30"></span> Low Correlation</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="min-w-[660px]">
          <div className="grid grid-cols-10 gap-1.5 text-center text-xs">
            {/* Header Labels */}
            <div className="p-2"></div>
            {corrVariables.map((v, i) => (
             <div key={i} className="p-2 font-bold text-[10px] text-[#5BC0BE] uppercase">{v}</div> 
            ))} 

            {/* Matrix Rows */}
            {corrVariables.map((rowVar, rIdx) => (
              <React.Fragment key={rIdx}>
                <div className="p-2 font-bold text-[10px] text-[#5BC0BE] uppercase flex items-center justify-end">
                  {rowVar}
                  </div> 
                  {corrMatrix[rIdx].map((val, cIdx) => ( 
                    <div 
                      key={cIdx} 
                      onMouseEnter={() => setActiveCell({ row: rowVar, col: corrVariables[cIdx], val })} 
                      onMouseLeave={() => setActiveCell(null)} 
                      className={`p-2.5 rounded-lg text-xs transition-all cursor-pointer ${getCellBg(val)} hover:scale-105 shadow-sm`} 
                    > 
                      {val.toFixed(2)} 
                    </div> 
                  ))} 
                </React.Fragment> 
              ))} 
            </div> 

          {/* Hover Tooltip display */}
           {activeCell && ( 
             <div className="mt-4 p-3 rounded-xl bg-[#0B132B] border border-[#6FFFE9]/40 text-xs text-center text-white animate-fadeIn"> 
               Correlation between <span className="text-[#6FFFE9] font-bold">{activeCell.row}</span> and <span className="text-[#6FFFE9] font-bold">{activeCell.col}</span> is <span className="text-white font-black">{activeCell.val.toFixed(2)}</span> 
              </div> 
            )} 
          </div> 
        </div>  

      {/* SECTION 5 & 6: Age Distribution & Cholesterol Breakdown Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Age Distribution Chart */}
        <div className="card-cardioscan p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Age Group Distribution (Years)</h3>
            <p className="text-xs text-[#94A3B8]">Disease prevalence increases noticeably in age cohorts above 50 years.</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ageData}>
                <defs>
                  <linearGradient id="colorDisease" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6FFFE9" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6FFFE9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5BC0BE" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#5BC0BE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="age_group" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C2541', borderColor: 'rgba(91,192,190,0.3)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="disease" name="Disease Risk (1)" stroke="#6FFFE9" fillOpacity={1} fill="url(#colorDisease)" />
                <Area type="monotone" dataKey="healthy" name="Healthy (0)" stroke="#5BC0BE" fillOpacity={1} fill="url(#colorHealthy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cholesterol Breakdown Chart */}
        <div className="card-cardioscan p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Cholesterol Level Breakdown</h3>
            <p className="text-xs text-[#94A3B8]">Higher cholesterol categories (Above / Well Above Normal) exhibit elevated risk rates.</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cholesterolData}>
                <XAxis dataKey="category" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C2541', borderColor: 'rgba(91,192,190,0.3)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="disease" name="Disease Risk (1)" fill="#6FFFE9" radius={[6, 6, 0, 0]} />
                <Bar dataKey="healthy" name="Healthy (0)" fill="#5BC0BE" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
