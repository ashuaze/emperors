export type DynastyId = 
  | 'xia'
  | 'shang'
  | 'west_zhou'
  | 'spring_autumn'
  | 'warring_states'
  | 'qin' 
  | 'west_han' 
  | 'east_han' 
  | 'three_kingdoms' 
  | 'jin' 
  | 'north_south' 
  | 'sui' 
  | 'tang' 
  | 'five_dynasties' 
  | 'song' 
  | 'liao_jin_yuan' 
  | 'ming' 
  | 'qing';

export interface Dynasty {
  id: DynastyId;
  name: string;
  fullName: string;
  capital: string;
  startYear: number;
  endYear: number;
  founder: string;
  description: string;
  badgeColor: string;
  emperorCount: number;
  historicalSignificance: string;
}

export interface RadarStats {
  civil: number;      // 文治宏规 (0-100)
  military: number;   // 武功开疆 (0-100)
  talent: number;     // 识人纳谏 (0-100)
  people: number;     // 恤民轻徭 (0-100)
  influence: number;  // 万世遗泽 (0-100)
}

export interface EmperorLineage {
  generation: number;
  predecessorId?: string;
  predecessorName?: string;
  relationship: string; // e.g. "开国", "皇长子", "皇四子", "弟继兄位", "叔侄相承", "宗室入继"
  successorId?: string;
  successorName?: string;
}

export interface ZhouSonOfHeavenSync {
  monarchName: string;       // 对应周天子（如“周襄王 姬郑”）
  historicalContext: string; // 诸侯霸主与周室互动重大交汇（如“葵丘会盟，受赐文武之胙”）
}

export interface Emperor {
  id: string;
  name: string;               // 姓名，如“李世民”
  templeName: string;         // 庙号，如“唐太宗”
  posthumousName: string;     // 谥号简写，如“文武大圣大广孝皇帝”
  eraNames: string[];         // 年号列表，如["贞观"]
  dynastyId: DynastyId;
  dynastyName: string;
  birthYear: number;          // 负数表示公元前
  deathYear: number;
  reignStart: number;
  reignEnd: number;
  reignYears: number;
  lifespanAge: number;
  highlightTag: string;       // e.g. "贞观之治·天可汗"
  epochType: 'founder' | 'prosperity' | 'reform' | 'turbulent' | 'decline';
  lineage: EmperorLineage;
  radar: RadarStats;
  biography: string;          // 生平简述
  achievements: string[];     // 主要功绩
  criticisms: string[];       // 历史过失/争议
  famousMinisters?: string[]; // 治世名臣
  famousQuote?: string;       // 名言名句
  tomb: string;               // 陵寝
  historicalVerdict: string;  // 史书名家评点
  zhouSonOfHeavenSync?: ZhouSonOfHeavenSync; // 春秋战国对应周天子法统纪年
}
