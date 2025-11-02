import React from 'react';
interface Ring {
  progress: number;
  color: string;
  label: string;
}
interface NestedActivityRingProps {
  rings: Ring[];
  size: number;
}
export function NestedActivityRing({
  rings,
  size
}: NestedActivityRingProps) {
  const strokeWidth = 12;
  const gap = 4;
  return <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} className="transform -rotate-90">
        {rings.map((ring, index) => {
        const radius = (size - strokeWidth) / 2 - index * (strokeWidth + gap);
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - ring.progress / 100 * circumference;
        return <g key={index}>
              <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
              <circle cx={size / 2} cy={size / 2} r={radius} stroke={ring.color} strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
            </g>;
      })}
      </svg>
      <div className="flex justify-center gap-6">
        {rings.map((ring, index) => <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{
          backgroundColor: ring.color
        }} />
            <div className="text-left">
              <p className="text-xs text-gray-500">{ring.label}</p>
              <p className="text-sm font-semibold text-gray-900">
                {ring.progress}%
              </p>
            </div>
          </div>)}
      </div>
    </div>;
}