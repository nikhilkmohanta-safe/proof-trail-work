import React, { useMemo, useState } from 'react';
import { ASSETS } from '../data/mockData';
import { RepoItem } from '../types/prooftrail';
import { ResilientImage } from './ResilientImage';

interface SelectRepositoriesModalProps {
  isOpen: boolean;
  repositories: RepoItem[];
  onClose: () => void;
  onConfirm: (updated: RepoItem[]) => void;
}

type RepoFilter =
  | 'All'
  | 'Selected'
  | 'Rust / C++'
  | 'Distributed'
  | 'Public Only'
  | 'Private & Scrimmed';

export const SelectRepositoriesModal: React.FC<SelectRepositoriesModalProps> = ({
  isOpen,
  repositories,
  onClose,
  onConfirm,
}) => {
  const [draftRepos, setDraftRepos] = useState<RepoItem[]>(repositories);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<RepoFilter>('All');

  React.useEffect(() => {
    if (isOpen) {
      setDraftRepos(repositories);
    }
  }, [isOpen, repositories]);

  const selectedCount = draftRepos.filter((r) => r.selected).length;
  const totalSkillsCount = draftRepos
    .filter((r) => r.selected)
    .reduce((sum, r) => sum + r.skills.length, 0);

  const visibleRepos = useMemo(() => {
    return draftRepos.filter((repo) => {
      const q = search.trim().toLowerCase();
      const matchesQuery =
        !q ||
        repo.fullName.toLowerCase().includes(q) ||
        repo.description.toLowerCase().includes(q) ||
        repo.skills.some((s) => s.toLowerCase().includes(q));

      if (!matchesQuery) return false;
      if (filter === 'All') return true;
      if (filter === 'Selected') return repo.selected;
      if (filter === 'Public Only') return repo.visibility === 'public';
      if (filter === 'Private & Scrimmed') return repo.visibility === 'private';
      return repo.tags.includes(filter);
    });
  }, [draftRepos, search, filter]);

  if (!isOpen) return null;

  const toggleRepo = (id: string) => {
    setDraftRepos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  };

  const togglePrBranch = (id: string) => {
    setDraftRepos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, includePrBranches: !r.includePrBranches } : r))
    );
  };

  const handleSelectTop3 = () => {
    setDraftRepos((prev) => prev.map((r, idx) => ({ ...r, selected: idx < 3 })));
  };

  const handleClearAll = () => {
    setDraftRepos((prev) => prev.map((r) => ({ ...r, selected: false })));
  };

  const filterPills: { id: RepoFilter; label: string }[] = [
    { id: 'All', label: `All (${draftRepos.length})` },
    { id: 'Selected', label: `Selected (${selectedCount})` },
    { id: 'Rust / C++', label: 'Rust / C++' },
    { id: 'Distributed', label: 'Distributed' },
    { id: 'Public Only', label: 'Public Only' },
    { id: 'Private & Scrimmed', label: 'Private & Scrimmed' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drag Handle */}
        <div className="w-full flex items-center justify-center pt-2.5 pb-1 sm:hidden">
          <div className="w-12 h-1 rounded-full bg-[var(--pt-surface-highest)]" />
        </div>

        {/* Modal Header */}
        <div className="px-4 sm:px-5 pt-2 pb-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)] animate-pulse" />
              <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] tracking-wider uppercase font-semibold">
                GitHub Autonomous Ingestion
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] flex items-center justify-center text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-primary)] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-display text-[24px] leading-[30px] text-[var(--pt-primary)] font-bold tracking-tight">
              Select Repositories
            </h2>
            <p className="text-[12px] text-[var(--pt-on-surface-variant)] leading-relaxed">
              Choose repositories to notarize. Source code stays strictly local; only AST syntax
              trees and cryptographic commit telemetry are ledgered.
            </p>
          </div>

          {/* Account / Organization Context Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <ResilientImage
                  src={ASSETS.orgAvatar}
                  alt="@alexchen GitHub avatar"
                  className="w-8 h-8 rounded-full object-cover"
                  fallbackIcon="person"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--pt-secondary)] border border-[var(--pt-surface)]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono-code text-[12px] text-[var(--pt-on-surface)] font-semibold">
                    @alexchen
                  </span>
                  <span className="font-mono-code text-[10px] px-1.5 py-0.5 rounded bg-[var(--pt-surface-high)] text-[var(--pt-primary)]">
                    Personal
                  </span>
                </div>
                <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                  {draftRepos.length} repositories detected
                </span>
              </div>
            </div>
            <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] px-2 py-1 rounded bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)]">
              GitHub OAuth Connected
            </span>
          </div>
        </div>

        {/* Sticky Filters & Search */}
        <div className="px-4 sm:px-5 flex flex-col gap-2.5 pb-2">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[var(--pt-on-surface-variant)] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search repos, languages, or topics..."
              className="w-full bg-[var(--pt-surface)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] text-[var(--pt-on-surface)] placeholder:text-[var(--pt-outline)] text-[13px] rounded-lg pl-9 pr-9 py-2 outline-none focus:border-[var(--pt-primary-container)] transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="material-symbols-outlined absolute right-2.5 text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)] text-[18px] cursor-pointer"
              >
                cancel
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {filterPills.map((p) => {
              const active = filter === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setFilter(p.id)}
                  className={`shrink-0 px-2.5 py-1 rounded-full font-mono-code text-[11px] transition-all cursor-pointer ${
                    active
                      ? 'bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-semibold'
                      : 'bg-[var(--pt-surface-container)] text-[var(--pt-on-surface-variant)] border border-[var(--pt-outline-variant)] hover:text-[var(--pt-primary)]'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[12px] pt-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--pt-secondary)]" />
              <span className="font-mono-code text-[11px] text-[var(--pt-primary)] font-medium">
                {selectedCount} of {draftRepos.length} Repositories Selected
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSelectTop3}
                className="font-mono-code text-[11px] text-[var(--pt-secondary)] hover:underline font-semibold cursor-pointer"
              >
                Select Top 3
              </button>
              <span className="text-[var(--pt-outline-variant)]">•</span>
              <button
                type="button"
                onClick={handleClearAll}
                className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-error)] transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Repository Card List */}
        <div className="flex flex-col gap-2.5 px-4 sm:px-5 pt-1 pb-3 overflow-y-auto flex-1">
          {visibleRepos.map((repo) => (
            <div
              key={repo.id}
              onClick={() => toggleRepo(repo.id)}
              className={`relative flex flex-col p-3 rounded-xl border transition-all cursor-pointer ${
                repo.selected
                  ? 'bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-container)] border-[var(--pt-primary-container)]/40'
                  : 'bg-[var(--pt-surface)] dark:bg-[var(--pt-surface-low)] border-[var(--pt-outline-variant)] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  aria-label={`Select ${repo.fullName}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRepo(repo.id);
                  }}
                  className={`mt-0.5 shrink-0 w-5 h-5 rounded flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                    repo.selected
                      ? 'bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] shadow-sm'
                      : 'bg-[var(--pt-surface-highest)] border border-[var(--pt-outline-variant)] text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-mono-code text-[12px] text-[var(--pt-primary)] font-semibold truncate">
                        {repo.fullName}
                      </span>
                      <span className="material-symbols-outlined text-[14px] text-[var(--pt-on-surface-variant)] shrink-0">
                        {repo.visibility === 'private' ? 'lock' : 'public'}
                      </span>
                    </div>
                    <span className="shrink-0 px-1.5 py-0.5 rounded bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] font-mono-code text-[10px] text-[var(--pt-on-surface-variant)]">
                      {repo.branch}
                    </span>
                  </div>

                  <p className="text-[12px] text-[var(--pt-on-surface-variant)] mt-1">
                    {repo.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {repo.skillsPrefix && (
                      <span className="font-mono-code text-[10px] px-1.5 py-0.5 rounded bg-[var(--pt-surface-highest)] text-[var(--pt-primary)] font-medium">
                        {repo.skillsPrefix}
                      </span>
                    )}
                    {repo.skills.map((s) => (
                      <span
                        key={s}
                        className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-[var(--pt-surface)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] text-[var(--pt-secondary)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {repo.commits !== undefined && (
                    <div className="mt-2 pt-1.5 flex items-center justify-between text-[var(--pt-on-surface-variant)] bg-[var(--pt-surface)] dark:bg-[var(--pt-surface-lowest)]/60 border border-[var(--pt-outline-variant)] px-2.5 py-1.5 rounded font-mono-code text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[13px] text-[var(--pt-secondary)]">
                          commit
                        </span>
                        <span>{repo.commits} commits</span>
                        <span>•</span>
                        <span className="text-[var(--pt-secondary)]">{repo.confidence}</span>
                      </div>
                      {repo.ingestType === 'zk-scrim' ? (
                        <div className="flex items-center gap-1 text-[var(--pt-secondary)]">
                          <span className="material-symbols-outlined text-[12px]">
                            verified_user
                          </span>
                          <span>ZK-Scrim</span>
                        </div>
                      ) : (
                        <span className="text-[var(--pt-primary)]">Full Ingest</span>
                      )}
                    </div>
                  )}

                  {repo.noticeText && (
                    <div className="mt-2 p-2 rounded bg-[var(--pt-tertiary-fixed)]/50 border border-[var(--pt-tertiary)]/25 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[var(--pt-tertiary)] text-[16px]">
                        info
                      </span>
                      <span className="text-[11px] text-[var(--pt-tertiary)]">
                        {repo.noticeText}
                      </span>
                    </div>
                  )}

                  {repo.includePrBranches !== undefined && (
                    <label
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 mt-2 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={repo.includePrBranches}
                        onChange={() => togglePrBranch(repo.id)}
                        className="w-3.5 h-3.5 rounded accent-[var(--pt-secondary)]"
                      />
                      <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                        Include active pull request branches for live telemetry
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Footer & Confirm Triggers */}
        <div className="p-4 sm:p-5 border-t border-[var(--pt-outline-variant)] bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-lowest)] space-y-3">
          <div className="p-2.5 rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] flex items-start gap-2.5">
            <div className="p-1 rounded-full bg-[var(--pt-secondary-container)] text-[var(--pt-secondary)] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[15px]">shield_lock</span>
            </div>
            <div>
              <span className="font-mono-code text-[10px] text-[var(--pt-primary)] font-semibold uppercase tracking-wider">
                Zero-Knowledge IP Scrim Applied
              </span>
              <p className="text-[11px] text-[var(--pt-on-surface-variant)] leading-tight mt-0.5">
                Applied to selected private repositories. Secrets, tokens, and proprietary logic
                are filtered locally prior to Merkle tree anchoring.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              disabled={selectedCount === 0}
              onClick={() => onConfirm(draftRepos)}
              className="flex-1 py-3 px-4 rounded-xl bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-display text-[15px] font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 disabled:opacity-50 cursor-pointer"
            >
              <span>
                {selectedCount === 0
                  ? 'Select at least 1 repository'
                  : `Confirm ${selectedCount} Repositories & Sync (${totalSkillsCount} Skills)`}
              </span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] text-[var(--pt-on-surface-variant)] font-mono-code text-[12px] font-medium hover:text-[var(--pt-on-surface)] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
