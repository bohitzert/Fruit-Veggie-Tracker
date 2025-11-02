import React from 'react';
interface VitaminCircleProps {
  name: string;
  current: number;
  recommended: number;
  unit: string;
  color: string;
  period: 'daily' | 'weekly';
}
export function VitaminCircle({
  name,
  current,
  recommended,
  unit,
  color,
  period
}: VitaminCircleProps) {
  const percentage = Math.min(current / recommended * 100, 100);
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - percentage / 100 * circumference;
  return <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
      <svg width="90" height="90" className="transform -rotate-90">
        <circle cx="45" cy="45" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
        <circle cx="45" cy="45" r={radius} stroke={color} strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
      </svg>
      <div className="text-center mt-2">
        <p className="text-xs font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">
          {current}
          {unit} / {recommended}
          {unit}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">{period} intake</p>
      </div>
    </div>;
}