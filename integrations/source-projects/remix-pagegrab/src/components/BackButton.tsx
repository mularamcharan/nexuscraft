import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

interface BackButtonProps {
  onBack: () => void;
  label?: string;
  fallbackLabel?: string;
  showHomeShortcut?: boolean;
  onHome?: () => void;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onBack,
  label,
  fallbackLabel = 'Back to Overview',
  showHomeShortcut = true,
  onHome,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between gap-3 mb-6 pb-3 border-b border-gray-800/80 ${className}`}>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0f172a] hover:bg-[#1e293b] text-gray-200 hover:text-white border border-gray-700/80 hover:border-[#06b6d4]/50 text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer group active:scale-95"
        aria-label={label || fallbackLabel}
      >
        <ArrowLeft className="w-4 h-4 text-[#06b6d4] group-hover:-translate-x-1 transition-transform" />
        <span>{label || fallbackLabel}</span>
      </button>

      {showHomeShortcut && onHome && (
        <button
          onClick={onHome}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#131e36] hover:bg-[#1a2948] text-gray-300 hover:text-white border border-gray-700/70 text-xs font-semibold transition-all cursor-pointer"
          title="Return to Overview Dashboard"
        >
          <Home className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Dashboard</span>
        </button>
      )}
    </div>
  );
};
