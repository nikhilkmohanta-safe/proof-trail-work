import React, { useState } from 'react';
import { RepoItem } from '../types/prooftrail';

interface GitHubSyncViewProps {
  repositories: RepoItem[];
  onOpenRepoModal: () => void;
  onCompleteSync: () => void;
  onSkip: () => void;
  onShowToast: (message: string) => void;
}

export const GitHubSyncView: React.FC<GitHubSyncViewProps> = ({
  repositories,
  onOpenRepoModal,
  onCompleteSync,
  onSkip,
  onShowToast,
}) => {
  const [zkEnabled, setZkEnabled] = useState(true);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const selectedRepos = repositories.filter((r) => r.selected);

  const handleCopyCurl = () => {
    navigator.clipboard
      ?.writeText('curl -fsSL https://proof-trail.dev/hook | bash')
      .catch(() => {});
    setCopiedCurl(true);
    onShowToast('Daemon hook command copied to clipboard');
    setTimeout(() => setCopiedCurl(false), 1800);
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      {/* Progress Stepper */}
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-mono-code text-[11px] uppercase tracking-wider text-[var(--pt-secondary)] flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)] animate-ping" />
            Step 2 of 3 • Autonomous Ingestion
          </span>
          <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
            66% COMPLETED
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 w-full pt-1">
          <div className="h-1.5 rounded-full bg-[var(--pt-primary-container)]" />
          <div className="h-1.5 rounded-full bg-[var(--pt-primary-container)]" />
          <div className="h-1.5 rounded-full bg-[var(--pt-surface-highest)]" />
        </div>
      </div>

      {/* Title & Narrative */}
      <div className="space-y-1">
        <h1 className="font-display text-[26px] sm:text-[30px] leading-[34px] text-[var(--pt-primary)] tracking-tight font-bold">
          Zero-Friction GitHub Sync
        </h1>
        <p className="text-[14px] text-[var(--pt-on-surface-variant)] leading-relaxed max-w-2xl">
          Turn every push, PR, and benchmark into tamper-proof proof-of-work without ever
          disrupting your local terminal flow.
        </p>
      </div>

      {/* Responsive Split: Pipeline Topology on Left, Sync Preferences on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Pipeline Topology + CTA */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] p-4 sm:p-5 shadow-sm flex flex-col space-y-4 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-36 h-36 bg-[var(--pt-primary-container)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[18px]">
                  schema
                </span>
                <span className="font-mono-code text-[12px] font-semibold text-[var(--pt-on-surface)] tracking-wide uppercase">
                  Pipeline Topology
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] text-[var(--pt-secondary)] font-mono-code text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)]" />
                <span>DAEMON LISTENING: 9411</span>
              </div>
            </div>

            {/* Live Flow Sequence */}
            <div className="grid grid-cols-3 gap-2 items-center text-center py-2">
              <div className="flex flex-col items-center p-2.5 rounded-lg bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] space-y-1">
                <div className="w-8 h-8 rounded-full bg-[var(--pt-surface-container)] flex items-center justify-center text-[var(--pt-primary)]">
                  <span className="material-symbols-outlined text-[18px]">publish</span>
                </div>
                <span className="font-mono-code text-[11px] font-semibold text-[var(--pt-on-surface)]">
                  Git Push / Hook
                </span>
                <span className="font-mono-code text-[10px] text-[var(--pt-on-surface-variant)]">
                  diff &amp; stats
                </span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-[var(--pt-secondary)] animate-pulse text-[22px]">
                  trending_flat
                </span>
                <span className="font-mono-code text-[10px] text-[var(--pt-outline)]">
                  AST parsing
                </span>
              </div>

              <div className="flex flex-col items-center p-2.5 rounded-lg bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-highest)] border border-[var(--pt-primary-container)]/35 space-y-1">
                <div className="w-8 h-8 rounded-full bg-[var(--pt-primary-container)]/20 flex items-center justify-center text-[var(--pt-secondary)]">
                  <span className="material-symbols-outlined text-[18px]">memory</span>
                </div>
                <span className="font-mono-code text-[11px] font-semibold text-[var(--pt-primary)]">
                  Proof Daemon
                </span>
                <span className="font-mono-code text-[10px] text-[var(--pt-secondary)]">
                  Ed25519 Local
                </span>
              </div>
            </div>

            {/* Output Proof Capsule */}
            <div className="p-3 rounded-lg bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[20px] shrink-0">
                  verified
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono-code text-[11px] font-semibold text-[var(--pt-on-surface)] truncate">
                    Output: Signed Merkle Artifact
                  </span>
                  <span className="font-mono-code text-[11px] text-[var(--pt-outline)] truncate">
                    sha256:7f9c2d1b...e4a8
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[var(--pt-secondary-container)] text-[var(--pt-primary)] dark:text-[var(--pt-secondary-fixed)] font-mono-code text-[10px] shrink-0 font-semibold">
                L2 FINALIZED
              </span>
            </div>

            {/* CLI Terminal Snippet */}
            <div className="rounded-lg bg-[var(--pt-surface)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto min-w-0">
                <span className="text-[var(--pt-secondary)] font-mono-code text-[11px] select-none">
                  $
                </span>
                <code className="font-mono-code text-[11px] text-[var(--pt-primary)] truncate">
                  curl -fsSL https://proof-trail.dev/hook | bash
                </code>
              </div>
              <button
                type="button"
                aria-label="Copy Command"
                onClick={handleCopyCurl}
                className="text-[var(--pt-outline)] hover:text-[var(--pt-primary)] transition-colors shrink-0 ml-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copiedCurl ? 'done' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>

          {/* Primary CTA & Alternative Actions */}
          <div className="flex flex-col space-y-2.5">
            <button
              type="button"
              onClick={onCompleteSync}
              className="w-full h-13 rounded-xl bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-display text-[16px] font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">terminal</span>
              <span>Authorize GitHub &amp; Start Sync</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              type="button"
              onClick={handleCopyCurl}
              className="w-full h-11 rounded-xl bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-on-surface)] font-mono-code text-[12px] font-semibold flex items-center justify-center gap-2 hover:border-[var(--pt-primary-container)] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[var(--pt-outline)] text-[18px]">
                terminal
              </span>
              <span>Configure via CLI Daemon Instead</span>
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onSkip}
                className="font-mono-code text-[11px] text-[var(--pt-outline)] hover:text-[var(--pt-on-surface)] transition-colors py-1 cursor-pointer"
              >
                Skip for now (Manual audit uploads only)
              </button>
            </div>

            <div className="p-2.5 rounded-lg bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] flex items-center justify-center gap-2 text-center">
              <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[16px]">
                security
              </span>
              <span className="font-mono-code text-[11px] text-[var(--pt-outline)]">
                SOC2 Type II &amp; OpenSSF Compliant • Local Ed25519 Keys Never Leave Machine
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Sync Preferences Cards */}
        <div className="lg:col-span-6 flex flex-col space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="font-display text-[18px] text-[var(--pt-primary)] font-bold">
              Sync Preferences
            </span>
            <span className="font-mono-code text-[11px] text-[var(--pt-outline)]">
              Customizable anytime
            </span>
          </div>

          {/* Card 1: Target Repositories */}
          <div className="rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] p-4 space-y-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-[var(--pt-surface-container)] flex items-center justify-center text-[var(--pt-secondary)]">
                  <span className="material-symbols-outlined text-[20px]">account_tree</span>
                </div>
                <div>
                  <h2 className="font-display text-[17px] text-[var(--pt-on-surface)] font-semibold">
                    Target Repositories
                  </h2>
                  <p className="text-[12px] text-[var(--pt-on-surface-variant)]">
                    Selected {selectedRepos.length} of {repositories.length} repositories detected
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[var(--pt-primary-container)]/15 text-[var(--pt-primary)] font-mono-code text-[10px] font-semibold">
                AUTONOMOUS
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[var(--pt-surface-highest)] flex items-center justify-center text-[11px] font-bold text-[var(--pt-primary)]">
                    @
                  </div>
                  <span className="font-mono-code text-[11px] font-semibold text-[var(--pt-primary)]">
                    alexchen
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--pt-surface-high)] text-[var(--pt-on-surface-variant)] text-[10px] font-mono-code">
                    GitHub Org
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenRepoModal}
                  className="font-mono-code text-[11px] text-[var(--pt-secondary)] hover:underline font-semibold cursor-pointer"
                >
                  Manage
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedRepos.length === 0 ? (
                  <span className="text-[11px] font-mono-code text-[var(--pt-outline)]">
                    No repositories selected — click Manage to choose
                  </span>
                ) : (
                  selectedRepos.map((repo) => (
                    <span
                      key={repo.id}
                      className="px-2 py-1 rounded bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-on-surface)] text-[11px] font-mono-code flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)]" />
                      {repo.fullName.replace('alexchen/', '')}
                    </span>
                  ))
                )}
              </div>
            </div>

            <p className="text-[12px] text-[var(--pt-outline)] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Zero code exfiltration — only metadata, AST tree changes, and diff telemetry are
              ingested.
            </p>
          </div>

          {/* Card 2: Heuristic Skill Parsing */}
          <div className="rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] p-4 space-y-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-[var(--pt-surface-container)] flex items-center justify-center text-[var(--pt-secondary)]">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <h2 className="font-display text-[17px] text-[var(--pt-on-surface)] font-semibold">
                    Heuristic Skill Parsing
                  </h2>
                  <p className="text-[12px] text-[var(--pt-on-surface-variant)]">
                    Infers competency from algorithmic complexity
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[var(--pt-secondary-container)] text-[var(--pt-secondary)] font-mono-code text-[10px] font-semibold">
                READY
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--pt-on-surface-variant)]">
                  Extracted Signals for your stack:
                </span>
                <span className="text-[var(--pt-secondary)] font-mono-code font-semibold">
                  +4 verified skills
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { icon: 'bolt', label: 'Rust Systems' },
                  { icon: 'dns', label: 'Distributed Paxos' },
                  { icon: 'sync_alt', label: 'Lock-Free Atomics' },
                  { icon: 'terminal', label: 'eBPF Kernel' },
                ].map((sig) => (
                  <span
                    key={sig.label}
                    className="px-2 py-0.5 rounded bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-on-surface)] text-[11px] font-mono-code flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[12px] text-[var(--pt-secondary)]">
                      {sig.icon}
                    </span>
                    {sig.label}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-[12px] text-[var(--pt-outline)]">
              AST trees and commit frequency dynamically calibrate your verified skill matrix
              levels.
            </p>
          </div>

          {/* Card 3: ZK Privacy & IP Scrim Toggle */}
          <div className="rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] p-4 space-y-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-[var(--pt-surface-container)] flex items-center justify-center text-[var(--pt-secondary)]">
                  <span className="material-symbols-outlined text-[20px]">shield_lock</span>
                </div>
                <div>
                  <h2 className="font-display text-[17px] text-[var(--pt-on-surface)] font-semibold">
                    ZK Privacy &amp; IP Scrim
                  </h2>
                  <p className="text-[12px] text-[var(--pt-on-surface-variant)]">
                    Protects employer IP &amp; proprietary logic
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={zkEnabled}
                onClick={() => {
                  setZkEnabled((v) => !v);
                  onShowToast(`ZK Privacy Scrim ${!zkEnabled ? 'enabled' : 'disabled'}`);
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                  zkEnabled ? 'bg-[var(--pt-secondary)]' : 'bg-[var(--pt-surface-highest)]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    zkEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] text-[12px] text-[var(--pt-on-surface-variant)] leading-relaxed">
              <span className="text-[var(--pt-primary)] font-semibold">
                {zkEnabled ? 'Enabled:' : 'Disabled:'}
              </span>{' '}
              {zkEnabled
                ? 'Source lines are completely stripped before hashing. Only mathematical proofs of syntax tree mutations and structural invariants are stored on the public ledger.'
                : 'Full diff metadata will be hashed without local AST scrimming. Recommended only for open-source repositories.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
