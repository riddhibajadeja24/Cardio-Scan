import React from 'react';

export default function StatusBadge({ text, type = 'cyan', icon: Icon }) {
  const styles = {
    cyan: 'bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30',
    blue: 'bg-[#2684FF]/10 text-[#2684FF] border-[#2684FF]/30',
    purple: 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30',
    amber: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30',
    emerald: 'bg-[#10D9A0]/10 text-[#10D9A0] border-[#10D9A0]/30',
    rose: 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/30'
  };

  const selectedStyle = styles[type] || styles.cyan;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border ${selectedStyle} backdrop-blur-sm shadow-sm`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{text}</span>
    </span>
  );
}
