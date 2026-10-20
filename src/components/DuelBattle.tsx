import React, { useState } from 'react';
import { Emperor, RadarStats } from '../types/history';
import { RadarChart } from './RadarChart';

interface DuelBattleProps {
  emperors: Emperor[];
  emperorAId?: string;
  emperorBId?: string;
  onSelectEmperor: (emperor: Emperor) => void;
}

interface PresetDuel {
  title: string;
  sub: string;
  idA: string;
  idB: string;
}

export const DuelBattle: React.FC<DuelBattleProps> = ({
  emperors,
  emperorAId,
  emperorBId,
  onSelectEmperor
}) => {
  // Preset historic matchups
  const presets: PresetDuel[] = [
    { title: '春秋双霸较量', sub: '一匡天下 VS 退避三舍', idA: 'chunqiu-qihuangong', idB: 'chunqiu-jinwengong' },
    { title: '战国变法双璧', sub: '商鞅变法 VS 李悝吴起', idA: 'zhanguo-qinxiaogong', idB: 'zhanguo-weiwenhou' },
    { title: '战国秦赵争锋', sub: '长平灭周 VS 胡服骑射', idA: 'zhanguo-qinzhaoxiang', idB: 'zhanguo-zhaowuling' },
    { title: '殷周革命圣王', sub: '成汤伐夏 VS 武王克商', idA: 'shang-tang', idB: 'zhou-wuwang' },
    { title: '千古始祖对决', sub: '大禹定九州 VS 始皇扫六合', idA: 'xia-yu', idB: 'qin-shihuang' },
    { title: '千古一帝对决', sub: '扫平六国 VS 罢黜百家', idA: 'qin-shihuang', idB: 'han-wudi' },
    { title: '盛世双雄交锋', sub: '天可汗 VS 天子守国门', idA: 'tang-taizong', idB: 'ming-chengzu' },
    { title: '康雍双璧较量', sub: '仁厚拓土 VS 铁腕革新', idA: 'qing-shengzu', idB: 'qing-shizong' },
    { title: '布衣天子论剑', sub: '约法三章 VS 重开日月', idA: 'han-gaozu', idB: 'ming-taizu' }
  ];

  const [currentIdA, setCurrentIdA] = useState<string>(emperorAId || 'tang-taizong');
  const [currentIdB, setCurrentIdB] = useState<string>(emperorBId || 'ming-chengzu');

  const empA = emperors.find(e => e.id === currentIdA) || emperors[0];
  const empB = emperors.find(e => e.id === currentIdB) || emperors[1];

  const formatYear = (year: number) => {
    if (year < 0) return `前${Math.abs(year)}年`;
    return `${year}年`;
  };

  const dimensions: { key: keyof RadarStats; label: string; desc: string }[] = [
    { key: 'civil', label: '文治宏规', desc: '治国纲领、律令典章与制度创新' },
    { key: 'military', label: '武功开疆', desc: '金戈铁马、版图拓土与军事统御' },
    { key: 'talent', label: '识人纳谏', desc: '虚怀求谏、用贤任能与驭臣之道' },
    { key: 'people', label: '恤民轻徭', desc: '与民休息、轻徭薄赋与惠民仁政' },
    { key: 'influence', label: '万世遗泽', desc: '后世深远影响、历史地位与文明进程' }
  ];

  const totalA = Math.round((empA.radar.civil + empA.radar.military + empA.radar.talent + empA.radar.people + empA.radar.influence) / 5);
  const totalB = Math.round((empB.radar.civil + empB.radar.military + empB.radar.talent + empB.radar.people + empB.radar.influence) / 5);

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="p-6 bg-[#F4EFE6] border border-[#E5DDD0] rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-serif text-[#991B1B] uppercase tracking-wider mb-2">
          <span>跨朝代风云对决台</span>
          <span>·</span>
          <span>五维能力多边形重叠量化评估</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mb-2">
          青史双雄·跨时空风云论剑
        </h1>
        <p className="text-sm font-serif text-stone-600 leading-relaxed max-w-3xl">
          打破朝代与时空藩篱，挑选任意两位华夏帝王展开多维度横向较量。通过文治、武功、用人、恤民与后世影响五维雷达的严谨量化，剖析治道得失。
        </p>

        {/* Quick Matchup Presets */}
        <div className="mt-4 pt-4 border-t border-[#E5DDD0]">
          <span className="text-xs font-serif text-stone-500 block mb-2">经典对决推荐：</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIdA(preset.idA);
                  setCurrentIdB(preset.idB);
                }}
                className={`px-3 py-1.5 text-xs font-serif rounded transition-colors cursor-pointer border ${
                  currentIdA === preset.idA && currentIdB === preset.idB
                    ? 'bg-[#991B1B] text-amber-50 border-[#991B1B] font-bold shadow-xs'
                    : 'bg-white text-stone-700 border-[#DDD5C7] hover:bg-[#F2ECE1]'
                }`}
              >
                <span>{preset.title}</span>
                <span className="text-[11px] opacity-75 ml-1">({preset.sub})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selectors and Duel Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Emperor A Dossier Card */}
        <div className="lg:col-span-4 bg-white border border-[#E5DDD0] rounded-lg p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3 mb-4">
              <span className="text-xs font-serif text-[#991B1B] font-bold tracking-widest uppercase">
                甲方 · 红方帝胄
              </span>
              <span className="text-xs font-mono font-bold text-[#991B1B]">均分 {totalA}</span>
            </div>

            {/* Select Dropdown A */}
            <div className="mb-4">
              <label className="text-xs font-serif text-stone-500 block mb-1">选择对比帝王：</label>
              <select
                value={currentIdA}
                onChange={(e) => setCurrentIdA(e.target.value)}
                className="w-full px-3 py-2 text-sm font-serif bg-[#FAF7F2] border border-[#DDD5C7] rounded focus:outline-none focus:border-[#991B1B] text-stone-800"
              >
                {emperors.map((e) => (
                  <option key={e.id} value={e.id} disabled={e.id === currentIdB}>
                    {e.dynastyName} · {e.templeName} ({e.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center py-2">
              <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#991B1B] text-[#991B1B] bg-[#991B1B]/5 flex items-center justify-center font-serif text-lg font-bold mb-2">
                {empA.dynastyName.slice(0, 1)}
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                {empA.templeName} · {empA.name}
              </h2>
              <p className="text-xs font-serif text-[#991B1B] mt-1">{empA.highlightTag}</p>
              <div className="text-xs font-serif text-stone-500 mt-2 space-y-1">
                <p>朝代：{empA.dynastyName}（{empA.eraNames[0] || '无'}）</p>
                <p className="font-mono">在位：{formatYear(empA.reignStart)} - {formatYear(empA.reignEnd)} ({empA.reignYears}年)</p>
                <p className="font-mono">享年：{empA.lifespanAge}岁</p>
              </div>
            </div>

            <p className="mt-4 text-xs font-serif text-stone-600 leading-relaxed text-justify line-clamp-4">
              {empA.biography}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex justify-between items-center">
            <span className="text-xs font-serif text-stone-400">陵寝：{empA.tomb}</span>
            <button
              onClick={() => onSelectEmperor(empA)}
              className="text-xs font-serif text-[#991B1B] hover:underline"
            >
              查阅完整生平 →
            </button>
          </div>
        </div>

        {/* Center: Overlapping Dual Radar Chart */}
        <div className="lg:col-span-4 bg-white border border-[#E5DDD0] rounded-lg p-5 shadow-2xs flex flex-col items-center justify-center">
          <div className="text-center mb-2">
            <span className="text-xs font-serif text-stone-400 tracking-wider uppercase block">
              双雄能力雷达叠影对比
            </span>
            <span className="text-sm font-serif font-bold text-stone-800">
              {empA.templeName} <span className="text-stone-400 font-normal">VS</span> {empB.templeName}
            </span>
          </div>

          <RadarChart
            statsA={empA.radar}
            nameA={empA.templeName}
            colorA="#991B1B"
            statsB={empB.radar}
            nameB={empB.templeName}
            colorB="#B45309"
            size={290}
          />

          <div className="w-full mt-4 p-3 bg-[#FAF7F2] rounded border border-[#EBE4D8] text-center text-xs font-serif text-stone-600">
            {totalA > totalB ? (
              <p>
                综合维度评估：<span className="font-bold text-[#991B1B]">{empA.templeName}</span> 略胜一筹 (+{totalA - totalB}分)
              </p>
            ) : totalB > totalA ? (
              <p>
                综合维度评估：<span className="font-bold text-[#B45309]">{empB.templeName}</span> 略胜一筹 (+{totalB - totalA}分)
              </p>
            ) : (
              <p>双方五维综合均分旗鼓相当（同为 {totalA} 分）</p>
            )}
          </div>
        </div>

        {/* Emperor B Dossier Card */}
        <div className="lg:col-span-4 bg-white border border-[#E5DDD0] rounded-lg p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3 mb-4">
              <span className="text-xs font-serif text-[#B45309] font-bold tracking-widest uppercase">
                乙方 · 琥珀金方帝胄
              </span>
              <span className="text-xs font-mono font-bold text-[#B45309]">均分 {totalB}</span>
            </div>

            {/* Select Dropdown B */}
            <div className="mb-4">
              <label className="text-xs font-serif text-stone-500 block mb-1">选择对比帝王：</label>
              <select
                value={currentIdB}
                onChange={(e) => setCurrentIdB(e.target.value)}
                className="w-full px-3 py-2 text-sm font-serif bg-[#FAF7F2] border border-[#DDD5C7] rounded focus:outline-none focus:border-[#B45309] text-stone-800"
              >
                {emperors.map((e) => (
                  <option key={e.id} value={e.id} disabled={e.id === currentIdA}>
                    {e.dynastyName} · {e.templeName} ({e.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center py-2">
              <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#B45309] text-[#B45309] bg-[#B45309]/5 flex items-center justify-center font-serif text-lg font-bold mb-2">
                {empB.dynastyName.slice(0, 1)}
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                {empB.templeName} · {empB.name}
              </h2>
              <p className="text-xs font-serif text-[#B45309] mt-1">{empB.highlightTag}</p>
              <div className="text-xs font-serif text-stone-500 mt-2 space-y-1">
                <p>朝代：{empB.dynastyName}（{empB.eraNames[0] || '无'}）</p>
                <p className="font-mono">在位：{formatYear(empB.reignStart)} - {formatYear(empB.reignEnd)} ({empB.reignYears}年)</p>
                <p className="font-mono">享年：{empB.lifespanAge}岁</p>
              </div>
            </div>

            <p className="mt-4 text-xs font-serif text-stone-600 leading-relaxed text-justify line-clamp-4">
              {empB.biography}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex justify-between items-center">
            <span className="text-xs font-serif text-stone-400">陵寝：{empB.tomb}</span>
            <button
              onClick={() => onSelectEmperor(empB)}
              className="text-xs font-serif text-[#B45309] hover:underline"
            >
              查阅完整生平 →
            </button>
          </div>
        </div>
      </div>

      {/* Five Dimensions Detailed Comparative Breakdown */}
      <div className="bg-white border border-[#E5DDD0] rounded-lg p-6 shadow-2xs space-y-6">
        <h3 className="text-base font-serif font-bold text-stone-900 border-b border-[#E8E0D2] pb-2 flex items-center justify-between">
          <span>五维能力横向逐项较量</span>
          <span className="text-xs text-stone-400 font-normal">满分 100 分制</span>
        </h3>

        <div className="space-y-4">
          {dimensions.map((dim) => {
            const valA = empA.radar[dim.key];
            const valB = empB.radar[dim.key];
            const diff = valA - valB;

            return (
              <div key={dim.key} className="p-3 bg-[#FAF7F2] rounded border border-[#EAE3D6]">
                <div className="flex justify-between items-center text-xs font-serif mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{dim.label}</span>
                    <span className="text-stone-400 text-[11px]">({dim.desc})</span>
                  </div>
                  <div className="font-mono tabular-nums text-xs">
                    <span className="font-bold text-[#991B1B]">{valA}</span>
                    <span className="text-stone-400 mx-1">比</span>
                    <span className="font-bold text-[#B45309]">{valB}</span>
                    <span className="ml-2 text-stone-500 font-serif">
                      {diff > 0 ? (
                        <span className="text-[#991B1B]">{empA.templeName} +{diff}</span>
                      ) : diff < 0 ? (
                        <span className="text-[#B45309]">{empB.templeName} +{Math.abs(diff)}</span>
                      ) : (
                        <span>平局</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Comparative Duel Bar */}
                <div className="grid grid-cols-2 gap-1 h-3 bg-white rounded overflow-hidden p-0.5 border border-[#DDD5C7]">
                  {/* Left: Emperor A Bar (grows right to left) */}
                  <div className="flex justify-end">
                    <div
                      className="h-full bg-[#991B1B] rounded-xs transition-all duration-500"
                      style={{ width: `${valA}%` }}
                    />
                  </div>
                  {/* Right: Emperor B Bar (grows left to right) */}
                  <div className="flex justify-start">
                    <div
                      className="h-full bg-[#B45309] rounded-xs transition-all duration-500"
                      style={{ width: `${valB}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Key Metrics Matrix */}
      <div className="bg-white border border-[#E5DDD0] rounded-lg p-6 shadow-2xs">
        <h3 className="text-base font-serif font-bold text-stone-900 border-b border-[#E8E0D2] pb-2 mb-4">
          帝王治道与青史功过对剖
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-serif text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5DDD0] bg-[#FAF7F2] text-stone-600">
                <th className="py-2.5 px-3 w-1/4">考评维度</th>
                <th className="py-2.5 px-3 w-3/8 text-[#991B1B] font-bold">{empA.templeName} ({empA.dynastyName})</th>
                <th className="py-2.5 px-3 w-3/8 text-[#B45309] font-bold">{empB.templeName} ({empB.dynastyName})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE1] text-stone-700">
              <tr>
                <td className="py-2.5 px-3 font-medium text-stone-500">经典治世名言</td>
                <td className="py-2.5 px-3 italic">“{empA.famousQuote || '暂无'}”</td>
                <td className="py-2.5 px-3 italic">“{empB.famousQuote || '暂无'}”</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-stone-500">卓越历史勋业</td>
                <td className="py-2.5 px-3">
                  <ul className="list-disc list-inside space-y-1">
                    {empA.achievements.slice(0, 3).map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </td>
                <td className="py-2.5 px-3">
                  <ul className="list-disc list-inside space-y-1">
                    {empB.achievements.slice(0, 3).map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-stone-500">治国过失与局限</td>
                <td className="py-2.5 px-3 text-stone-600">
                  <ul className="list-disc list-inside space-y-1">
                    {empA.criticisms.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </td>
                <td className="py-2.5 px-3 text-stone-600">
                  <ul className="list-disc list-inside space-y-1">
                    {empB.criticisms.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-stone-500">辅弼名臣贤将</td>
                <td className="py-2.5 px-3">{empA.famousMinisters && empA.famousMinisters.length > 0 ? empA.famousMinisters.join('、') : '暂缺详细记载'}</td>
                <td className="py-2.5 px-3">{empB.famousMinisters && empB.famousMinisters.length > 0 ? empB.famousMinisters.join('、') : '暂缺详细记载'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-stone-500">历代正史评点</td>
                <td className="py-2.5 px-3 text-stone-600 italic leading-relaxed">{empA.historicalVerdict}</td>
                <td className="py-2.5 px-3 text-stone-600 italic leading-relaxed">{empB.historicalVerdict}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
