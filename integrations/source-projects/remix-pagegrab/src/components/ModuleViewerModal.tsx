import React, { useState } from 'react';
import { Module } from '../types';
import { X, CheckCircle2, Clock, Award, BookOpen, Code, Sparkles, ArrowRight, ArrowLeft, Copy, Check } from 'lucide-react';

interface ModuleViewerModalProps {
  module: Module | null;
  isCompleted: boolean;
  onClose: () => void;
  onToggleComplete: (moduleId: string) => void;
}

export const ModuleViewerModal: React.FC<ModuleViewerModalProps> = ({
  module,
  isCompleted,
  onClose,
  onToggleComplete,
}) => {
  const [copied, setCopied] = useState(false);

  if (!module) return null;

  const handleCopyContent = () => {
    const textToCopy = `Module: ${module.title}\nDifficulty: ${module.difficulty}\nDuration: ${module.duration}\n\nDescription:\n${module.description}\n\nKey Takeaways:\n${module.keyTakeaways.map(t => `- ${t}`).join('\n')}\n\nContent:\n${module.contentSections.map(s => `${s.heading}\n${s.body}${s.codeSnippet ? `\nCode:\n${s.codeSnippet}` : ''}`).join('\n\n')}`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0d1424] border border-[#06b6d4]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131e36] hover:bg-[#1a2948] text-gray-200 hover:text-white border border-gray-700/80 text-xs font-bold transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#06b6d4] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Modules</span>
            </button>

            <button
              onClick={handleCopyContent}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131e36] hover:bg-[#1a2948] text-gray-200 hover:text-white border border-gray-700/80 text-xs font-bold transition-all cursor-pointer"
              title="Copy content to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800/80 rounded-xl transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/40 text-xs font-bold uppercase">
              {module.difficulty} Level
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {module.duration}
            </span>
            {isCompleted && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed (+50 PTS)
              </span>
            )}
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            {module.title}
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed">
            {module.description}
          </p>
        </div>

        {/* Key Takeaways Box */}
        <div className="p-4 bg-[#0a0e1a] border border-gray-800 rounded-2xl space-y-2">
          <h3 className="text-xs font-bold text-[#06b6d4] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Key Takeaways</span>
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300">
            {module.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#06b6d4] flex-shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-5 border-t border-gray-800 pt-5">
          {module.contentSections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#06b6d4]" />
                <span>{sec.heading}</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {sec.body}
              </p>

              {sec.keyConcept && (
                <div className="p-3 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-xl text-xs font-bold text-[#06b6d4]">
                  💡 Key Concept: {sec.keyConcept}
                </div>
              )}

              {sec.codeSnippet && (
                <div className="p-3.5 bg-black/70 border border-gray-800 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto">
                  <div className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase mb-1">
                    <Code className="w-3 h-3" />
                    <span>Logic Sandbox</span>
                  </div>
                  <pre>{sec.codeSnippet}</pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Completion Action */}
        <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
          <div className="text-xs text-gray-400">
            Completing modules earns +50 Points & advances your track progress!
          </div>

          <button
            onClick={() => onToggleComplete(module.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white hover:scale-[1.02]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
