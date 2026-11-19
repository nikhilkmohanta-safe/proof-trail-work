import React, { useEffect, useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ProofItem, StagedExecution } from '../types/prooftrail';
import { ResilientImage } from './ResilientImage';

interface LogWorkViewProps {
  stagedExecutions: StagedExecution[];
  syncedRepoCount: number;
  onPublishProof: (newProof: ProofItem, newStaged: StagedExecution) => void;
  onOpenGitHubSync: () => void;
  onOpenRepoModal: () => void;
  onShowToast: (message: string) => void;
}

const KEYWORD_SKILL_MAP: { pattern: RegExp; skill: string }[] = [
  { pattern: /\b(go|golang|goroutine)\b/i, skill: 'Go' },
  { pattern: /\b(websocket|ws|socket)\b/i, skill: 'WebSockets' },
  { pattern: /\b(concurren|mutex|atomic|worker pool)\b/i, skill: 'Concurrency' },
  { pattern: /\b(50k|throughput|latency|p99|benchmark)\b/i, skill: 'High Throughput' },
  { pattern: /\b(epoll|linux|kernel|ebpf)\b/i, skill: 'Linux epoll' },
  { pattern: /\b(rust|tokio|cargo)\b/i, skill: 'Rust' },
  { pattern: /\b(redis|cache|bloom)\b/i, skill: 'Redis' },
  { pattern: /\b(fpga|verilog|systolic|vivado)\b/i, skill: 'Verilog / FPGA' },
  { pattern: /\b(k8s|kubernetes|docker|container)\b/i, skill: 'Kubernetes' },
  { pattern: /\b(raft|paxos|consensus|quorum)\b/i, skill: 'Distributed Consensus' },
];

