import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Emperor, DynastyId } from '../types/history';
import { DYNASTIES_DATA } from '../data/dynastiesData';

interface ChronologyTimelineProps {
  emperors: Emperor[];
  onSelectEmperor: (emperor: Emperor) => void;
  onAddToDuel: (emperor: Emperor) => void;
}

export const ChronologyTimeline: React.FC<ChronologyTimelineProps> = ({
  emperors,
  onSelectEmperor,
  onAddToDuel
}) => {
  const [selectedDynasty, setSelectedDynasty] = useState<DynastyId | 'all'>('all');
  const [epochFilter, setEpochFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const compassScrollRef = useRef<HTMLDivElement>(null);

  const scrollCompass = (direction: 'left' | 'right') => {
    if (compassScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      compassScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formatYear = (year: number) => {
    if (year < 0) return `前${Math.abs(year)}年`;
    return `${year}年`;
  };

  const filteredEmperors = emperors.filter((emp) => {
    if (selectedDynasty !== 'all' && emp.dynastyId !== selectedDynasty) return false;
    if (epochFilter !== 'all' && emp.epochType !== epochFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = emp.name.toLowerCase().includes(q);
      const matchTemple = emp.templeName.toLowerCase().includes(q);
      const matchEra = emp.eraNames.some(era => era.toLowerCase().includes(q));
      const matchTag = emp.highlightTag.toLowerCase().includes(q);
      if (!matchName && !matchTemple && !matchEra && !matchTag) return false;
    }
    return true;
  });

  const currentDynastyObj = DYNASTIES_DATA.find(d => d.id === selectedDynasty);

  return (
    <div className="space-y-6">
      {/* Editorial Introduction Strip */}
      <div className="p-6 bg-[#F4EFE6] border border-[#E5DDD0] rounded-lg shadow-2xs relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAF7F2]/80 to-transparent pointer-events-none" />
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-serif text-[#991B1B] uppercase tracking-wider mb-2">
            <span>华夏四千年帝胄王统编年史</span>
            <span>·</span>
            <span>自夏禹开创世袭至宣统帝逊位</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mb-2">
            千年风云·帝王编年长卷
          </h1>
          <p className="text-sm font-serif text-stone-600 leading-relaxed">
            以正史编年为纬，以王朝更替为经。点选朝代罗盘或按盛世类型检索，漫游自公元前2070年夏启建立世袭王朝至公元1912年清帝逊位的华夏帝王兴亡历程。
          </p>
        </div>
      </div>

      {/* Dynasty Horizon Compass Bar - 单行可滑动编年罗盘 */}
      <div className="bg-white border border-[#E8E0D2] rounded-lg p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs font-serif text-stone-500 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
            <span className="font-bold text-stone-800">朝代速选罗盘</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400 hidden sm:inline">横向滑动或使用按钮</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollCompass('left')}
                className="p-1 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-[#E8E0D2] transition-colors cursor-pointer"
                title="向左滚动"
                aria-label="向左滚动"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCompass('right')}
                className="p-1 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-[#E8E0D2] transition-colors cursor-pointer"
                title="向右滚动"
                aria-label="向右滚动"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 单行横向可滑动列表 */}
        <div
          ref={compassScrollRef}
          className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scroll-smooth"
        >
          {/* 全部朝代 */}
          <button
            onClick={() => setSelectedDynasty('all')}
            className={`px-3.5 py-1.5 text-xs font-serif rounded-md whitespace-nowrap cursor-pointer transition-all flex flex-col items-center justify-center shrink-0 min-w-[104px] border ${
              selectedDynasty === 'all'
                ? 'bg-[#991B1B] text-amber-50 font-bold border-[#7F1D1D] shadow-xs ring-1 ring-amber-300/40'
                : 'bg-[#F7F2E8] text-stone-700 hover:bg-[#EDE3D0] border-[#E5DDD0]'
            }`}
          >
            <span className="font-medium text-xs leading-tight tracking-wide">
              全部朝代（{emperors.length}）
            </span>
            <span className={`text-[10px] font-mono tabular-nums leading-tight mt-0.5 ${
              selectedDynasty === 'all' ? 'text-amber-100 opacity-90' : 'text-stone-500'
            }`}>
              前2070年 - 1912年
            </span>
          </button>

          {/* 全部18个朝代按编年顺序依次排在一行 */}
          {DYNASTIES_DATA.map((d) => {
            const count = emperors.filter(e => e.dynastyId === d.id).length;
            const isSelected = selectedDynasty === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDynasty(d.id)}
                className={`px-3.5 py-1.5 text-xs font-serif rounded-md whitespace-nowrap cursor-pointer transition-all flex flex-col items-center justify-center shrink-0 min-w-[104px] border ${
                  isSelected
                    ? 'bg-[#991B1B] text-amber-50 font-bold border-[#7F1D1D] shadow-xs ring-1 ring-amber-300/40'
                    : 'bg-[#F7F2E8] text-stone-700 hover:bg-[#EDE3D0] border-[#E5DDD0]'
                }`}
              >
                <span className="font-medium text-xs leading-tight tracking-wide">
                  {d.name}（{count}）
                </span>
                <span className={`text-[10px] font-mono tabular-nums leading-tight mt-0.5 ${
                  isSelected ? 'text-amber-100 opacity-90' : 'text-stone-500'
                }`}>
                  {formatYear(d.startYear)} - {formatYear(d.endYear)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Dynasty Brief Card (if specific dynasty chosen) */}
      {currentDynastyObj && (
        <div className="p-4 bg-white border border-[#E5DDCF] rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-serif font-bold text-stone-900">
                {currentDynastyObj.fullName}
              </span>
              <span className="text-xs font-mono text-stone-500">
                ({formatYear(currentDynastyObj.startYear)} - {formatYear(currentDynastyObj.endYear)})
              </span>
              <span className="text-xs font-serif text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                都城：{currentDynastyObj.capital}
              </span>
            </div>
            <p className="text-xs font-serif text-stone-600 leading-relaxed">
              {currentDynastyObj.description}
            </p>
          </div>
          <button
            onClick={() => setSelectedDynasty('all')}
            className="text-xs font-serif text-[#991B1B] hover:underline whitespace-nowrap shrink-0"
          >
            查看全朝代长卷 →
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Epoch Segments */}
        <div className="flex items-center gap-1 p-1 bg-[#F4EFE6] rounded border border-[#E5DDD0]">
          {[
            { id: 'all', label: '全部帝王' },
            { id: 'founder', label: '开国之君' },
            { id: 'prosperity', label: '盛世明君' },
            { id: 'reform', label: '革新图强' },
            { id: 'decline', label: '乱局末世' }
          ].map((seg) => (
            <button
              key={seg.id}
              onClick={() => setEpochFilter(seg.id)}
              className={`px-3 py-1 text-xs font-serif rounded transition-colors cursor-pointer whitespace-nowrap ${
                epochFilter === seg.id
                  ? 'bg-white text-stone-900 font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="搜索帝王姓名、庙号、年号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs font-serif bg-white border border-[#DED5C7] rounded focus:outline-none focus:border-[#991B1B] text-stone-800 placeholder-stone-400"
          />
          <span className="absolute left-2.5 top-2 text-stone-400 text-xs">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1.5 text-stone-400 hover:text-stone-600 text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Chronology Stream: Timeline Cards */}
      <div className="relative border-l-2 border-[#D8CEBC] ml-3 md:ml-6 pl-5 md:pl-8 space-y-8 py-2">
        {filteredEmperors.length === 0 ? (
          <div className="p-8 text-center bg-white rounded border border-[#E5DDD0]">
            <p className="text-sm font-serif text-stone-500">未找到符合条件的帝王生平档案。</p>
            <button
              onClick={() => { setSelectedDynasty('all'); setEpochFilter('all'); setSearchQuery(''); }}
              className="mt-2 text-xs font-serif text-[#991B1B] hover:underline"
            >
              重置所有筛选条件
            </button>
          </div>
        ) : (
          filteredEmperors.map((emperor) => {
            const overallScore = Math.round(
              (emperor.radar.civil + emperor.radar.military + emperor.radar.talent + emperor.radar.people + emperor.radar.influence) / 5
            );

            return (
              <div
                key={emperor.id}
                className="relative group transition-transform duration-200"
              >
                {/* Timeline node seal dot */}
                <div className="absolute -left-[31px] md:-left-[43px] top-6 w-5 h-5 rounded-full bg-[#FAF7F2] border-2 border-[#991B1B] flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#991B1B]" />
                </div>

                {/* Emperor Card on Xuan Paper */}
                <div className="bg-white border border-[#E5DDD0] hover:border-[#991B1B]/40 rounded-lg p-5 shadow-2xs hover:shadow-md transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#F0EBE1] pb-3 mb-3">
                    <div className="flex items-start sm:items-center gap-3">
                      {/* Cinnabar dynasty badge */}
                      <div className="w-10 h-10 rounded border border-[#991B1B] text-[#991B1B] bg-[#991B1B]/5 flex items-center justify-center font-serif font-black text-lg shrink-0">
                        {emperor.dynastyName.slice(0, 1)}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 
                            onClick={() => onSelectEmperor(emperor)}
                            className="text-lg font-serif font-bold text-stone-900 hover:text-[#991B1B] cursor-pointer transition-colors"
                          >
                            {emperor.templeName} · {emperor.name}
                          </h3>
                          <span className="text-xs font-serif text-[#991B1B] border border-[#991B1B]/30 px-1.5 py-0.5 rounded-xs bg-[#991B1B]/5">
                            {emperor.highlightTag}
                          </span>
                        </div>

                        {/* Unboxed metadata row with typographic separators */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-serif mt-1">
                          <span>{emperor.dynastyName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">
                            在位 {formatYear(emperor.reignStart)} - {formatYear(emperor.reignEnd)} ({emperor.reignYears}年)
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>年号：{emperor.eraNames[0] || '无'}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">享年 {emperor.lifespanAge}岁</span>
                        </div>

                        {emperor.zhouSonOfHeavenSync && (
                          <div className="text-[11px] font-serif text-amber-900 bg-amber-50/90 border border-amber-200/80 px-2 py-0.5 rounded-xs mt-1.5 inline-flex items-center gap-1">
                            <span className="text-[#991B1B]">✦</span>
                            <span className="text-stone-500">周室法统：</span>
                            <span className="font-medium text-stone-800">{emperor.zhouSonOfHeavenSync.monarchName}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Scores & Actions */}
                    <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-stone-400 font-serif block">五维均分</span>
                        <span className="text-base font-serif font-bold text-[#854D0E] font-mono tabular-nums">
                          {overallScore}分
                        </span>
                      </div>
                      <button
                        onClick={() => onAddToDuel(emperor)}
                        className="px-3 py-1.5 text-xs font-serif font-medium text-stone-700 bg-[#F4EFE6] border border-[#DCD4C7] rounded hover:border-[#991B1B] hover:text-[#991B1B] transition-colors cursor-pointer"
                        title="将此帝王加入对决台"
                      >
                        加入PK
                      </button>
                      <button
                        onClick={() => onSelectEmperor(emperor)}
                        className="px-3.5 py-1.5 text-xs font-serif font-medium text-amber-50 bg-[#991B1B] hover:bg-[#7F1D1D] rounded transition-colors cursor-pointer shadow-xs"
                      >
                        查阅珍档
                      </button>
                    </div>
                  </div>

                  {/* Biography Snippet */}
                  <p className="text-xs font-serif text-stone-600 leading-relaxed mb-3 text-justify line-clamp-2">
                    {emperor.biography}
                  </p>

                  {/* Footer Highlights: Key achievements & famous ministers */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F5EFE6] text-xs font-serif">
                    <div className="flex items-center gap-2 text-stone-600">
                      <span className="text-stone-400">治世名臣：</span>
                      <span>{emperor.famousMinisters && emperor.famousMinisters.length > 0 ? emperor.famousMinisters.slice(0, 4).join('、') : '记载较简'}</span>
                    </div>
                    <div className="text-stone-500 font-mono text-[11px]">
                      陵寝：{emperor.tomb}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
