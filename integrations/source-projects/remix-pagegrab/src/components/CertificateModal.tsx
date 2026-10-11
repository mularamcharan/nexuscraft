import React from 'react';
import { UserState } from '../types';
import { X, Award, ShieldCheck, Download, Share2, CheckCircle2 } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  userState: UserState;
  onClose: () => void;
  courseTitle?: string;
  certificateId?: string;
  issueDate?: string;
  issuer?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  userState,
  onClose,
  courseTitle = 'Full Stack Web Development',
  certificateId = 'NC-2026-FSWD-8891',
  issueDate = 'August 11, 2026',
  issuer = 'NexusCraft Team',
}) => {
  if (!isOpen) return null;

  const displayName = userState.userName || 'Sathwik Innovator';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0a0e1a] border-2 border-[#06b6d4] rounded-3xl p-6 sm:p-10 space-y-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-center max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-xl cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Verified Certificate Tag */}
        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-wider">
          Verified Certificate
        </div>

        {/* Certificate Frame Inner */}
        <div className="border border-dashed border-[#06b6d4]/40 p-6 sm:p-8 rounded-2xl bg-[#0d1424] space-y-6 relative overflow-hidden text-center">
          {/* Watermark Seal */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#06b6d4]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Certificate Header */}
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-[#06b6d4] to-[#3b82f6] flex items-center justify-center text-[#0a0e1a] shadow-lg">
              <Award className="w-7 h-7" />
            </div>

            <div className="text-[10px] uppercase font-black tracking-[0.2em] text-[#06b6d4]">
              NexusCraft Academy Verified Credential
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Certificate of Completion
            </h2>
          </div>

          <p className="text-xs text-gray-300">
            This is to certify that
          </p>

          <div className="font-display text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-white bg-clip-text text-transparent underline decoration-[#06b6d4]/40 underline-offset-8">
            {displayName}
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
            has successfully completed the course <strong className="text-cyan-300">{courseTitle}</strong> and has demonstrated the required skills, practical proficiency, and project excellence.
          </p>

          {/* Verification Signature Footer */}
          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
            <div className="text-left space-y-1">
              <div>Issue Date: <strong className="text-white">{issueDate}</strong></div>
              <div>Certificate ID: <strong className="text-cyan-400 font-mono">{certificateId}</strong></div>
              <div>Issued By: <strong className="text-white">{issuer}</strong></div>
            </div>

            <div className="text-right flex items-center gap-1.5 text-[#06b6d4] font-bold bg-[#06b6d4]/10 px-3 py-1.5 rounded-xl border border-[#06b6d4]/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified On-Chain</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-black font-extrabold text-xs shadow-lg shadow-[#06b6d4]/20 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate</span>
          </button>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
              alert('Certificate verification link copied!');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#10192d] hover:bg-gray-800 text-gray-200 border border-gray-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>Share Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
