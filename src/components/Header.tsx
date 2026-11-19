import React from 'react';
import { ASSETS } from '../data/mockData';
import { AppTab } from '../types/prooftrail';
import { ResilientImage } from './ResilientImage';

interface HeaderProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  syncedRepoCount: number;
}

const DESKTOP_TABS: { id: AppTab; label: string }[] = [
  { id: 'timeline', label: 'Timeline' },
  { id: 'skills', label: 'Skills' },
  { id: 'log-work', label: 'Log Work' },
  { id: 'github-sync', label: 'GitHub Sync' },
  { id: 'audit', label: 'Audit' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  isDark,
  onToggleTheme,
  syncedRepoCount,
}) => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 pt-safe backdrop-blur-xl border-b border-[var(--pt-outline-variant)] transition-colors"
      style={{ backgroundColor: 'var(--pt-header-bg)' }}
    >
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <button
          type="button"
          onClick={() => onSelectTab('timeline')}
          className="flex items-center gap-2.5 text-left cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pt-primary-container)] rounded-lg"
        >
          <ResilientImage
            src={ASSETS.logo}
            alt="ProofTrail Logo"
            className="h-8 w-8 rounded-md object-contain"
            fallbackIcon="verified_user"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-display text-[18px] leading-6 tracking-tight text-[var(--pt-primary)] font-bold whitespace-nowrap">
                ProofTrail
              </span>
              <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[16px]">
                verified
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)] animate-pulse" />
              <span className="font-mono-code text-[10px] leading-none text-[var(--pt-on-surface-variant)] tracking-wider uppercase font-semibold">
                Mainnet-L2
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] p-1 rounded-xl">
          {DESKTOP_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-semibold shadow-sm'
                    : 'text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)] hover:bg-[var(--pt-surface-container)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Theme Switch, Sync Indicator, Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to Warm Archival Light Mode' : 'Switch to Cryptographic Dark Mode'}
            title={isDark ? 'Switch to Warm Archival Light Mode' : 'Switch to Cryptographic Dark Mode'}
            className="flex items-center p-0.5 rounded-full bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] hover:border-[var(--pt-primary-container)] transition-all cursor-pointer"
          >
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full transition-all ${
                isDark
                  ? 'bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] shadow-sm'
                  : 'text-[var(--pt-on-surface-variant)]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">dark_mode</span>
            </span>
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full transition-all ${
                !isDark
                  ? 'bg-[var(--pt-surface-lowest)] text-[var(--pt-tertiary)] shadow-sm'
                  : 'text-[var(--pt-on-surface-variant)]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">light_mode</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('github-sync')}
            title={`${syncedRepoCount} repositories synced`}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-primary)] font-mono-code text-[11px] font-semibold hover:border-[var(--pt-primary-container)] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[14px] text-[var(--pt-secondary)]">lock</span>
            <span>SYNCED ({syncedRepoCount})</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('audit')}
            title="View Alex Chen Evaluator Passport"
            className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pt-primary-container)] cursor-pointer"
          >
            <ResilientImage
              src={ASSETS.profileAvatar}
              alt="Alex Chen Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[var(--pt-primary-container)]/35"
              fallbackIcon="person"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
