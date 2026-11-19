import React, { useState } from 'react';
import {
  ASSETS,
  AUDIT_MILESTONES,
  AUDIT_VALIDATION_MAP,
} from '../data/mockData';
import { AuditValidationRecord } from '../types/prooftrail';
import { ResilientImage } from './ResilientImage';

interface AuditViewProps {
  onShowToast: (message: string) => void;
}

export const AuditView: React.FC<AuditViewProps> = ({ onShowToast }) => {
  const [proofInput, setProofInput] = useState('proof_0x8f2a67e2b109_consensus_opt');
  const [validationResult, setValidationResult] = useState<AuditValidationRecord>(
    AUDIT_VALIDATION_MAP.proof_0x8f2a67e2b109_consensus_opt
  );
  const [highlightMatch, setHighlightMatch] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [interviewEmail, setInterviewEmail] = useState('');

  const handleInspect = () => {
    const trimmed = proofInput.trim();
    if (!trimmed) {
      onShowToast('Please insert a valid Proof ID hash.');
      return;
    }

    const found = AUDIT_VALIDATION_MAP[trimmed] ?? {
      proofId: trimmed,
      status: 'Ledger Proof Match: Valid',
      latency: '21ms',
      artifact: 'paxos-kv/merkle_anchor.go',
      impact: 'Verified Deterministic Execution Trace',
      authority: 'ed25519-sha512',
      signature: `sig:0x${trimmed.replace(/[^a-f0-9]/gi, '').padEnd(48, '8f2a').slice(0, 48)}`,
    };

    setValidationResult(found);
    setHighlightMatch(true);
    setTimeout(() => setHighlightMatch(false), 700);
    onShowToast('Cryptographic receipt verified on L2 block state.');
  };

  const handleSampleClick = (hash: string) => {
    setProofInput(hash);
    const match = AUDIT_VALIDATION_MAP[hash];
    if (match) setValidationResult(match);
    onShowToast(`Loaded test hash: ${hash}`);
  };

  const handleDownloadAuditReport = () => {
    const report = {
      candidate: 'Alex Chen',
      role: 'Staff Systems & Distributed Systems Engineer',
      zkAttestation: '0x9f2a...88c4',
      blockHeight: 19842912,
      verifiedLoc: 48210,
      signedCommits: 342,
      peerAttestations: '4 / 4 L7+ Staff Leads',
      milestones: AUDIT_MILESTONES.map((m) => ({
        code: m.code,
        title: m.title,
        description: m.description,
      })),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alex-chen-audit-report.json';
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Downloaded signed Audit Report (JSON)');
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      {/* Top Grid: Candidate Passport Header + Instant Proof Validator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Candidate Passport Audit Header */}
        <section className="lg:col-span-5 bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex w-2 h-2 rounded-full bg-[var(--pt-secondary)] animate-ping" />
                <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] uppercase tracking-widest font-semibold">
                  Evaluator Audit Mode
                </span>
              </div>
              <h1 className="font-display text-[26px] leading-[32px] text-[var(--pt-primary)] font-bold tracking-tight">
                Alex Chen
              </h1>
              <p className="text-[14px] text-[var(--pt-on-surface-variant)]">
                Staff Systems &amp; Distributed Systems Engineer
              </p>
            </div>
            <div className="bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] p-2.5 rounded-lg flex items-center justify-center text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)]">
              <span className="material-symbols-outlined material-symbols-filled text-[28px]">
                shield_with_heart
              </span>
            </div>
          </div>

          {/* Trust Verification Micro-Badge */}
          <div className="bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] rounded-lg p-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[20px] shrink-0">
                verified_user
              </span>
              <div className="min-w-0">
                <div className="font-mono-code text-[12px] text-[var(--pt-secondary)] font-semibold truncate">
                  Cryptographically Verified Portfolio
                </div>
                <div className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] truncate">
                  ZK-Attestation: 0x9f2a...88c4 · Block #19,842,912
                </div>
              </div>
            </div>
            <span className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-[var(--pt-secondary-container)] text-[var(--pt-secondary)] font-semibold shrink-0">
              100% Signal
            </span>
          </div>

          {/* Shareable Passport Link Widget */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] px-3 py-2 rounded-lg flex items-center justify-between min-w-0">
              <span className="font-mono-code text-[12px] text-[var(--pt-on-surface)] truncate select-all">
                proof-trail.dev/verify/alex-chen.id
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard
                    ?.writeText('https://proof-trail.dev/verify/alex-chen.id')
                    .catch(() => {});
                  onShowToast('Public candidate audit passport copied!');
                }}
                className="ml-2 text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] hover:opacity-80 flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                <span className="font-mono-code text-[11px] font-medium">Copy Link</span>
              </button>
            </div>
            <button
              type="button"
              aria-label="Show Passport QR Code"
              onClick={() => setShowQrModal(true)}
              className="bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] hover:border-[var(--pt-primary-container)] text-[var(--pt-on-surface)] p-2 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
            </button>
          </div>

          {/* Evaluator Quick Operations */}
          <div className="space-y-2 pt-1">
            <div className="font-mono-code text-[10px] text-[var(--pt-on-surface-variant)] uppercase tracking-wider">
              Evaluator Operations
            </div>
            <button
              type="button"
              onClick={() =>
                onShowToast('Verified Mainnet-L2 Merkle root on Arbitrum RPC node.')
              }
              className="w-full bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] hover:opacity-95 active:scale-[0.99] transition-all py-2.5 px-4 rounded-lg font-display text-[15px] font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              <span>Verify Hash on Public Ledger</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDownloadAuditReport}
                className="bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] hover:border-[var(--pt-primary-container)] text-[var(--pt-on-surface)] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] text-[17px]">
                  download
                </span>
                <span className="font-mono-code text-[11px] font-medium">Audit Report</span>
              </button>
              <button
                type="button"
                onClick={() => setShowScheduleModal(true)}
                className="bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] hover:border-[var(--pt-secondary)] text-[var(--pt-on-surface)] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[17px]">
                  calendar_today
                </span>
                <span className="font-mono-code text-[11px] font-medium">Fast-Track</span>
              </button>
            </div>
          </div>
        </section>

        {/* Instant Proof Validator + Execution vs Resume Claims */}
        <div className="lg:col-span-7 space-y-5">
          {/* Instant Proof Validator */}
          <section className="bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] text-[20px]">
                  troubleshoot
                </span>
                <h2 className="font-display text-[18px] text-[var(--pt-primary)] font-semibold">
                  Instant Proof Validator
                </h2>
              </div>
              <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                Live Zero-Knowledge Check
              </span>
            </div>

            <p className="text-[12px] text-[var(--pt-on-surface-variant)]">
              Validate individual commits or project milestones directly. No inflated resumes,
              self-reported metrics, or phantom accomplishments.
            </p>

            {/* Hash Input Field */}
            <div className="space-y-2">
              <div className="flex items-center bg-[var(--pt-surface)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] rounded-lg p-1.5 gap-1">
                <span className="material-symbols-outlined text-[var(--pt-on-surface-variant)] text-[18px] ml-2">
                  tag
                </span>
                <input
                  type="text"
                  value={proofInput}
                  onChange={(e) => setProofInput(e.target.value)}
                  placeholder="Paste candidate Proof ID (e.g. proof_0x...)"
                  className="w-full bg-transparent px-2 py-1 font-mono-code text-[12px] text-[var(--pt-primary)] focus:outline-none placeholder:text-[var(--pt-outline)]"
                />
                <button
                  type="button"
                  onClick={handleInspect}
                  className="bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] hover:opacity-90 active:scale-95 font-mono-code text-[12px] font-semibold px-4 py-1.5 rounded transition-all shrink-0 cursor-pointer"
                >
                  Inspect
                </button>
              </div>
              <div className="flex justify-between items-center text-[var(--pt-on-surface-variant)] font-mono-code text-[11px] px-1 flex-wrap gap-2">
                <span>
                  Sample:{' '}
                  <button
                    type="button"
                    onClick={() => handleSampleClick('proof_0x8f2a67e2b109_consensus_opt')}
                    className="underline text-[var(--pt-primary)] hover:opacity-80 cursor-pointer"
                  >
                    consensus_opt
                  </button>
                  ,{' '}
                  <button
                    type="button"
                    onClick={() => handleSampleClick('proof_0x4c99d211a7e4_raft_snapshot')}
                    className="underline text-[var(--pt-primary)] hover:opacity-80 cursor-pointer"
                  >
                    raft_snapshot
                  </button>
                </span>
                <span className="text-[var(--pt-secondary)] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)]" />
                  Ledger Online
                </span>
              </div>
            </div>

            {/* Proof Evidence Dynamic Box */}
            <div
              className={`bg-[var(--pt-surface-low)] border rounded-lg p-3 space-y-2.5 transition-all ${
                highlightMatch
                  ? 'border-[var(--pt-primary-container)] ring-1 ring-[var(--pt-primary-container)]'
                  : 'border-[var(--pt-outline-variant)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[18px]">
                    verified
                  </span>
                  <span className="font-mono-code text-[12px] text-[var(--pt-on-surface)] font-semibold">
                    {validationResult.status}
                  </span>
                </div>
                <span className="font-mono-code text-[11px] text-[var(--pt-secondary)]">
                  Latency: {validationResult.latency}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] p-2.5 rounded">
                  <div className="font-mono-code text-[10px] text-[var(--pt-on-surface-variant)]">
                    Validated Artifact
                  </div>
                  <div className="font-mono-code text-[12px] text-[var(--pt-primary)] font-medium truncate">
                    {validationResult.artifact}
                  </div>
                </div>
                <div className="bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] p-2.5 rounded">
                  <div className="font-mono-code text-[10px] text-[var(--pt-on-surface-variant)]">
                    Attested Impact
                  </div>
                  <div className="font-mono-code text-[12px] text-[var(--pt-secondary)] font-medium truncate">
                    {validationResult.impact}
                  </div>
                </div>
              </div>

              <div className="bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] p-2.5 rounded space-y-1">
                <div className="flex justify-between items-center text-[11px] font-mono-code text-[var(--pt-on-surface-variant)]">
                  <span>Cryptographic Signature Authority</span>
                  <span className="text-[var(--pt-primary)]">{validationResult.authority}</span>
                </div>
                <div className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] truncate">
                  {validationResult.signature}
                </div>
              </div>
            </div>
          </section>

          {/* Execution vs Resume Claims */}
          <section className="bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] text-[20px]">
                  analytics
                </span>
                <h2 className="font-display text-[18px] text-[var(--pt-primary)] font-semibold">
                  Execution vs Resume Claims
                </h2>
              </div>
              <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] bg-[var(--pt-secondary-container)] px-2 py-0.5 rounded font-medium">
                High Authenticity
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] p-3 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                    Immutable Code Volume
                  </div>
                  <div className="font-display text-[24px] text-[var(--pt-primary)] font-bold mt-1 tabular-nums">
                    48,210
                  </div>
                  <div className="font-mono-code text-[11px] text-[var(--pt-secondary)]">
                    Verified Lines of Code
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--pt-outline-variant)] flex items-center justify-between text-[var(--pt-on-surface-variant)] font-mono-code text-[11px]">
                  <span>Signed Commits</span>
                  <span className="text-[var(--pt-on-surface)] font-semibold">342 commits</span>
                </div>
              </div>

              <div className="bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] p-3 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                    Peer Consensus
                  </div>
                  <div className="font-display text-[24px] text-[var(--pt-secondary)] font-bold mt-1 tabular-nums">
                    4 / 4
                  </div>
                  <div className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                    L7+ Staff Attestations
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--pt-outline-variant)] flex items-center justify-between text-[var(--pt-on-surface-variant)] font-mono-code text-[11px]">
                  <span>Reputation Confidence</span>
                  <span className="text-[var(--pt-secondary)] font-semibold">99.8%</span>
                </div>
              </div>
            </div>

            {/* Verified Peer Attestation Avatars */}
            <div className="bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                  Signed Attestations from Verified Leads
                </span>
                <span className="font-mono-code text-[11px] text-[var(--pt-primary)] font-semibold">
                  4 Cryptographic Seals
                </span>
              </div>
              <div className="flex items-center gap-3 pt-0.5">
                <div className="flex -space-x-2 shrink-0">
                  {[
                    { src: ASSETS.peerAvatar1, alt: 'Principal engineer attestation' },
                    { src: ASSETS.peerAvatar2, alt: 'Senior infrastructure architect attestation' },
                    { src: ASSETS.peerAvatar3, alt: 'Staff systems engineer attestation' },
                    { src: ASSETS.peerAvatar4, alt: 'Distributed algorithms researcher attestation' },
                  ].map((av, idx) => (
                    <ResilientImage
                      key={idx}
                      src={av.src}
                      alt={av.alt}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-[var(--pt-surface)]"
                      fallbackIcon="person"
                    />
                  ))}
                </div>
                <div className="min-w-0">
                  <div className="font-mono-code text-[11px] text-[var(--pt-on-surface)] truncate">
                    Vouched by Staff Leads at CloudCorp, HashStream &amp; DecryptEngine
                  </div>
                  <div className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)] truncate">
                    Zero collusion risk · Multi-sig verified
                  </div>
                </div>
              </div>
            </div>

            {/* Audited Architecture Blueprint */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                  Audited Architecture Blueprint
                </span>
                <span className="font-mono-code text-[11px] text-[var(--pt-primary)]">
                  SHA-256 Validated
                </span>
              </div>
              <div className="relative w-full h-40 rounded-lg overflow-hidden border border-[var(--pt-outline-variant)] bg-[var(--pt-surface-lowest)]">
                <ResilientImage
                  src={ASSETS.archBlueprint}
                  alt="Audited distributed systems architecture blueprint"
                  className="w-full h-full object-cover opacity-85"
                  fallbackIcon="hub"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-3 justify-between">
                  <div>
                    <span className="font-mono-code text-[12px] text-[#00f5d4] font-semibold">
                      paxos-kv-cluster-v2.1
                    </span>
                    <p className="font-mono-code text-[11px] text-slate-200">
                      Distributed WAL &amp; Zero-Loss Gossip Protocol
                    </p>
                  </div>
                  <span className="bg-black/75 text-[#4edea3] font-mono-code text-[11px] px-2 py-0.5 rounded border border-white/10">
                    Prod Tested
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Proof Audit Trail List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[20px]">
              history_edu
            </span>
            <h2 className="font-display text-[18px] text-[var(--pt-primary)] font-semibold">
              Proof Audit Trail
            </h2>
          </div>
          <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
            4 Milestones Verified
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          {AUDIT_MILESTONES.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-xl p-4 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[var(--pt-primary-container)]/15 text-[var(--pt-primary)] font-mono-code text-[11px] font-semibold">
                      {milestone.code}
                    </span>
                    <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                      {milestone.timeAgo}
                    </span>
                  </div>
                  <h3 className="font-display text-[17px] text-[var(--pt-on-surface)] font-semibold leading-snug">
                    {milestone.title}
                  </h3>
                </div>
                <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[20px]">
                  {milestone.icon}
                </span>
              </div>

              <p className="text-[12px] text-[var(--pt-on-surface-variant)] leading-relaxed">
                {milestone.description}
              </p>

              {milestone.diffChips && (
                <div className="flex items-center gap-1.5 flex-wrap font-mono-code text-[11px]">
                  {milestone.diffChips.map((chip) => (
                    <span
                      key={chip.label}
                      className={`px-2 py-0.5 rounded bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] ${
                        chip.tone === 'error'
                          ? 'text-[var(--pt-error)]'
                          : chip.tone === 'secondary'
                          ? 'text-[var(--pt-secondary)]'
                          : 'text-[var(--pt-primary)]'
                      }`}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>
              )}

              {milestone.gitDiff && (
                <details className="group bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] rounded-lg overflow-hidden">
                  <summary className="list-none p-2.5 flex items-center justify-between cursor-pointer hover:bg-[var(--pt-surface-container)] transition-colors">
                    <div className="flex items-center gap-2 text-[var(--pt-primary)] font-mono-code text-[11px] font-medium">
                      <span className="material-symbols-outlined text-[16px]">code</span>
                      <span>Inspect Cryptographic Git Diff &amp; Raw Benchmarks</span>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-[var(--pt-on-surface-variant)] group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <div className="p-3 bg-[var(--pt-surface-lowest)] border-t border-[var(--pt-outline-variant)] font-mono-code text-[11px] space-y-2">
                    <div className="text-[var(--pt-on-surface-variant)] break-all">
                      Commit:{' '}
                      <span className="text-[var(--pt-primary)] font-semibold">
                        {milestone.gitDiff.commit}
                      </span>{' '}
                      (Signed GPG: {milestone.gitDiff.gpg})
                    </div>
                    <div className="bg-[var(--pt-surface-container)] p-2.5 rounded space-y-1 overflow-x-auto text-[11px] leading-relaxed">
                      {milestone.gitDiff.removedLines.map((line, i) => (
                        <div key={i} className="text-[var(--pt-error)] whitespace-pre">
                          {line}
                        </div>
                      ))}
                      {milestone.gitDiff.addedLines.map((line, i) => (
                        <div key={i} className="text-[var(--pt-secondary)] whitespace-pre">
                          {line}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[var(--pt-on-surface-variant)] text-[11px] pt-1 flex-wrap gap-2">
                      <span>
                        Verified Coverage:{' '}
                        <strong className="text-[var(--pt-primary)]">
                          {milestone.gitDiff.coverage}
                        </strong>
                      </span>
                      <span>
                        Chaos Tests:{' '}
                        <strong className="text-[var(--pt-secondary)]">
                          {milestone.gitDiff.chaosTests}
                        </strong>
                      </span>
                    </div>
                  </div>
                </details>
              )}

              {milestone.metricPair && (
                <div className="flex items-center justify-between bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] p-2.5 rounded-lg font-mono-code text-[11px] gap-2">
                  <div>
                    <div className="text-[var(--pt-on-surface-variant)] text-[10px]">
                      {milestone.metricPair.leftLabel}
                    </div>
                    <div className="text-[var(--pt-secondary)] font-semibold">
                      {milestone.metricPair.leftValue}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[var(--pt-on-surface-variant)] text-[10px]">
                      {milestone.metricPair.rightLabel}
                    </div>
                    <div className="text-[var(--pt-primary)]">{milestone.metricPair.rightValue}</div>
                  </div>
                </div>
              )}

              {milestone.paperMeta && (
                <div className="flex items-center justify-between text-[var(--pt-on-surface-variant)] font-mono-code text-[11px] pt-1 border-t border-[var(--pt-outline-variant)]">
                  <span className="flex items-center gap-1 text-[var(--pt-primary)]">
                    <span className="material-symbols-outlined text-[15px]">menu_book</span>
                    <span>{milestone.paperMeta.specLabel}</span>
                  </span>
                  <span>{milestone.paperMeta.arxiv}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* QR Code Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="w-full max-w-xs rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-5 shadow-2xl space-y-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[16px] font-bold text-[var(--pt-on-surface)]">
                Passport QR Seal
              </span>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-7 h-7 rounded-full bg-[var(--pt-surface-high)] flex items-center justify-center text-[var(--pt-on-surface-variant)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="mx-auto w-40 h-40 rounded-xl bg-white p-3 flex items-center justify-center border border-[var(--pt-outline-variant)]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#10131a]" fill="currentColor">
                <rect x="6" y="6" width="26" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="14" y="14" width="10" height="10" />
                <rect x="68" y="6" width="26" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="76" y="14" width="10" height="10" />
                <rect x="6" y="68" width="26" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="14" y="76" width="10" height="10" />
                <rect x="42" y="10" width="8" height="8" />
                <rect x="54" y="18" width="8" height="8" />
                <rect x="40" y="34" width="14" height="14" rx="2" />
                <rect x="60" y="42" width="10" height="10" />
                <rect x="14" y="44" width="12" height="8" />
                <rect x="44" y="58" width="12" height="12" />
                <rect x="66" y="64" width="10" height="10" />
                <rect x="80" y="76" width="14" height="14" />
                <rect x="44" y="80" width="14" height="10" />
              </svg>
            </div>
            <p className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
              proof-trail.dev/verify/alex-chen.id
            </p>
          </div>
        </div>
      )}

      {/* Fast-Track Interview Modal */}
      {showScheduleModal && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowScheduleModal(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowScheduleModal(false);
              setInterviewEmail('');
              onShowToast('Fast-track technical interview invite dispatched!');
            }}
            className="w-full max-w-sm rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[17px] font-bold text-[var(--pt-on-surface)]">
                Schedule Fast-Track Review
              </h3>
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="w-7 h-7 rounded-full bg-[var(--pt-surface-high)] flex items-center justify-center text-[var(--pt-on-surface-variant)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <p className="text-[12px] text-[var(--pt-on-surface-variant)]">
              Bypass initial screening rounds for pre-vetted candidate Alex Chen (ZK Passport
              verified).
            </p>
            <input
              type="email"
              required
              value={interviewEmail}
              onChange={(e) => setInterviewEmail(e.target.value)}
              placeholder="evaluator@company.com"
              className="w-full bg-[var(--pt-surface)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] rounded-lg px-3 py-2 text-[13px] text-[var(--pt-on-surface)] outline-none focus:border-[var(--pt-primary-container)]"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-mono-code text-[12px] font-semibold cursor-pointer"
            >
              Send Pre-Vetted Invite
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
