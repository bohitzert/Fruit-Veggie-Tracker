import React from 'react';
interface ActivityRingProps {
  progress: number;
  size: number;
  strokeWidth: number;
  color: string;
  label: string;
}
export function ActivityRing({
  progress,
  size,
  strokeWidth,
  color,
  label
}: ActivityRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress / 100 * circumference;
  return <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
        <text x={size / 2} y={size / 2} textAnchor="middle" dy=".3em" className="text-sm font-bold fill-gray-900 transform rotate-90" style={{
        transformOrigin: 'center'
      }}>
          {progress}%
        </text>
      </svg>
      {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
    </div>;
}