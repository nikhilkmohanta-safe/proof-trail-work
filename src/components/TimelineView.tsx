import React, { useMemo, useState } from 'react';
import { ProofCategory, ProofItem } from '../types/prooftrail';
import { ResilientImage } from './ResilientImage';

interface TimelineViewProps {
  proofs: ProofItem[];
  totalProofCount: number;
  onShowToast: (message: string) => void;
  onNavigateToLogWork: () => void;
}

type FilterOption = 'all' | ProofCategory;

export const TimelineView: React.FC<TimelineViewProps> = ({
  proofs,
  totalProofCount,
  onShowToast,
  onNavigateToLogWork,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [inspectedProof, setInspectedProof] = useState<ProofItem | null>(null);

  const filteredProofs = useMemo(() => {
    if (activeFilter === 'all') return proofs;
    return proofs.filter((p) => p.category === activeFilter);
  }, [proofs, activeFilter]);

  const filterButtons: { id: FilterOption; icon: string; label: string; count?: number }[] = [
    { id: 'all', icon: 'grid_view', label: 'All Proofs', count: totalProofCount },
    { id: 'github', icon: 'terminal', label: 'GitHub Commits' },
    { id: 'hardware', icon: 'developer_board', label: 'Lab Hardware' },
    { id: 'debugging', icon: 'bug_report', label: 'Debugging Wins' },
    { id: 'architecture', icon: 'hub', label: 'Architecture' },
  ];

  const handleCopyHash = (hashStr: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(hashStr).catch(() => {});
    onShowToast(`Hash #${hashStr} copied to clipboard`);
  };

  const handleShareProof = (hashId: string) => {
    const link = `https://prooftrail.io/verify/${hashId}`;
    navigator.clipboard?.writeText(link).catch(() => {});
    onShowToast(`Proof link copied: ${hashId}`);
  };

  const handleCopyCli = () => {
    navigator.clipboard
      ?.writeText('proof-trail sync --continuous --network=mainnet-l2')
      .catch(() => {});
    onShowToast('CLI command copied to clipboard');
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      {/* Top Row: Protocol Banner + Telemetry Metrics Grid (Side-by-side on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Motivational Technical Protocol Banner */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-4 sm:p-5 shadow-sm flex items-center">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[var(--pt-primary-container)]/10 blur-2xl pointer-events-none" />
          <div className="flex items-start gap-3 relative z-10 w-full">
            <div className="w-9 h-9 rounded-lg bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] flex items-center justify-center shrink-0 text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)]">
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono-code text-[11px] uppercase text-[var(--pt-secondary)] tracking-wider font-semibold">
                  Automated Proof-of-Work
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)] animate-ping" />
              </div>
              <p className="text-[13px] text-[var(--pt-on-surface-variant)] leading-relaxed">
                No manual resume formatting required. Your daily execution commits build undeniable,
                cryptographic evidence directly on-chain.
              </p>
            </div>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="lg:col-span-5 grid grid-cols-3 gap-2.5">
          <div className="flex flex-col justify-between bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-3 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">Proofs</span>
              <span className="material-symbols-outlined text-[15px] text-[var(--pt-secondary)]">
                verified_user
              </span>
            </div>
            <span className="font-display text-[20px] font-bold text-[var(--pt-on-surface)] tabular-nums">
              {totalProofCount}
            </span>
            <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] flex items-center gap-0.5 mt-0.5 font-medium">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>
              +4 this wk
            </span>
          </div>

          <div className="flex flex-col justify-between bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-3 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] truncate">
                Authenticity
              </span>
              <span className="material-symbols-outlined text-[15px] text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)]">
                fingerprint
              </span>
            </div>
            <span className="font-display text-[20px] font-bold text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] tabular-nums">
              99.4%
            </span>
            <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] mt-0.5 truncate">
              L2 Consensus
            </span>
          </div>

          <div className="flex flex-col justify-between bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-3 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] truncate">
                Skills Active
              </span>
              <span className="material-symbols-outlined text-[15px] text-[var(--pt-tertiary)]">
                memory
              </span>
            </div>
            <span className="font-display text-[20px] font-bold text-[var(--pt-on-surface)] tabular-nums">
              18
            </span>
            <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] mt-0.5 truncate">
              Verified trees
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar + Stream Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setActiveFilter(btn.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono-code text-[11px] shrink-0 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-semibold shadow-sm'
                    : 'bg-[var(--pt-surface-container)] text-[var(--pt-on-surface-variant)] border border-[var(--pt-outline-variant)] hover:text-[var(--pt-on-surface)]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">{btn.icon}</span>
                <span>{btn.label}</span>
                {btn.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] tabular-nums ${
                      isActive
                        ? 'bg-black/15 dark:bg-black/20 text-current'
                        : 'bg-[var(--pt-surface-high)] text-[var(--pt-on-surface-variant)]'
                    }`}
                  >
                    {btn.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNavigateToLogWork}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] font-mono-code text-[11px] font-semibold hover:border-[var(--pt-primary-container)] transition-colors shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">add_task</span>
          <span>Log Execution</span>
        </button>
      </div>

      {/* Main Content Split: Stream on Left, Auto-Sync Daemon & Quick Stats on Right (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center Column: Execution Stream */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="font-mono-code text-[14px] text-[var(--pt-on-surface)] font-semibold tracking-tight">
                Execution Stream
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--pt-secondary-container)] dark:bg-[var(--pt-surface-high)] text-[var(--pt-primary)] dark:text-[var(--pt-primary-fixed)] font-mono-code text-[11px] font-medium border border-[var(--pt-outline-variant)]">
                LIVE FEED
              </span>
            </div>
            <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
              UTC-00:00
            </span>
          </div>

          {/* Evidence Timeline Feed */}
          <div className="relative flex flex-col space-y-4">
            {/* Timeline Backbone Connector Line */}
            <div className="absolute left-4 top-4 bottom-6 w-0.5 bg-[var(--pt-outline-variant)] dark:bg-[var(--pt-surface-high)]" />

            {filteredProofs.length === 0 ? (
              <div className="pl-10">
                <div className="rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-6 text-center space-y-3">
                  <span className="material-symbols-outlined text-[32px] text-[var(--pt-outline)]">
                    filter_list_off
                  </span>
                  <p className="text-[14px] text-[var(--pt-on-surface-variant)]">
                    No proofs matched this filter category yet.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('all')}
                    className="px-4 py-2 rounded-lg bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-mono-code text-[12px] font-semibold cursor-pointer"
                  >
                    Show All Proofs
                  </button>
                </div>
              </div>
            ) : (
              filteredProofs.map((proof) => {
                const ringColor =
                  proof.nodeColor === 'primary'
                    ? 'border-[var(--pt-primary)] dark:ring-[var(--pt-primary-container)]/40'
                    : proof.nodeColor === 'tertiary'
                    ? 'border-[var(--pt-tertiary)] dark:ring-[var(--pt-tertiary)]/40'
                    : 'border-[var(--pt-secondary)] dark:ring-[var(--pt-secondary)]/40';

                const dotColor =
                  proof.nodeColor === 'primary'
                    ? 'bg-[var(--pt-primary)] dark:bg-[var(--pt-primary-container)]'
                    : proof.nodeColor === 'tertiary'
                    ? 'bg-[var(--pt-tertiary)]'
                    : 'bg-[var(--pt-secondary)]';

                return (
                  <div key={proof.id} className="relative pl-10">
                    {/* Node Icon Anchor */}
                    <div
                      className={`absolute left-4 top-5 -translate-x-1/2 w-6 h-6 rounded-full bg-[var(--pt-surface)] dark:bg-[var(--pt-surface-lowest)] border-2 dark:border-0 dark:ring-2 ${ringColor} flex items-center justify-center z-10 shadow-sm`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${dotColor} ${
                          proof.nodeColor === 'primary' ? 'animate-pulse' : ''
                        }`}
                      />
                    </div>

                    <div className="rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-4 sm:p-5 shadow-sm space-y-3 transition-transform">
                      {/* Card Header Meta */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded-md font-mono-code text-[11px] flex items-center gap-1 font-medium border ${
                              proof.badgeTone === 'tertiary'
                                ? 'bg-[var(--pt-tertiary-fixed)] text-[var(--pt-tertiary)] border-[var(--pt-tertiary)]/20'
                                : 'bg-[var(--pt-secondary-container)]/60 dark:bg-[var(--pt-secondary)]/10 text-[var(--pt-primary)] dark:text-[var(--pt-secondary)] border-[var(--pt-outline-variant)]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[13px]">
                              {proof.badgeIcon}
                            </span>
                            {proof.badgeLabel}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleCopyHash(proof.hashId, e)}
                            className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-primary)] transition-colors font-mono-code text-[11px] cursor-pointer"
                          >
                            <span>#{proof.hashId}</span>
                            <span className="material-symbols-outlined text-[12px]">
                              content_copy
                            </span>
                          </button>
                        </div>
                        <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                          {proof.timestamp}
                        </span>
                      </div>

                      {/* Evidence Title & Narrative */}
                      <div>
                        <h2 className="font-display text-[18px] leading-[24px] text-[var(--pt-on-surface)] font-semibold mb-1">
                          {proof.title}
                        </h2>
                        <p className="text-[13px] leading-[19px] text-[var(--pt-on-surface-variant)]">
                          {proof.narrative}
                        </p>
                      </div>

                      {/* Optional Verification Snapshot Image */}
                      {proof.imageUrl && (
                        <div className="relative w-full h-36 sm:h-44 rounded-lg overflow-hidden border border-[var(--pt-outline-variant)] bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-lowest)]">
                          <ResilientImage
                            src={proof.imageUrl}
                            alt={proof.imageAlt || proof.title}
                            className="w-full h-full object-cover"
                            fallbackIcon="code"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                          {proof.commitSha && (
                            <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#d7fff3] font-mono-code text-[11px] flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px] text-[#4edea3]">
                                  commit
                                </span>
                                {proof.commitSha}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Optional Inline Hardware Waveform */}
                      {proof.waveform && (
                        <div className="rounded-lg bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] p-3 space-y-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                              {proof.waveform.clockLabel}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-[var(--pt-secondary-container)] text-[var(--pt-primary)] dark:text-[var(--pt-secondary)] font-mono-code text-[11px] font-semibold">
                              {proof.waveform.statusLabel}
                            </span>
                          </div>
                          <div className="w-full h-12 bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-low)] rounded flex items-center px-2 overflow-hidden border border-[var(--pt-outline-variant)]">
                            <svg
                              className="w-full h-8 text-[var(--pt-on-surface-variant)] dark:text-[var(--pt-primary-container)]"
                              fill="none"
                              preserveAspectRatio="none"
                              viewBox="0 0 320 32"
                            >
                              <path
                                d="M0 16 L20 16 L20 4 L40 4 L40 16 L60 16 L60 4 L80 4 L80 16 L100 16 L100 4 L120 4 L120 16 L140 16 L140 4 L160 4 L160 16 L180 16 L180 4 L200 4 L200 16 L220 16 L220 4 L240 4 L240 16 L260 16 L260 4 L280 4 L280 16 L300 16 L300 4 L320 4"
                                opacity="0.35"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M0 28 L50 28 L55 20 L160 20 L165 28 L230 28 L235 20 L315 20 L320 28"
                                stroke="var(--pt-wave-signal)"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.2"
                              />
                            </svg>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-mono-code text-[var(--pt-on-surface-variant)] flex-wrap gap-2">
                            <span>{proof.waveform.lut}</span>
                            <span>{proof.waveform.dsp}</span>
                            <span className="text-[var(--pt-secondary)] font-semibold">
                              {proof.waveform.slack}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Optional Comparison Metric Bar */}
                      {proof.comparisonBar && (
                        <div className="rounded-lg bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] p-3 space-y-1.5">
                          <div className="flex justify-between items-center text-[11px] font-mono-code">
                            <span className="text-[var(--pt-on-surface-variant)]">
                              {proof.comparisonBar.label}
                            </span>
                            <span className="text-[var(--pt-secondary)] font-semibold">
                              {proof.comparisonBar.delta}
                            </span>
                          </div>
                          <div className="w-full bg-[var(--pt-surface-high)] h-2 rounded-full overflow-hidden flex">
                            <div
                              className="bg-[var(--pt-outline)]/40 h-full"
                              style={{ width: `${proof.comparisonBar.beforePct}%` }}
                            />
                            <div
                              className="bg-[var(--pt-secondary)] h-full"
                              style={{ width: `${proof.comparisonBar.afterPct}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Optional Metrics Telemetry Row */}
                      {proof.metrics && (
                        <div className="flex items-center flex-wrap gap-1.5 font-mono-code text-[11px]">
                          {proof.metrics.map((m, idx) => (
                            <div
                              key={idx}
                              className={`px-2 py-1 rounded border border-[var(--pt-outline-variant)] flex items-center gap-1 font-medium ${
                                m.tone === 'secondary'
                                  ? 'bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-high)] text-[var(--pt-secondary)]'
                                  : m.tone === 'primary'
                                  ? 'bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-high)] text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)]'
                                  : 'bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-high)] text-[var(--pt-on-surface-variant)]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">{m.icon}</span>
                              <span>{m.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Extracted Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {proof.skills.map((skill, idx) => (
                          <span
                            key={skill}
                            className={`px-2 py-0.5 rounded bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] font-mono-code text-[11px] ${
                              idx === 0
                                ? 'text-[var(--pt-primary)] font-medium'
                                : idx === 2
                                ? 'text-[var(--pt-secondary)]'
                                : 'text-[var(--pt-on-surface)]'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Trust Score & Seal Footer OR Quick Actions */}
                      {proof.trustScore && (
                        <div className="flex items-center justify-between pt-2 border-t border-[var(--pt-outline-variant)]/70">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-[var(--pt-surface-high)] overflow-hidden">
                              <div
                                className="h-full bg-[var(--pt-secondary)] rounded-full"
                                style={{ width: `${proof.trustPct ?? 98}%` }}
                              />
                            </div>
                            <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] font-semibold">
                              {proof.trustScore}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[var(--pt-on-surface-variant)] font-mono-code text-[11px]">
                            {proof.sealIcon && (
                              <span className="material-symbols-outlined text-[14px] text-[var(--pt-secondary)]">
                                {proof.sealIcon}
                              </span>
                            )}
                            <span>{proof.sealLabel}</span>
                          </div>
                        </div>
                      )}

                      {proof.showQuickActions && (
                        <div className="flex items-center gap-2 pt-2 border-t border-[var(--pt-outline-variant)]/70">
                          <button
                            type="button"
                            onClick={() => handleShareProof(proof.hashId)}
                            className="flex-1 py-2 px-3 rounded-lg bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] hover:border-[var(--pt-primary-container)] text-[var(--pt-on-surface)] font-mono-code text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px] text-[var(--pt-primary)]">
                              share
                            </span>
                            <span>Share Proof Link</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setInspectedProof(proof)}
                            className="flex-1 py-2 px-3 rounded-lg bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] hover:border-[var(--pt-secondary)] text-[var(--pt-on-surface)] font-mono-code text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px] text-[var(--pt-secondary)]">
                              fingerprint
                            </span>
                            <span>Verification Hash</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (Desktop) / Bottom Card (Mobile): Auto-Sync Daemons */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          <div className="rounded-xl bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] text-[20px]">
                  sync_saved_locally
                </span>
                <span className="font-display text-[17px] font-semibold text-[var(--pt-on-surface)]">
                  Auto-Sync Daemons
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[var(--pt-secondary-container)] text-[var(--pt-primary)] dark:text-[var(--pt-secondary)] font-mono-code text-[11px] font-semibold">
                ACTIVE
              </span>
            </div>
            <p className="text-[12px] leading-[18px] text-[var(--pt-on-surface-variant)]">
              ProofTrail CLI agent listening to local Git hooks and FPGA synthesis outputs. Next
              scheduled block notarization in 12m.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value="proof-trail sync --continuous --network=mainnet-l2"
                aria-label="ProofTrail CLI sync command"
                className="w-full bg-[var(--pt-surface-lowest)] text-[var(--pt-primary)] font-mono-code text-[11px] px-3 py-2 rounded-lg border border-[var(--pt-outline-variant)] outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyCli}
                className="px-3 py-2 rounded-lg bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-mono-code text-[11px] font-semibold shrink-0 active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">content_copy</span>
                <span>Copy</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-[15px] font-semibold text-[var(--pt-on-surface)]">
                Quick Capture
              </span>
              <span className="font-mono-code text-[11px] text-[var(--pt-secondary)]">
                L2-Ready
              </span>
            </div>
            <p className="text-[12px] text-[var(--pt-on-surface-variant)] leading-relaxed">
              Finished a benchmark, hardware synthesis, or debugging win? Mint an attested proof
              entry directly into this stream.
            </p>
            <button
              type="button"
              onClick={onNavigateToLogWork}
              className="w-full py-2.5 px-4 rounded-lg bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-mono-code text-[12px] font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>Log New Technical Work</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verification Hash Inspection Modal */}
      {inspectedProof && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setInspectedProof(null)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[20px]">
                  verified_user
                </span>
                <h3 className="font-display text-[18px] font-bold text-[var(--pt-on-surface)]">
                  Merkle Proof Receipt
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedProof(null)}
                className="w-8 h-8 rounded-full bg-[var(--pt-surface-high)] flex items-center justify-center text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="rounded-lg bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] p-3 space-y-2 font-mono-code text-[11px]">
              <div className="flex justify-between">
                <span className="text-[var(--pt-on-surface-variant)]">Proof ID</span>
                <span className="text-[var(--pt-primary)] font-semibold">
                  #{inspectedProof.hashId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--pt-on-surface-variant)]">Full Root Hash</span>
                <span className="text-[var(--pt-secondary)]">{inspectedProof.fullHash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--pt-on-surface-variant)]">Timestamp</span>
                <span className="text-[var(--pt-on-surface)]">{inspectedProof.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--pt-on-surface-variant)]">Consensus</span>
                <span className="text-[var(--pt-secondary)]">Mainnet-L2 Finalized</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(inspectedProof.fullHash).catch(() => {});
                onShowToast(`Copied root hash ${inspectedProof.fullHash}`);
                setInspectedProof(null);
              }}
              className="w-full py-2.5 rounded-lg bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-mono-code text-[12px] font-semibold cursor-pointer"
            >
              Copy Full Root Hash
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
