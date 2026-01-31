import React from 'react';
import { ArrowDown } from 'lucide-react';

type Props = {
  className?: string;
};

const ScrollIndicator: React.FC<Props> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center w-9 h-9 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm text-white/80 shadow-sm ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      <ArrowDown className="w-4 h-4 animate-arrow-drop" />
    </div>
  );
};

export default ScrollIndicator;