import React from 'react';
import { 
  ShieldAlert, PhoneCall, BookOpen, Cpu, Lock, FileText, Target, Scale, CheckCircle2, AlertTriangle, AlertCircle 
} from 'lucide-react';

export default function Disclaimer() {
  const sections = [
    {
      title: "1. Educational Purpose",
      icon: BookOpen,
      content: "CardioScan is strictly an educational machine-learning exploration tool created for demonstration, research, and algorithmic analysis. It is designed to illustrate how classification models evaluate tabular health data."
    },
    {
      title: "2. Model Limitations",
      icon: Cpu,
      content: "Statistical machine-learning algorithms identify numerical patterns from training data. They cannot evaluate non-quantified clinical symptoms, patient medical histories, physical examinations, or underlying genetic factors."
    },
    {
      title: "3. Dataset Limitations",
      icon: FileText,
      content: "The underlying dataset represents a specific demographic corpus of anonymized patient records. Model outputs may reflect regional demographic biases or variations not applicable to all geographic populations."
    },
    {
      title: "4. Input Limitations",
      icon: Target,
      content: "The predictions rely entirely on 11 discrete numerical user inputs. Inaccurate, rounded, or incomplete vitals will directly impact the output quality and risk probability calculation."
    },
    {
      title: "5. Responsible Use",
      icon: Scale,
      content: "CardioScan must never be used as a substitute for professional clinical judgment, medical consultation, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider."
    },
    {
      title: "6. Privacy & Data Handling",
      icon: Lock,
      content: "Inputs submitted during a scan session are processed ephemerally in memory by the local ML backend to generate the response payload. Patient vitals are not stored in external databases or distributed to third parties."
    }
  ];

  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5BC0BE]/15 border border-[#5BC0BE]/30 text-[#6FFFE9] text-xs font-black uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[#6FFFE9]" />
            IMPORTANT NOTICE & TERMS
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Before You Use <span className="text-gradient-teal">CardioScan</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          Understanding what the model can and cannot tell you.
        </p>
      </div>

      {/* Emergency Notice Banner */}
      <div className="card-cardioscan p-6 sm:p-8 border-rose-500/40 bg-gradient-to-r from-[#201018] via-[#1C2541] to-[#1C2541] relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-1 flex-1">
          <h2 className="text-lg font-extrabold text-white">Emergency Medical Disclaimer</h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            If you or someone around you is experiencing chest pressure, shortness of breath, sudden numbness, or severe health symptoms, <span className="text-rose-400 font-black underline">contact local emergency services immediately.</span>
          </p>
        </div>
        <PhoneCall className="w-24 h-24 text-rose-500/10 absolute -right-3 -bottom-3 pointer-events-none hidden md:block" />
      </div>

      {/* Mandatory Explicit Statement Box */}
      <div className="p-5 rounded-2xl bg-[#5BC0BE]/10 border border-[#5BC0BE]/30 text-center space-y-2">
        <div className="text-[#6FFFE9] font-black text-sm uppercase tracking-wider">
          Core Purpose Notice
        </div>
        <p className="text-xs sm:text-sm text-[#E2E8F0] font-medium max-w-2xl mx-auto leading-relaxed">
          CardioScan is an educational machine-learning project. Its output is not a medical diagnosis.
        </p>
      </div>

      {/* Six Disclaimer Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div key={idx} className="card-cardioscan p-6 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#5BC0BE]/15 border border-[#5BC0BE]/30 flex items-center justify-center text-[#6FFFE9]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{sec.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{sec.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Acknowledgement Bottom Bar */}
      <div className="text-center pt-6 space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-[#5BC0BE]/15 border border-[#5BC0BE]/30 text-[#6FFFE9] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">User Consent & Terms Acceptance</h4>
          <p className="text-xs text-[#94A3B8] max-w-md mx-auto leading-relaxed">
            By utilizing the CardioScan web application, you explicitly acknowledge and agree to these educational parameters and scope limitations.
          </p>
        </div>
      </div>

    </div>
  );
}
