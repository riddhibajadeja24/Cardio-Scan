import React from 'react';
import { Activity } from 'lucide-react';

export function LoadingSkeleton({ text = "Loading model insights..." }) {
  return (
    <div className="card-dark p-12 flex flex-col items-center justify-center text-center space-y-4 my-8">
      <div className="w-12 h-12 rounded-2xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] animate-bounce">
        <Activity className="w-6 h-6 animate-heartbeat" />
      </div>
      <p className="text-sm font-semibold text-[#94A3B8] animate-pulse">{text}</p>
      <div className="w-48 bg-[#151B26] h-1.5 rounded-full overflow-hidden">
        <div className="h-full bg-[#00D9FF] w-1/3 animate-pulse rounded-full"></div>
      </div>
    </div>
  );
}

export function ErrorMessage({ title = "Unable to connect to backend service", message, onRetry }) {
  return (
    <div className="card-dark p-8 border border-rose-500/30 bg-rose-950/20 text-center space-y-4 my-8 max-w-lg mx-auto">
      <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
        !
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-xs text-[#94A3B8] leading-relaxed">
        {message || "The backend prediction engine may be offline or starting up. Please verify the Python Flask API is running."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold hover:bg-rose-500/30 transition-all cursor-pointer"
        >
          TRY AGAIN
        </button>
      )}
    </div>
  );
}
