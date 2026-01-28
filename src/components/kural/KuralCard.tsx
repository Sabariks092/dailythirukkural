import React from "react";
import type { Kural } from "../../types";

interface KuralCardProps {
  kural: Kural;
  showDetails?: boolean;
}

const KuralCard: React.FC<KuralCardProps> = ({ kural, showDetails = true }) => {
  return (
    <div className="bg-bg-surface border-2 border-primary-500 p-8 shadow-premium hover-premium-scale transition-all animate-premium-fade">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500 text-white px-3 py-1 text-xs font-bold tracking-widest uppercase">
            Kural {kural.number}
          </div>
          <button
            className="w-8 h-8 flex items-center justify-center border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all focus:outline-none"
            title="Listen to Kural"
          >
            🔊
          </button>
        </div>
        <div className="text-right">
          <p className="tamil-text text-primary-600 font-bold text-sm">
            {kural.paal}
          </p>
          <p className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">
            {kural.athigaram}
          </p>
        </div>
      </div>

      <div className="relative mb-8 text-center">
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary-100 -z-10" />
        <div className="bg-bg-surface px-4 inline-block">
          <p className="tamil-text text-2xl md:text-3xl text-text-primary font-bold leading-relaxed">
            {kural.line1}
          </p>
          <p className="tamil-text text-2xl md:text-3xl text-text-primary font-bold leading-relaxed mt-2">
            {kural.line2}
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-6 pt-6 border-t border-border-soft">
          <div>
            <h4 className="text-[10px] font-bold text-secondary-500 uppercase tracking-[0.2em] mb-3">
              Sacred Translation
            </h4>
            <p className="text-text-primary text-base leading-relaxed font-medium italic">
              {kural.en}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bg-main p-4 border-l-2 border-accent-500">
              <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">
                Traditional Meaning
              </h4>
              <p className="tamil-text text-text-secondary text-sm leading-relaxed">
                {kural.urai1}
              </p>
              <p className="text-[10px] text-primary-600 font-bold uppercase mt-2">
                — {kural.urai1Author}
              </p>
            </div>
            <div className="bg-bg-main p-4 border-l-2 border-primary-500">
              <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">
                Modern Context
              </h4>
              <p className="tamil-text text-text-secondary text-sm leading-relaxed">
                {kural.urai2}
              </p>
              <p className="text-[10px] text-primary-600 font-bold uppercase mt-2">
                — {kural.urai2Author}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KuralCard;
