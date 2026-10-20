import React from 'react';

export type NavTab = 'chronology' | 'lineage' | 'duel' | 'catalog';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenRandomEmperor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenRandomEmperor
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D2] shadow-[0_1px_3px_rgba(40,30,20,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div 
            onClick={() => onSelectTab('chronology')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded border border-[#991B1B] text-[#991B1B] bg-[#991B1B]/5 flex items-center justify-center font-serif text-sm font-bold shadow-xs">
              帝
            </div>
            <span className="text-xl font-serif font-bold tracking-wider text-stone-900 group-hover:text-[#991B1B] transition-colors whitespace-nowrap">
              中华历代帝王长卷
            </span>
          </div>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-serif">
            <button
              onClick={() => onSelectTab('chronology')}
              className={`py-2 border-b-2 font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'chronology'
                  ? 'border-[#991B1B] text-[#991B1B]'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              编年长卷
            </button>
            <button
              onClick={() => onSelectTab('lineage')}
              className={`py-2 border-b-2 font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'lineage'
                  ? 'border-[#991B1B] text-[#991B1B]'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              朝代世系
            </button>
            <button
              onClick={() => onSelectTab('duel')}
              className={`py-2 border-b-2 font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'duel'
                  ? 'border-[#991B1B] text-[#991B1B]'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              风云对决
            </button>
            <button
              onClick={() => onSelectTab('catalog')}
              className={`py-2 border-b-2 font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'catalog'
                  ? 'border-[#991B1B] text-[#991B1B]'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              典籍图鉴
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRandomEmperor}
              className="px-3.5 py-1.5 text-xs font-serif font-medium text-stone-800 bg-[#F2EDE2] border border-[#DDD4C5] rounded hover:border-[#991B1B] hover:text-[#991B1B] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="随机翻阅一位帝王珍档"
            >
              <span className="text-[#991B1B]">✦</span>
              <span>翻阅名君</span>
            </button>
            <button
              onClick={() => onSelectTab('duel')}
              className="hidden sm:inline-flex px-4 py-1.5 text-xs font-serif font-medium text-amber-50 bg-[#991B1B] rounded hover:bg-[#7F1D1D] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              帝王跨朝PK
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="flex md:hidden items-center justify-around border-t border-[#E8E0D2] py-2 bg-[#F7F3EA] text-xs font-serif">
        <button
          onClick={() => onSelectTab('chronology')}
          className={`px-3 py-1 ${activeTab === 'chronology' ? 'text-[#991B1B] font-bold' : 'text-stone-600'}`}
        >
          编年长卷
        </button>
        <button
          onClick={() => onSelectTab('lineage')}
          className={`px-3 py-1 ${activeTab === 'lineage' ? 'text-[#991B1B] font-bold' : 'text-stone-600'}`}
        >
          朝代世系
        </button>
        <button
          onClick={() => onSelectTab('duel')}
          className={`px-3 py-1 ${activeTab === 'duel' ? 'text-[#991B1B] font-bold' : 'text-stone-600'}`}
        >
          风云对决
        </button>
        <button
          onClick={() => onSelectTab('catalog')}
          className={`px-3 py-1 ${activeTab === 'catalog' ? 'text-[#991B1B] font-bold' : 'text-stone-600'}`}
        >
          典籍图鉴
        </button>
      </div>
    </header>
  );
};
