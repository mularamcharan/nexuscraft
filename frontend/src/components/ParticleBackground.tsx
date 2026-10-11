import React from 'react';

export const ParticleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Ambient gradient backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06b6d4]/10 rounded-full blur-[120px]" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-[#0d8a6a]/15 rounded-full blur-[130px]" />
    </div>
  );
};

