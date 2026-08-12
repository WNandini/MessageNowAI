import React, { ReactNode } from 'react';

interface StateCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconColor?: string;
  badge?: string;
  badgeType?: 'success' | 'muted';
}

export default function StateCard({ 
  title, 
  value, 
  icon, 
  iconColor = 'text-pink-500', 
  badge, 
  badgeType = 'success' 
}: StateCardProps) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
      <div className="flex items-center justify-between text-[var(--text-muted)]">
        <span className="text-xs font-semibold tracking-wider uppercase">{title}</span>
        <div className={`w-8 h-8 rounded-lg bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-4xl font-extrabold text-white">{value}</span>
        {badge && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
            badgeType === 'success' 
              ? 'text-emerald-400 bg-emerald-500/10 flex items-center space-x-1' 
              : 'text-[var(--text-muted)]'
          }`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}