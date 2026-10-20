import React, { useState } from 'react';
import { Emperor, DynastyId } from '../types/history';
import { DYNASTIES_DATA } from '../data/dynastiesData';

interface CatalogSearchProps {
  emperors: Emperor[];
  onSelectEmperor: (emperor: Emperor) => void;
  onAddToDuel: (emperor: Emperor) => void;
}

export const CatalogSearch: React.FC<CatalogSearchProps> = ({
  emperors,
  onSelectEmperor,
  onAddToDuel
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [selectedDynasty, setSelectedDynasty] = useState<DynastyId | 'all'>('all');
  const [reignFilter, setReignFilter] = useState<'all' | 'long' | 'medium' | 'short'>('all');
  const [sortBy, setSortBy] = useState<'chronology' | 'reignYears' | 'lifespan' | 'overallScore' | 'military' | 'civil'>('chronology');

  const formatYear = (year: number) => {
    if (year < 0) return `前${Math.abs(year)}年`;
    return `${year}年`;
  };

  const getScore = (e: Emperor) => Math.round(
    (e.radar.civil + e.radar.military + e.radar.talent + e.radar.people + e.radar.influence) / 5
  );

  const filtered = emperors.filter((e) => {
    if (selectedDynasty !== 'all' && e.dynastyId !== selectedDynasty) return false;

    if (reignFilter === 'long' && e.reignYears < 30) return false;
    if (reignFilter === 'medium' && (e.reignYears < 10 || e.reignYears >= 30)) return false;
    if (reignFilter === 'short' && e.reignYears >= 10) return false;

    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      const matchName = e.name.toLowerCase().includes(q);
      const matchTemple = e.templeName.toLowerCase().includes(q);
      const matchEra = e.eraNames.some(era => era.toLowerCase().includes(q));
      const matchMinisters = e.famousMinisters?.some(m => m.toLowerCase().includes(q)) || false;
      const matchTag = e.highlightTag.toLowerCase().includes(q);
      const matchBio = e.biography.toLowerCase().includes(q);
      const matchZhouSync = e.zhouSonOfHeavenSync?.monarchName.toLowerCase().includes(q) || false;
      if (!matchName && !matchTemple && !matchEra && !matchMinisters && !matchTag && !matchBio && !matchZhouSync) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'reignYears') return b.reignYears - a.reignYears;
    if (sortBy === 'lifespan') return b.lifespanAge - a.lifespanAge;
    if (sortBy === 'overallScore') return getScore(b) - getScore(a);
    if (sortBy === 'military') return b.radar.military - a.radar.military;
    if (sortBy === 'civil') return b.radar.civil - a.radar.civil;
    return a.reignStart - b.reignStart; // chronology
  });

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="p-6 bg-[#F4EFE6] border border-[#E5DDD0] rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-serif text-[#991B1B] uppercase tracking-wider mb-2">
          <span>文史典籍·帝胄全览</span>
          <span>·</span>
          <span>多维检索·在位时长·寿数功勋精细遴选</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mb-2">
          帝胄图鉴·典籍全目速查
        </h1>
        <p className="text-sm font-serif text-stone-600 leading-relaxed max-w-3xl">
          支持依朝代、年号、庙号、名臣良相或治世年期自由检索，亦可按在位极盛期、享年寿数或综合五维能力排榜，探索帝王百态。
        </p>
      </div>

      {/* Control Strip */}
      <div className="bg-white border border-[#E5DDD0] rounded-lg p-4 shadow-2xs space-y-4">
        {/* Row 1: Search & Dynasty Select */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1">
            <label className="text-xs font-serif text-stone-500 block mb-1">典籍检索关键字：</label>
            <input
              type="text"
              placeholder="搜姓名、年号、庙号、大臣(如魏徵)..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-serif bg-[#FAF7F2] border border-[#DDD5C7] rounded focus:outline-none focus:border-[#991B1B] text-stone-800"
            />
          </div>

          <div>
            <label className="text-xs font-serif text-stone-500 block mb-1">所属朝代：</label>
            <select
              value={selectedDynasty}
              onChange={(e) => setSelectedDynasty(e.target.value as any)}
              className="w-full px-3 py-1.5 text-xs font-serif bg-[#FAF7F2] border border-[#DDD5C7] rounded focus:outline-none focus:border-[#991B1B] text-stone-800"
            >
              <option value="all">全部朝代（{emperors.length}）</option>
              {DYNASTIES_DATA.map((d) => {
                const count = emperors.filter(e => e.dynastyId === d.id).length;
                return (
                  <option key={d.id} value={d.id}>
                    {d.name}（{count}）
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="text-xs font-serif text-stone-500 block mb-1">在位时长区间：</label>
            <select
              value={reignFilter}
              onChange={(e) => setReignFilter(e.target.value as any)}
              className="w-full px-3 py-1.5 text-xs font-serif bg-[#FAF7F2] border border-[#DDD5C7] rounded focus:outline-none focus:border-[#991B1B] text-stone-800"
            >
              <option value="all">不限在位年数</option>
              <option value="long">超长在位 (30年以上)</option>
              <option value="medium">稳固在位 (10至30年)</option>
              <option value="short">短促掌权 (10年以下)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F0EBE1]">
          <div className="flex items-center gap-1.5 text-xs font-serif text-stone-600">
            <span className="text-stone-400">排序基准：</span>
            {[
              { id: 'chronology', label: '编年时间' },
              { id: 'reignYears', label: '在位时长' },
              { id: 'lifespan', label: '享年寿数' },
              { id: 'overallScore', label: '综合均分' },
              { id: 'civil', label: '文治最高' },
              { id: 'military', label: '武功最高' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSortBy(btn.id as any)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  sortBy === btn.id
                    ? 'bg-[#991B1B] text-amber-50 font-bold'
                    : 'bg-[#F4EFE6] text-stone-700 hover:bg-[#EAE2D3]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-serif text-stone-500">
            共检索到 <span className="font-bold text-[#991B1B] font-mono">{sorted.length}</span> 位帝王
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((emp) => {
          const overallScore = getScore(emp);

          return (
            <div
              key={emp.id}
              className="bg-white border border-[#E5DDD0] hover:border-[#991B1B]/40 rounded-lg p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3 border-b border-[#F0EBE1] pb-2.5 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded border border-[#991B1B] text-[#991B1B] bg-[#991B1B]/5 flex items-center justify-center font-serif text-sm font-bold shrink-0">
                      {emp.dynastyName.slice(0, 1)}
                    </div>
                    <div>
                      <h3
                        onClick={() => onSelectEmperor(emp)}
                        className="text-base font-serif font-bold text-stone-900 hover:text-[#991B1B] cursor-pointer transition-colors"
                      >
                        {emp.templeName} · {emp.name}
                      </h3>
                      <p className="text-[11px] font-serif text-stone-500 font-mono">
                        {emp.dynastyName} · 在位 {formatYear(emp.reignStart)} - {formatYear(emp.reignEnd)}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#854D0E] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {overallScore}分
                  </span>
                </div>

                <p className="text-xs font-serif text-[#991B1B] mb-2">{emp.highlightTag}</p>

                {/* Metrics strip */}
                <div className="grid grid-cols-3 gap-1 bg-[#FAF7F2] p-2 rounded border border-[#EAE3D6] text-center text-xs font-serif text-stone-600 mb-3">
                  <div>
                    <span className="text-[10px] text-stone-400 block">在位年限</span>
                    <span className="font-mono font-bold text-stone-800">{emp.reignYears}年</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">享年寿数</span>
                    <span className="font-mono font-bold text-stone-800">{emp.lifespanAge}岁</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">主要年号</span>
                    <span className="truncate block font-mono">{emp.eraNames[0] || '无'}</span>
                  </div>
                </div>

                <p className="text-xs font-serif text-stone-600 line-clamp-3 leading-relaxed text-justify mb-3">
                  {emp.biography}
                </p>
              </div>

              {/* Actions Bottom */}
              <div className="pt-3 border-t border-[#F0EBE1] flex justify-between items-center text-xs font-serif">
                <button
                  onClick={() => onAddToDuel(emp)}
                  className="text-stone-600 hover:text-[#991B1B] cursor-pointer"
                >
                  ⚔ 对决PK
                </button>
                <button
                  onClick={() => onSelectEmperor(emp)}
                  className="text-[#991B1B] font-medium hover:underline cursor-pointer"
                >
                  翻阅生平 →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
