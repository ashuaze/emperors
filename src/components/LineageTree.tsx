import React, { useState } from 'react';
import { Emperor, DynastyId } from '../types/history';
import { DYNASTIES_DATA } from '../data/dynastiesData';

interface LineageTreeProps {
  emperors: Emperor[];
  onSelectEmperor: (emperor: Emperor) => void;
  onAddToDuel: (emperor: Emperor) => void;
}

export const LineageTree: React.FC<LineageTreeProps> = ({
  emperors,
  onSelectEmperor,
  onAddToDuel
}) => {
  // All 18 dynasties with full lineage data
  const availableDynastyIds: DynastyId[] = DYNASTIES_DATA.map(d => d.id);

  const [activeDynasty, setActiveDynasty] = useState<DynastyId>('xia');

  const dynastyEmperors = emperors
    .filter(e => e.dynastyId === activeDynasty)
    .sort((a, b) => a.reignStart - b.reignStart);

  const currentDynasty = DYNASTIES_DATA.find(d => d.id === activeDynasty);

  const formatYear = (year: number) => {
    if (year < 0) return `前${Math.abs(year)}年`;
    return `${year}年`;
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="p-6 bg-[#F4EFE6] border border-[#E5DDD0] rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-serif text-[#991B1B] uppercase tracking-wider mb-2">
          <span>华夏皇宗血脉图谱</span>
          <span>·</span>
          <span>父子相承·兄终弟及·宗藩入继·皇室政变</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mb-2">
          皇权传承·朝代世系图谱
        </h1>
        <p className="text-sm font-serif text-stone-600 leading-relaxed max-w-3xl">
          皇权更迭承继不仅是宗族血缘的传递，更交织着宫闱兵变、宗藩入嗣与法统正溯。选择朝代，一览自开国太祖至末代君王的一脉传承与亲缘流变。
        </p>

        {/* Dynasty Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          {availableDynastyIds.map((dynId) => {
            const d = DYNASTIES_DATA.find(item => item.id === dynId);
            if (!d) return null;
            const count = emperors.filter(e => e.dynastyId === dynId).length;
            return (
              <button
                key={dynId}
                onClick={() => setActiveDynasty(dynId)}
                className={`px-3.5 py-1.5 text-xs font-serif rounded transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeDynasty === dynId
                    ? 'bg-[#991B1B] text-amber-50 font-bold shadow-xs'
                    : 'bg-white text-stone-700 border border-[#E0D7C9] hover:bg-[#EFE8DD]'
                }`}
              >
                <span>{d.name}世系</span>
                <span className="text-[10px] opacity-80 font-mono">({count}帝)</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynasty Context Banner */}
      {currentDynasty && (
        <div className="p-4 bg-white border border-[#E5DDD0] rounded-lg shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-serif font-bold text-stone-900">
                {currentDynasty.fullName} · 帝系源流
              </span>
              <span className="text-xs text-stone-500 font-mono">
                {formatYear(currentDynasty.startYear)} 至 {formatYear(currentDynasty.endYear)}
              </span>
            </div>
            <p className="text-xs font-serif text-stone-600">
              开国之君：{currentDynasty.founder} · 都城：{currentDynasty.capital} · {currentDynasty.historicalSignificance}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-serif text-stone-500 bg-[#FAF7F2] px-3 py-1.5 rounded border border-[#E8E0D2] shrink-0">
            <span>收录帝王：</span>
            <span className="font-bold text-[#991B1B] font-mono">{dynastyEmperors.length} 位</span>
          </div>
        </div>
      )}

      {/* Succession Flow Lineage Visualizer */}
      <div className="bg-white border border-[#E5DDD0] rounded-lg p-6 shadow-2xs">
        <div className="text-xs font-serif text-stone-400 mb-6 flex items-center gap-2">
          <span>世系传承流程示意</span>
          <span className="h-px bg-stone-200 flex-1" />
          <span>点击卡片查看详尽帝王档案</span>
        </div>

        <div className="space-y-6 relative">
          {dynastyEmperors.map((emp, index) => {
            const isFirst = index === 0;
            const isLast = index === dynastyEmperors.length - 1;

            return (
              <div key={emp.id} className="relative flex flex-col md:flex-row items-start md:items-center gap-4 group">
                {/* Vertical connecting line */}
                {!isLast && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-[#D8CEBC] -mb-6 hidden md:block" />
                )}

                {/* Generation Index Badge */}
                <div className="w-12 h-12 rounded-full border-2 border-[#991B1B] bg-[#FAF7F2] text-[#991B1B] flex flex-col items-center justify-center font-serif text-xs shrink-0 shadow-xs z-10">
                  <span className="text-[10px] text-stone-500">第</span>
                  <span className="font-bold text-sm leading-none">{emp.lineage.generation}</span>
                  <span className="text-[9px] text-stone-500">代</span>
                </div>

                {/* Lineage Info Card */}
                <div className="flex-1 bg-[#FAF7F2] border border-[#E5DDD0] hover:border-[#991B1B]/50 rounded-lg p-4 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE3D6] pb-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 
                        onClick={() => onSelectEmperor(emp)}
                        className="text-base font-serif font-bold text-stone-900 hover:text-[#991B1B] cursor-pointer"
                      >
                        {emp.templeName} · {emp.name}
                      </h3>
                      <span className="text-xs font-serif text-[#B45309] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-xs">
                        {emp.lineage.relationship}
                      </span>
                      <span className="text-xs font-serif text-stone-500 font-mono">
                        在位 {formatYear(emp.reignStart)} - {formatYear(emp.reignEnd)} ({emp.reignYears}年)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddToDuel(emp)}
                        className="px-2.5 py-1 text-xs font-serif text-stone-600 hover:text-[#991B1B] bg-white border border-stone-200 rounded cursor-pointer transition-colors"
                      >
                        加入PK
                      </button>
                      <button
                        onClick={() => onSelectEmperor(emp)}
                        className="px-3 py-1 text-xs font-serif text-[#991B1B] hover:text-white hover:bg-[#991B1B] border border-[#991B1B] rounded cursor-pointer transition-colors"
                      >
                        帝王小传 →
                      </button>
                    </div>
                  </div>

                  {/* Succession relationship description */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-serif text-stone-600">
                    <div>
                      <span className="text-stone-400">承继渊源：</span>
                      <span>{emp.lineage.relationship}</span>
                    </div>
                    <div>
                      <span className="text-stone-400">在位年号：</span>
                      <span className="font-mono">{emp.eraNames.join('、')}</span>
                    </div>
                    <div>
                      <span className="text-stone-400">主要谥号：</span>
                      <span>{emp.posthumousName}</span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs font-serif text-stone-600 line-clamp-1">
                    {emp.highlightTag}：{emp.biography}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
