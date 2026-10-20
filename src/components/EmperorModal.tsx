import React from 'react';
import { Emperor } from '../types/history';
import { RadarChart } from './RadarChart';

interface EmperorModalProps {
  emperor: Emperor | null;
  onClose: () => void;
  onAddToDuel: (emperor: Emperor) => void;
}

export const EmperorModal: React.FC<EmperorModalProps> = ({
  emperor,
  onClose,
  onAddToDuel
}) => {
  if (!emperor) return null;

  const formatYear = (year: number) => {
    if (year < 0) return `公元前${Math.abs(year)}年`;
    return `公元${year}年`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] border border-[#DDD4C5] rounded-lg shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top classical scroll header border */}
        <div className="h-2 bg-gradient-to-r from-[#991B1B] via-[#B45309] to-[#991B1B]" />

        {/* Header Ribbon */}
        <div className="px-6 py-5 bg-[#F4EFE6] border-b border-[#E5DDCF] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded border-2 border-[#991B1B] bg-white flex items-center justify-center text-[#991B1B] font-serif font-black text-xl shadow-xs">
              {emperor.dynastyName.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-wide">
                  {emperor.templeName} · {emperor.name}
                </h2>
                <span className="text-xs font-serif text-[#991B1B] border border-[#991B1B]/40 px-2 py-0.5 rounded-xs bg-[#991B1B]/5">
                  {emperor.highlightTag}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-serif mt-1">
                <span>{emperor.dynastyName}</span>
                <span className="mx-1.5">·</span>
                <span className="tabular-nums font-mono">
                  在位 {formatYear(emperor.reignStart)} 至 {formatYear(emperor.reignEnd)} ({emperor.reignYears}年)
                </span>
                <span className="mx-1.5">·</span>
                <span className="tabular-nums font-mono">
                  寿数 {emperor.lifespanAge}岁
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddToDuel(emperor)}
              className="px-3 py-1.5 text-xs font-serif font-medium text-amber-50 bg-[#991B1B] hover:bg-[#7F1D1D] rounded transition-colors cursor-pointer shadow-xs"
            >
              加入风云对决
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded border border-stone-300 text-stone-600 hover:text-stone-900 hover:border-stone-400 bg-white flex items-center justify-center transition-colors cursor-pointer"
              title="关闭"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scroll Content Body */}
        <div className="p-6 md:p-8 space-y-8 max-h-[78vh] overflow-y-auto">
          {/* Famous Quote Banner if available */}
          {emperor.famousQuote && (
            <div className="p-4 rounded bg-[#F5EFE6] border border-[#E2D8C7] relative">
              <span className="absolute -top-3 left-6 px-2 bg-[#FAF7F2] text-xs font-serif text-[#991B1B] border border-[#E2D8C7]">
                帝王治世名言
              </span>
              <p className="text-base md:text-lg font-serif italic text-stone-800 leading-relaxed text-center py-1">
                “{emperor.famousQuote}”
              </p>
            </div>
          )}

          {/* Core Info Grid: Left Radar & Heritage, Right Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Radar Assessment & Quick Metrics */}
            <div className="lg:col-span-5 flex flex-col items-center p-4 bg-white border border-[#EAE3D6] rounded-md shadow-2xs">
              <h3 className="text-xs uppercase tracking-widest font-serif text-stone-500 mb-2">
                五维帝王能力综合评测
              </h3>
              <RadarChart statsA={emperor.radar} nameA={emperor.templeName} size={280} />
              
              {/* Succession & Lineage Record */}
              <div className="w-full mt-4 pt-4 border-t border-[#EAE3D6] text-xs font-serif space-y-2">
                <div className="flex justify-between text-stone-700">
                  <span className="text-stone-500">世系谱位：</span>
                  <span className="font-medium">第 {emperor.lineage.generation} 代皇帝 · {emperor.lineage.relationship}</span>
                </div>
                {emperor.lineage.predecessorName && (
                  <div className="flex justify-between text-stone-700">
                    <span className="text-stone-500">前任帝王：</span>
                    <span>{emperor.lineage.predecessorName}</span>
                  </div>
                )}
                {emperor.lineage.successorName && (
                  <div className="flex justify-between text-stone-700">
                    <span className="text-stone-500">后继帝王：</span>
                    <span>{emperor.lineage.successorName}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-700">
                  <span className="text-stone-500">皇陵地望：</span>
                  <span className="text-[#854D0E] font-medium">{emperor.tomb}</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span className="text-stone-500">主要年号：</span>
                  <span className="font-mono text-stone-800">{emperor.eraNames.join('、')}</span>
                </div>
                <div className="pt-2 text-stone-600 text-[11px] leading-relaxed">
                  <span className="text-stone-500">尊谥尊称：</span>
                  <span>{emperor.posthumousName}</span>
                </div>

                {emperor.zhouSonOfHeavenSync && (
                  <div className="mt-3 pt-3 border-t border-[#EAE3D6] bg-amber-50/80 -mx-4 -mb-4 p-3 rounded-b-md">
                    <span className="text-[10px] text-amber-900 font-bold block mb-0.5">
                      ✦ 东周王室法统对应：
                    </span>
                    <span className="font-medium text-stone-900 block mb-1">
                      {emperor.zhouSonOfHeavenSync.monarchName}
                    </span>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      {emperor.zhouSonOfHeavenSync.historicalContext}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Biography & Achievements */}
            <div className="lg:col-span-7 space-y-6">
              {/* Biography */}
              <div>
                <h3 className="text-sm font-serif font-bold text-stone-900 border-b border-[#E8E0D2] pb-1.5 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-[#991B1B] rounded-xs" />
                  帝王生平述略
                </h3>
                <p className="text-sm font-serif text-stone-700 leading-relaxed text-justify">
                  {emperor.biography}
                </p>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-sm font-serif font-bold text-stone-900 border-b border-[#E8E0D2] pb-1.5 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-[#15803D] rounded-xs" />
                  治世宏规与卓越功勋
                </h3>
                <ul className="space-y-2 text-xs font-serif text-stone-700">
                  {emperor.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#15803D] font-bold mt-0.5">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Criticisms */}
              <div>
                <h3 className="text-sm font-serif font-bold text-stone-900 border-b border-[#E8E0D2] pb-1.5 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-[#B45309] rounded-xs" />
                  历史过失与执政局限
                </h3>
                <ul className="space-y-2 text-xs font-serif text-stone-700">
                  {emperor.criticisms.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#B45309] font-bold mt-0.5">⚠</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Famous Ministers */}
              {emperor.famousMinisters && emperor.famousMinisters.length > 0 && (
                <div>
                  <h3 className="text-sm font-serif font-bold text-stone-900 border-b border-[#E8E0D2] pb-1.5 mb-2.5 flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-stone-700 rounded-xs" />
                    股肱贤相与当朝良将
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs font-serif">
                    {emperor.famousMinisters.map((min, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 bg-[#F4EFE6] text-stone-800 border border-[#E0D8CB] rounded-xs"
                      >
                        {min}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Historical Verdict */}
              <div className="p-3.5 bg-[#F9F6F0] border-l-2 border-[#991B1B] rounded-r text-xs font-serif text-stone-700">
                <span className="font-bold text-stone-900 block mb-1">青史评断与正史典籍：</span>
                <p className="italic leading-relaxed">
                  {emperor.historicalVerdict}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F4EFE6] border-t border-[#E5DDCF] flex justify-between items-center text-xs text-stone-500 font-serif">
          <span>《中华历代帝王长卷》典籍档案库 · 馆藏编号：EMP-{emperor.id.toUpperCase()}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-900 text-stone-100 rounded transition-colors cursor-pointer"
          >
            合上卷轴
          </button>
        </div>
      </div>
    </div>
  );
};
