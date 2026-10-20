import React from 'react';
import { RadarStats } from '../types/history';

interface RadarChartProps {
  statsA: RadarStats;
  nameA: string;
  colorA?: string;
  statsB?: RadarStats;
  nameB?: string;
  colorB?: string;
  size?: number;
  showLabels?: boolean;
}

const DIMENSIONS: { key: keyof RadarStats; label: string; sub: string }[] = [
  { key: 'civil', label: '文治宏规', sub: '制度·礼法·治道' },
  { key: 'military', label: '武功开疆', sub: '拓土·征伐·御侮' },
  { key: 'talent', label: '识人纳谏', sub: '用贤·纳诤·容人' },
  { key: 'people', label: '恤民轻徭', sub: '安民·省刑·薄赋' },
  { key: 'influence', label: '万世遗泽', sub: '制度·文化·历史' }
];

export const RadarChart: React.FC<RadarChartProps> = ({
  statsA,
  nameA,
  colorA = '#991B1B', // Vermillion 朱砂红
  statsB,
  nameB,
  colorB = '#B45309', // Imperial Amber 皇家琥珀金
  size = 320,
  showLabels = true
}) => {
  const center = size / 2;
  const radius = (size / 2) * 0.72;
  const angleStep = (Math.PI * 2) / DIMENSIONS.length;
  // Offset by -Math.PI / 2 to make the first vertex point straight up
  const startAngle = -Math.PI / 2;

  // Calculate coordinates for a polygon point given angle index and value (0-100)
  const getCoordinates = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Concentric polygon background levels (20%, 40%, 60%, 80%, 100%)
  const levels = [20, 40, 60, 80, 100];

  const getPointsString = (stats: RadarStats) => {
    return DIMENSIONS.map((dim, idx) => {
      const { x, y } = getCoordinates(idx, stats[dim.key]);
      return `${x},${y}`;
    }).join(' ');
  };

  const pointsA = getPointsString(statsA);
  const pointsB = statsB ? getPointsString(statsB) : null;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible select-none transition-all duration-300"
      >
        <defs>
          {/* Subtle gradients */}
          <radialGradient id="radarPaperGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5EFE6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Ambient background circle */}
        <circle cx={center} cy={center} r={radius} fill="url(#radarPaperGlow)" />

        {/* Concentric grid webs */}
        {levels.map((lvl) => {
          const webPoints = DIMENSIONS.map((_, idx) => {
            const { x, y } = getCoordinates(idx, lvl);
            return `${x},${y}`;
          }).join(' ');
          return (
            <polygon
              key={lvl}
              points={webPoints}
              fill="none"
              stroke="#E2D9CC"
              strokeWidth={lvl === 100 ? '1.5' : '1'}
              strokeDasharray={lvl === 100 ? undefined : '3 3'}
              opacity="0.8"
            />
          );
        })}

        {/* Radial spoke lines from center */}
        {DIMENSIONS.map((_, idx) => {
          const { x, y } = getCoordinates(idx, 100);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#D8CEBD"
              strokeWidth="1"
            />
          );
        })}

        {/* Polygon B (if comparing) */}
        {pointsB && statsB && (
          <g className="transition-all duration-500">
            <polygon
              points={pointsB}
              fill={colorB}
              fillOpacity="0.22"
              stroke={colorB}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {DIMENSIONS.map((dim, idx) => {
              const { x, y } = getCoordinates(idx, statsB[dim.key]);
              return (
                <circle
                  key={`b-${idx}`}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#FAF7F2"
                  stroke={colorB}
                  strokeWidth="2"
                />
              );
            })}
          </g>
        )}

        {/* Polygon A */}
        <g className="transition-all duration-500">
          <polygon
            points={pointsA}
            fill={colorA}
            fillOpacity={statsB ? '0.28' : '0.25'}
            stroke={colorA}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {DIMENSIONS.map((dim, idx) => {
            const { x, y } = getCoordinates(idx, statsA[dim.key]);
            return (
              <circle
                key={`a-${idx}`}
                cx={x}
                cy={y}
                r="4"
                fill="#FAF7F2"
                stroke={colorA}
                strokeWidth="2"
              />
            );
          })}
        </g>

        {/* Dimension labels placed around outer rim */}
        {showLabels &&
          DIMENSIONS.map((dim, idx) => {
            const angle = startAngle + idx * angleStep;
            const labelR = radius + 26;
            const x = center + labelR * Math.cos(angle);
            const y = center + labelR * Math.sin(angle);

            // Alignment adjustment based on position
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (Math.cos(angle) > 0.3) textAnchor = 'start';
            else if (Math.cos(angle) < -0.3) textAnchor = 'end';

            const valA = statsA[dim.key];
            const valB = statsB ? statsB[dim.key] : null;

            return (
              <g key={dim.key} transform={`translate(${x}, ${y})`}>
                <text
                  textAnchor={textAnchor}
                  dy="-2"
                  className="text-xs font-serif font-bold fill-[#292524]"
                >
                  {dim.label}
                </text>
                <text
                  textAnchor={textAnchor}
                  dy="12"
                  className="text-[10px] tabular-nums font-mono fill-[#78716C]"
                >
                  <tspan fill={colorA} fontWeight="bold">{valA}</tspan>
                  {valB !== null && (
                    <>
                      <tspan fill="#A8A29E"> vs </tspan>
                      <tspan fill={colorB} fontWeight="bold">{valB}</tspan>
                    </>
                  )}
                </text>
              </g>
            );
          })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colorA }} />
          <span className="font-serif font-medium text-stone-800">{nameA}</span>
        </div>
        {nameB && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colorB }} />
            <span className="font-serif font-medium text-stone-800">{nameB}</span>
          </div>
        )}
      </div>
    </div>
  );
};