export const LogWorkView: React.FC<LogWorkViewProps> = ({
  stagedExecutions,
  syncedRepoCount,
  onPublishProof,
  onOpenGitHubSync,
  onOpenRepoModal,
  onShowToast,
}) => {
  const [epochTs, setEpochTs] = useState<number>(() => Math.floor(Date.now() / 1000));
  const [workText, setWorkText] = useState<string>(
    'Refactored backend websocket gateway to handle 50k concurrent connections using epoll and goroutine worker pools. Reduced p99 latency from 120ms to 18ms.'
  );
  const [commitHash, setCommitHash] = useState<string>('7f4a21e8d901b0f5');
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [addingSkill, setAddingSkill] = useState(false);
  const [newSkillText, setNewSkillText] = useState('');
  const [activeSources, setActiveSources] = useState<Record<string, boolean>>({
    github: true,
    gitlab: false,
    cli: false,
    linear: false,
  });
  const [publishState, setPublishState] = useState<'idle' | 'minting' | 'published'>('idle');
  const [copiedDraftHash, setCopiedDraftHash] = useState(false);
  const [showLogPreview, setShowLogPreview] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setEpochTs(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const detectedSkills = React.useMemo(() => {
    const matched = KEYWORD_SKILL_MAP.filter((k) => k.pattern.test(workText)).map((k) => k.skill);
    const merged = Array.from(new Set([...matched, ...customSkills]));
    return merged.length > 0 ? merged : ['Systems Engineering'];
  }, [workText, customSkills]);

  const draftSha = React.useMemo(() => {
    const clean = commitHash.trim() || '3e8f47c9';
    return `SHA-256: ${clean.slice(0, 8)}...91a2`;
  }, [commitHash]);

  const handleToggleSource = (key: string, label: string) => {
    if (key === 'github') {
      onOpenRepoModal();
      return;
    }
    setActiveSources((prev) => {
      const next = !prev[key];
      onShowToast(`${label} ingestion ${next ? 'enabled' : 'paused'}`);
      return { ...prev, [key]: next };
    });
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = newSkillText.trim().replace(/^#/, '');
    if (!cleaned) return;
    setCustomSkills((prev) => (prev.includes(cleaned) ? prev : [...prev, cleaned]));
    setNewSkillText('');
    setAddingSkill(false);
    onShowToast(`Added skill #${cleaned}`);
  };

  const handleInsertBenchmark = () => {
    setWorkText((prev) =>
      prev.includes('ops/sec')
        ? prev
        : `${prev.trim()} Verified 142k ops/sec sustained throughput at 0.4ms GC overhead.`
    );
    onShowToast('Inserted benchmark telemetry snippet');
  };

  const handleCopyDraftHash = () => {
    navigator.clipboard?.writeText(`0x${commitHash}`).catch(() => {});
    setCopiedDraftHash(true);
    onShowToast('Draft Merkle hash copied to clipboard');
    setTimeout(() => setCopiedDraftHash(false), 1600);
  };

  const handlePublish = () => {
    if (!workText.trim()) {
      onShowToast('Please describe what you built or solved first.');
      return;
    }
    setPublishState('minting');
    setTimeout(() => {
      const shortId = `PT-${(commitHash.slice(0, 7) || '3e8f47c').toLowerCase()}`;
      const newProof: ProofItem = {
        id: `proof-${Date.now()}`,
        category: 'github',
        badgeLabel: 'Verified On-Chain',
        badgeIcon: 'shield_with_heart',
        badgeTone: 'secondary',
        hashId: shortId,
        fullHash: `0x${commitHash}91a2f8c3`,
        timestamp: 'Just now',
        title:
          workText.split('.')[0].slice(0, 96) || 'Logged Technical Execution & Benchmark',
        narrative: workText.trim(),
        commitSha: `sha256:${commitHash.slice(0, 5)}...91a2`,
        metrics: [
          { icon: 'check_circle', label: 'Telemetry Verified', tone: 'secondary' },
          { icon: 'terminal', label: 'Block #1948291', tone: 'primary' },
        ],
        skills: detectedSkills,
        trustScore: '98% Trust Score',
        trustPct: 98,
        sealLabel: 'Ed25519 Signed',
        sealIcon: 'key',
        nodeColor: 'primary',
      };

      const newStaged: StagedExecution = {
        id: `staged-${Date.now()}`,
        badge: detectedSkills[0]?.slice(0, 4).toUpperCase() || 'CORE',
        badgeTone: 'primary',
        title: newProof.title,
        hash: `0x${commitHash.slice(0, 4)}...91a2`,
        timeAgo: 'Just now',
        status: 'Valid',
      };

      setPublishState('published');
      onPublishProof(newProof, newStaged);
      setTimeout(() => setPublishState('idle'), 2200);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      {/* Header Banner Section */}
      <div className="relative overflow-hidden rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-4 sm:p-5 shadow-sm">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[var(--pt-primary-container)]/10 blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-secondary)] font-mono-code text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)] animate-pulse" />
              <span className="font-semibold tracking-wider">AUTONOMOUS EXTRACTION</span>
            </div>
            <h1 className="font-display text-[20px] sm:text-[22px] text-[var(--pt-on-surface)] dark:text-[var(--pt-primary)] font-semibold tracking-tight">
              Capture Daily Technical Execution
            </h1>
            <p className="text-[13px] text-[var(--pt-on-surface-variant)] leading-relaxed max-w-2xl">
              Log builds, commits, hardware labs, or debugging breakthroughs. ProofTrail extracts
              verified telemetry automatically.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end shrink-0 gap-2">
            <div className="text-right">
              <div className="font-mono-code text-[10px] text-[var(--pt-outline)]">EPOCH_TS</div>
              <div className="font-mono-code text-[12px] text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] font-semibold tabular-nums">
                {epochTs}
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenGitHubSync}
              className="px-2.5 py-1 rounded-lg bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-primary)] font-mono-code text-[11px] font-medium hover:border-[var(--pt-primary-container)] transition-colors cursor-pointer"
            >
              Configure GitHub Sync →
            </button>
          </div>
        </div>
      </div>

      {/* Main Responsive Split: Entry Form on Left, Ingestion + Recent Staged on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left/Primary Column: Execution Entry Form */}
        <div className="lg:col-span-7 space-y-4">
          {/* Quick Connect Integrations Bar */}
          <div className="bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-xl p-3 shadow-sm space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono-code text-[10px] uppercase tracking-wider text-[var(--pt-outline)] font-semibold">
                Telemetry Ingestion Sources
              </span>
              <button
                type="button"
                onClick={onOpenGitHubSync}
                className="font-mono-code text-[11px] text-[var(--pt-secondary)] flex items-center gap-1 font-semibold hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">cloud_sync</span>
                Live Synced ({syncedRepoCount} repos)
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
                onClick={() => handleToggleSource('github', 'GitHub')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-highest)] border border-[var(--pt-outline-variant)] text-[var(--pt-on-surface)] dark:text-[var(--pt-primary)] shrink-0 transition-all hover:border-[var(--pt-primary-container)] cursor-pointer"
              >
                <svg className="w-4 h-4 fill-[var(--pt-secondary)]" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="font-mono-code text-[11px] font-medium">
                  GitHub: Active ({syncedRepoCount})
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)]" />
              </button>

              <button
                type="button"
                onClick={() => handleToggleSource('gitlab', 'GitLab')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono-code text-[11px] transition-colors shrink-0 cursor-pointer ${
                  activeSources.gitlab
                    ? 'bg-[var(--pt-surface-container)] border-[var(--pt-primary-container)] text-[var(--pt-on-surface)]'
                    : 'bg-[var(--pt-surface-low)] border-[var(--pt-outline-variant)] text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[var(--pt-tertiary)]">
                  code_blocks
                </span>
                <span>GitLab</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleSource('cli', 'CLI Hook')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono-code text-[11px] transition-colors shrink-0 cursor-pointer ${
                  activeSources.cli
                    ? 'bg-[var(--pt-surface-container)] border-[var(--pt-primary-container)] text-[var(--pt-on-surface)]'
                    : 'bg-[var(--pt-surface-low)] border-[var(--pt-outline-variant)] text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[var(--pt-primary)]">
                  terminal
                </span>
                <span>CLI Hook</span>
                <span className="text-[10px] px-1 rounded bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] text-[var(--pt-outline)]">
                  v2.4
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleSource('linear', 'Linear / Jira')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono-code text-[11px] transition-colors shrink-0 cursor-pointer ${
                  activeSources.linear
                    ? 'bg-[var(--pt-surface-container)] border-[var(--pt-primary-container)] text-[var(--pt-on-surface)]'
                    : 'bg-[var(--pt-surface-low)] border-[var(--pt-outline-variant)] text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[var(--pt-tertiary)]">
                  task_alt
                </span>
                <span>Linear / Jira</span>
              </button>
            </div>
          </div>

          {/* Execution Context Entry Form Card */}
          <div className="bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[20px]">
                  psychology
                </span>
                <h2 className="font-display text-[17px] text-[var(--pt-on-surface)] font-semibold">
                  Execution Context
                </h2>
              </div>
              <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] px-2 py-0.5 rounded bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)]">
                Markdown Enabled
              </span>
            </div>

            {/* Work Log Text Area */}
            <div className="relative">
              <label htmlFor="work-log-input" className="sr-only">
                What did you build or solve today?
              </label>
              <textarea
                id="work-log-input"
                rows={4}
                value={workText}
                onChange={(e) => setWorkText(e.target.value)}
                placeholder="What did you build or solve today? (e.g. Kernel tuning, microservice refactor, embedded circuit debugging...)"
                className="w-full bg-[var(--pt-surface)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] text-[var(--pt-on-surface)] text-[14px] rounded-lg p-3 pr-16 placeholder:text-[var(--pt-outline)] focus:outline-none focus:ring-1 focus:ring-[var(--pt-primary-container)] focus:border-[var(--pt-primary-container)] resize-none transition-all leading-relaxed"
              />
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleInsertBenchmark}
                  title="Insert quick benchmark snippet"
                  className="p-1.5 rounded text-[var(--pt-outline)] hover:text-[var(--pt-primary)] hover:bg-[var(--pt-surface-container)] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">query_stats</span>
                </button>
              </div>
            </div>

            {/* Live AI Skill Extraction Box */}
            <div className="bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[var(--pt-secondary)] text-[16px] animate-spin"
                    style={{ animationDuration: '5s' }}
                  >
                    neurology
                  </span>
                  <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] font-semibold">
                    SKILLS DETECTED
                  </span>
                  <span className="font-mono-code text-[11px] text-[var(--pt-outline)]">
                    ({detectedSkills.length})
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-secondary)] font-mono-code text-[11px]">
                  <span className="material-symbols-outlined text-[12px]">verified</span>
                  <span className="font-medium">98% Confidence</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {detectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-highest)] border border-[var(--pt-outline-variant)] text-[var(--pt-on-surface)] dark:text-[var(--pt-primary)] font-mono-code text-[11px] shadow-sm"
                  >
                    <span className="text-[var(--pt-secondary)] font-bold">#</span>
                    {skill}
                    <span className="material-symbols-outlined text-[13px] text-[var(--pt-secondary)]">
                      check
                    </span>
                  </span>
                ))}
                {addingSkill ? (
                  <form onSubmit={handleAddCustomSkill} className="inline-flex items-center gap-1">
                    <input
                      type="text"
                      value={newSkillText}
                      onChange={(e) => setNewSkillText(e.target.value)}
                      placeholder="Skill..."
                      autoFocus
                      className="w-24 px-2 py-1 rounded bg-[var(--pt-surface-lowest)] border border-[var(--pt-primary-container)] text-[var(--pt-on-surface)] font-mono-code text-[11px] outline-none"
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 rounded bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-mono-code text-[11px] font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAddingSkill(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-on-surface)] font-mono-code text-[11px] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span> Add custom
                  </button>
                )}
              </div>

              <p className="text-[12px] text-[var(--pt-on-surface-variant)] pt-0.5">
                Context inferred from concurrency paradigms and runtime socket handling algorithms.
              </p>
            </div>

            {/* Proof Evidence Attachment Module */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="commit-hash-input"
                  className="font-mono-code text-[10px] uppercase tracking-wider text-[var(--pt-outline)] font-semibold"
                >
                  Cryptographic Evidence Artifacts
                </label>
                <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] font-medium">
                  Immutable Link
                </span>
              </div>

              <div className="flex items-center rounded-lg bg-[var(--pt-surface)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] px-3 py-2 space-x-2">
                <span className="material-symbols-outlined text-[var(--pt-outline)] text-[18px]">
                  terminal
                </span>
                <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] shrink-0">
                  git rev-parse HEAD:
                </span>
                <input
                  id="commit-hash-input"
                  type="text"
                  value={commitHash}
                  onChange={(e) => setCommitHash(e.target.value)}
                  className="bg-transparent text-[var(--pt-on-surface)] dark:text-[var(--pt-primary)] font-mono-code text-[11px] flex-1 min-w-0 focus:outline-none tracking-wider font-semibold"
                />
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-secondary)] font-mono-code text-[11px] shrink-0 font-medium">
                  <span className="material-symbols-outlined text-[12px] mr-1">done_all</span>
                  Attached
                </span>
              </div>

              {/* Attachment Media Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowLogPreview((prev) => !prev)}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] hover:bg-[var(--pt-surface-container)] transition-colors cursor-pointer group text-left"
                >
                  <div className="w-8 h-8 rounded bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[var(--pt-tertiary)] text-[18px]">
                      description
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono-code text-[11px] text-[var(--pt-on-surface)] truncate font-medium">
                      benchmark_p99.log
                    </p>
                    <p className="font-mono-code text-[10px] text-[var(--pt-outline)]">
                      18.4 KB • SHA verified
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[var(--pt-outline)] group-hover:text-[var(--pt-primary)] text-[16px]">
                    visibility
                  </span>
                </button>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] overflow-hidden">
                  <ResilientImage
                    src={ASSETS.latencyDropThumb}
                    alt="Latency drop Grafana telemetry profile from 120ms to 18ms"
                    className="w-10 h-10 rounded object-cover shrink-0 border border-[var(--pt-outline-variant)]"
                    fallbackIcon="query_stats"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono-code text-[11px] text-[var(--pt-on-surface)] truncate font-medium">
                      latency_drop.png
                    </p>
                    <p className="font-mono-code text-[10px] text-[var(--pt-secondary)] truncate font-medium">
                      Grafana profile
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[16px] mr-1">
                    check_circle
                  </span>
                </div>
              </div>

              {showLogPreview && (
                <div className="rounded-lg bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] p-3 font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] space-y-1">
                  <div className="text-[var(--pt-secondary)]">
                    [wrk2] 50,000 connections @ 10 threads — epoll eventloop
                  </div>
                  <div>Latency p50: 4.12ms | p95: 11.80ms | p99: 18.04ms (prev: 120.4ms)</div>
                  <div className="text-[var(--pt-primary)]">
                    SHA256: 9a4f881e2c11800b4f2819...verified
                  </div>
                </div>
              )}
            </div>

            {/* Cryptographic Proof Manifest Draft */}
            <div className="rounded-xl bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[10px] text-[var(--pt-outline)] uppercase tracking-wider font-semibold">
                  Proof Manifest (Draft)
                </span>
                <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)] animate-ping" />
                  L2-Pipelined
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] font-mono-code text-[11px] flex items-center gap-1.5 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">fingerprint</span>
                    <span>{draftSha}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyDraftHash}
                    title="Copy Raw Hash"
                    className="p-1 rounded text-[var(--pt-outline)] hover:text-[var(--pt-on-surface)] hover:bg-[var(--pt-surface-high)] transition-colors cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        copiedDraftHash ? 'text-[var(--pt-secondary)]' : ''
                      }`}
                    >
                      {copiedDraftHash ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-[var(--pt-on-surface-variant)] font-mono-code text-[11px]">
                  <span className="material-symbols-outlined text-[14px] text-[var(--pt-outline)]">
                    schedule
                  </span>
                  <span>
                    Locking: <strong className="text-[var(--pt-on-surface)]">Block #1948291</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Publish Action Button */}
            <button
              type="button"
              disabled={publishState === 'minting'}
              onClick={handlePublish}
              className="w-full py-3.5 px-4 rounded-xl bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-display text-[16px] font-bold shadow-md hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {publishState === 'minting' ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                  <span>Minting Merkle Anchor...</span>
                </>
              ) : publishState === 'published' ? (
                <>
                  <span className="material-symbols-outlined text-[20px]">task_alt</span>
                  <span>Proof Published to Timeline!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  <span>Generate Proof ID &amp; Publish to Portfolio</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Recent Staged Executions & Zero-Friction GitHub Sync Callout */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[18px]">
                  history
                </span>
                <h3 className="font-display text-[17px] text-[var(--pt-on-surface)] font-semibold">
                  Recent Staged Executions
                </h3>
              </div>
              <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                Today ({stagedExecutions.length} logged)
              </span>
            </div>

            <div className="space-y-2">
              {stagedExecutions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] hover:bg-[var(--pt-surface-container)] transition-colors gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] flex items-center justify-center font-mono-code text-[11px] font-bold shrink-0 ${
                        item.badgeTone === 'primary'
                          ? 'text-[var(--pt-secondary)]'
                          : 'text-[var(--pt-tertiary)]'
                      }`}
                    >
                      {item.badge}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] text-[var(--pt-on-surface)] font-medium truncate">
                        {item.title}
                      </p>
                      <p className="font-mono-code text-[11px] text-[var(--pt-outline)] truncate">
                        Hash:{' '}
                        <span className="text-[var(--pt-on-surface-variant)]">{item.hash}</span> •{' '}
                        {item.timeAgo}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-highest)] border border-[var(--pt-outline-variant)] text-[var(--pt-secondary)] font-mono-code text-[11px] flex items-center gap-1 shrink-0 font-medium">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Autonomous Ingestion CTA Card */}
          <div className="bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-[16px] font-semibold text-[var(--pt-on-surface)]">
                Autonomous GitHub Sync
              </span>
              <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] font-semibold">
                Step 2 of 3
              </span>
            </div>
            <p className="text-[12px] text-[var(--pt-on-surface-variant)] leading-relaxed">
              Automatically convert git pushes, pull requests, and benchmark runs into ZK-scrimmed
              proof-of-work entries without manual logging.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenGitHubSync}
                className="flex-1 py-2 px-3 rounded-lg bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] hover:border-[var(--pt-primary-container)] text-[var(--pt-primary)] font-mono-code text-[11px] font-semibold cursor-pointer"
              >
                Open Sync Pipeline
              </button>
              <button
                type="button"
                onClick={onOpenRepoModal}
                className="py-2 px-3 rounded-lg bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] hover:border-[var(--pt-primary-container)] text-[var(--pt-on-surface)] font-mono-code text-[11px] cursor-pointer"
              >
                Select Repos ({syncedRepoCount})
              </button>
            </div>
          </div>

          {/* Zero Documentation Stress Banner */}
          <div className="rounded-xl bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--pt-primary-container)]/15 border border-[var(--pt-primary-container)]/25 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[22px]">
                auto_awesome
              </span>
            </div>
            <p className="text-[12px] text-[var(--pt-on-surface)] leading-snug">
              <strong className="text-[var(--pt-primary)] font-semibold">
                Zero documentation stress.
              </strong>{' '}
              Your proof portfolio builds autonomously while you remain heads-down in flow state.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
