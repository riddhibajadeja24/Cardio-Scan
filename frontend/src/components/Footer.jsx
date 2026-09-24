import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, ShieldAlert, Cpu, HeartPulse } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#070D1F] border-t border-[#5BC0BE]/20 pt-12 pb-8 mt-20 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#5BC0BE]/15">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#5BC0BE]/20 border border-[#5BC0BE]/40 flex items-center justify-center text-[#6FFFE9]">
                <Activity className="w-4 h-4 text-[#6FFFE9]" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Cardio<span className="text-[#6FFFE9]">Scan</span>
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-md">
              Intelligent Cardiovascular Disease Classification system. Powered by a Random Forest machine learning pipeline trained on 69,970 verified patient records.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#5BC0BE]">
              <Cpu className="w-3.5 h-3.5 text-[#6FFFE9]" />
              <span>RandomForestClassifier &bull; Real-time Flask API Integration</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">CardioScan</h4>
            <ul className="space-y-2 text-xs">
              <li><NavLink to="/dashboard" className="hover:text-[#6FFFE9] transition-colors">Dashboard</NavLink></li>
              <li><NavLink to="/prediction" className="hover:text-[#6FFFE9] transition-colors">Prediction Form</NavLink></li>
              <li><NavLink to="/data-insights" className="hover:text-[#6FFFE9] transition-colors">Data Insights</NavLink></li>
              <li><NavLink to="/model-info" className="hover:text-[#6FFFE9] transition-colors">Model Info</NavLink></li>
              <li><NavLink to="/disclaimer" className="hover:text-[#6FFFE9] transition-colors">Disclaimer</NavLink></li>
            </ul>
          </div>

          {/* Legal Notice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Notice</h4>
            <div className="p-3.5 rounded-xl bg-[#1C2541] border border-[#5BC0BE]/20 text-[11px] space-y-1.5 text-[#94A3B8]">
              <div className="flex items-center gap-1.5 text-[#6FFFE9] font-bold">
                <ShieldAlert className="w-4 h-4 text-[#5BC0BE]" />
                <span>Educational ML Project</span>
              </div>
              <p className="leading-relaxed">
                CardioScan is an educational machine-learning project. Its output is not a medical diagnosis.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <p>© {new Date().getFullYear()} CardioScan ML Project. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-[#5BC0BE]/10 text-[#6FFFE9] border border-[#5BC0BE]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6FFFE9] animate-ping"></span>
              Live Backend Connected
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
