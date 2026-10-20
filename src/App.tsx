/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { ChronologyTimeline } from './components/ChronologyTimeline';
import { LineageTree } from './components/LineageTree';
import { DuelBattle } from './components/DuelBattle';
import { CatalogSearch } from './components/CatalogSearch';
import { EmperorModal } from './components/EmperorModal';
import { EMPERORS_DATA } from './data/emperorsData';
import { Emperor } from './types/history';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('chronology');
  const [selectedEmperor, setSelectedEmperor] = useState<Emperor | null>(null);
  const [duelAId, setDuelAId] = useState<string>('tang-taizong');
  const [duelBId, setDuelBId] = useState<string>('ming-chengzu');

  // Random emperor selector for the "翻阅名君" header action
  const handleOpenRandomEmperor = () => {
    const randomIndex = Math.floor(Math.random() * EMPERORS_DATA.length);
    setSelectedEmperor(EMPERORS_DATA[randomIndex]);
  };

  // Add an emperor directly to the duel comparison
  const handleAddToDuel = (emperor: Emperor) => {
    if (duelAId === emperor.id) {
      // already in slot A
    } else if (duelBId === emperor.id) {
      // already in slot B
    } else {
      // Swap into slot B
      setDuelBId(emperor.id);
    }
    setActiveTab('duel');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917] selection:bg-[#991B1B]/15 selection:text-[#991B1B]">
      {/* Top Bar following Top Bar Contract */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenRandomEmperor={handleOpenRandomEmperor}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'chronology' && (
          <ChronologyTimeline
            emperors={EMPERORS_DATA}
            onSelectEmperor={setSelectedEmperor}
            onAddToDuel={handleAddToDuel}
          />
        )}

        {activeTab === 'lineage' && (
          <LineageTree
            emperors={EMPERORS_DATA}
            onSelectEmperor={setSelectedEmperor}
            onAddToDuel={handleAddToDuel}
          />
        )}

        {activeTab === 'duel' && (
          <DuelBattle
            emperors={EMPERORS_DATA}
            emperorAId={duelAId}
            emperorBId={duelBId}
            onSelectEmperor={setSelectedEmperor}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogSearch
            emperors={EMPERORS_DATA}
            onSelectEmperor={setSelectedEmperor}
            onAddToDuel={handleAddToDuel}
          />
        )}
      </main>

      {/* Classical Archival Footer */}
      <footer className="mt-auto border-t border-[#E8E0D2] bg-[#F4EFE6] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-serif text-stone-600">
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded border border-[#991B1B] text-[#991B1B] flex items-center justify-center font-bold text-[10px]">
              史
            </span>
            <span>中华历代帝王长卷 · 华夏四千年王统帝制通览</span>
          </div>
          <div className="flex items-center gap-4 text-stone-500">
            <span>史料考订引自《尚书》《竹书纪年》《史记》《汉书》《资治通鉴》《宋史》《明史》《清史稿》</span>
          </div>
        </div>
      </footer>

      {/* Detailed Dossier Modal */}
      <EmperorModal
        emperor={selectedEmperor}
        onClose={() => setSelectedEmperor(null)}
        onAddToDuel={handleAddToDuel}
      />
    </div>
  );
}
