import React from 'react';

export default function MetricCard({ 
  label, 
  value, 
  subtext, 
  icon: Icon, 
  accentColor = 'cyan',
  progressPercent = null
}) {
  const accentClasses = {
    cyan: 'text-[#00D9FF] bg-[#00D9FF]/10 border-[#00D9FF]/20',
    blue: 'text-[#2684FF] bg-[#2684FF]/10 border-[#2684FF]/20',
    purple: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20',
    emerald: 'text-[#10D9A0] bg-[#10D9A0]/10 border-[#10D9A0]/20'
  };

  const currentAccent = accentClasses[accentColor] || accentClasses.cyan;

  return (
    <div className="card-dark p-5 relative overflow-hidden group">
      {/* Top row with icon & label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
          {label}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${currentAccent} transition-all group-hover:scale-110`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Main Value */}
      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
        {value}
      </div>

      {/* Subtext */}
      {subtext && (
        <p className="text-xs text-[#64748B] font-medium">
          {subtext}
        </p>
      )}

      {/* Optional Progress Bar */}
      {progressPercent !== null && (
        <div className="mt-3 w-full bg-[#151B26] h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00D9FF] to-[#2684FF] rounded-full transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </div>
  );
}
