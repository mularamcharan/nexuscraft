import React from 'react';
import { X, Settings, Sun, Moon, Sparkles, Check, Monitor, Palette } from 'lucide-react';

export type ThemeMode = 'default' | 'white' | 'night';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
  onSelectTheme: (mode: ThemeMode) => void;
  onSendToast?: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  themeMode,
  onSelectTheme,
  onSendToast,
}) => {
  if (!isOpen) return null;

  const themes: Array<{
    id: ThemeMode;
    name: string;
    subtitle: string;
    desc: string;
    icon: React.ElementType;
    previewBg: string;
    previewCard: string;
    badgeColor: string;
  }> = [
    {
      id: 'default',
      name: 'Nexus Cyber (This Mode)',
      subtitle: 'Default Navy & Cyan Theme',
      desc: 'Our flagship high-tech atmosphere with deep navy blue, vibrant cyan accents, and glowing emerald highlights.',
      icon: Sparkles,
      previewBg: 'bg-[#0a0e1a]',
      previewCard: 'bg-[#0d1527] border-[#06b6d4]/40 text-white',
      badgeColor: 'bg-[#06b6d4]/20 text-[#06b6d4] border-[#06b6d4]/40',
    },
    {
      id: 'white',
      name: 'Clean White Mode',
      subtitle: 'Crisp Light High-Readability Theme',
      desc: 'Sleek, high-contrast off-white background with bold slate typography, ideal for daytime study and clear document reviewing.',
      icon: Sun,
      previewBg: 'bg-[#f8fafc]',
      previewCard: 'bg-white border-slate-300 text-slate-900 shadow-sm',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
    },
    {
      id: 'night',
      name: 'OLED Night Mode',
      subtitle: 'Obsidian Deep Midnight Theme',
      desc: 'Ultra-dark pure obsidian black canvas designed to eliminate eye strain in total darkness and conserve OLED display power.',
      icon: Moon,
      previewBg: 'bg-[#020204]',
      previewCard: 'bg-[#09090e] border-cyan-500/30 text-gray-100',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    },
  ];

  const handleApplyTheme = (mode: ThemeMode) => {
    onSelectTheme(mode);
    if (onSendToast) {
      const modeNames = {
        default: 'Nexus Cyber Mode',
        white: 'Clean White Mode',
        night: 'OLED Night Mode',
      };
      onSendToast(`✨ Theme changed to ${modeNames[mode]}!`, 'success');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#0a0e1a] border border-[#06b6d4]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#06b6d4] to-[#3b82f6] text-black shadow-lg">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-extrabold text-white">Platform Settings</h2>
              <p className="text-xs text-gray-400">Customize display preferences & visual screen mode</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/80 rounded-xl transition-colors cursor-pointer"
            aria-label="Close Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Mode Switcher Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#06b6d4]" />
              Screen Display Theme Mode
            </h3>
            <span className="text-[11px] text-[#06b6d4] font-extrabold bg-[#06b6d4]/10 px-2.5 py-0.5 rounded-full border border-[#06b6d4]/30">
              3 Modes Available
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {themes.map((t) => {
              const Icon = t.icon;
              const isSelected = themeMode === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => handleApplyTheme(t.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#0f1d33] border-[#06b6d4] ring-2 ring-[#06b6d4] shadow-lg shadow-[#06b6d4]/10'
                      : 'bg-[#0d1424] border-gray-800 hover:border-gray-700 hover:bg-[#111a2e]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl border shrink-0 ${t.badgeColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-white text-sm">{t.name}</h4>
                        {isSelected && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-black bg-emerald-500 text-black">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#06b6d4] font-semibold">{t.subtitle}</p>
                      <p className="text-[11px] text-gray-300 leading-relaxed pt-0.5">{t.desc}</p>
                    </div>
                  </div>

                  {/* Selection Radio Circle */}
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all ${
                      isSelected
                        ? 'bg-[#06b6d4] border-[#06b6d4] text-black'
                        : 'border-gray-700 bg-gray-800'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Close/Save Button */}
        <div className="pt-2 border-t border-gray-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#06b6d4] to-[#10b981] text-black font-extrabold text-xs shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            Apply & Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
