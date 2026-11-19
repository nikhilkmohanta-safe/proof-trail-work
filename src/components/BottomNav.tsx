import React from 'react';
import { AppTab } from '../types/prooftrail';

interface BottomNavProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const isLogActive = activeTab === 'log-work' || activeTab === 'github-sync';

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe backdrop-blur-xl border-t border-[var(--pt-outline-variant)] shadow-[0_-2px_12px_rgba(0,0,0,0.12)]"
      style={{ backgroundColor: 'var(--pt-nav-bg)' }}
    >
      <div className="flex justify-around items-center h-16 px-1">
        <button
          type="button"
          onClick={() => onSelectTab('timeline')}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] gap-1 transition-colors cursor-pointer ${
            activeTab === 'timeline'
              ? 'text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] font-semibold'
              : 'text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">history_toggle_off</span>
          <span className="font-mono-code text-[11px] leading-[14px]">Timeline</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('skills')}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] gap-1 transition-colors cursor-pointer ${
            activeTab === 'skills'
              ? 'text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] font-semibold'
              : 'text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">grid_view</span>
          <span className="font-mono-code text-[11px] leading-[14px]">Skills</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('log-work')}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] gap-1 transition-colors cursor-pointer ${
            isLogActive
              ? 'text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] font-semibold'
              : 'text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)]'
          }`}
        >
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${
              isLogActive
                ? 'bg-[var(--pt-primary-container)]/15 border-[var(--pt-primary-container)]/40'
                : 'bg-[var(--pt-surface-high)] border-[var(--pt-outline-variant)]'
            }`}
          >
            <span className="material-symbols-outlined text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] text-[19px]">
              add_task
            </span>
          </div>
          <span className="font-mono-code text-[11px] leading-[14px]">Log Work</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('audit')}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] gap-1 transition-colors cursor-pointer ${
            activeTab === 'audit'
              ? 'text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] font-semibold'
              : 'text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">verified_user</span>
          <span className="font-mono-code text-[11px] leading-[14px]">Audit</span>
        </button>
      </div>
    </nav>
  );
};
