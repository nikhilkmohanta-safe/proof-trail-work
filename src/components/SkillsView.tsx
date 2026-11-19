import React, { useState } from 'react';
import { DOMAIN_RECORDS, EXECUTION_TAGS } from '../data/mockData';
import { ResilientImage } from './ResilientImage';

interface SkillsViewProps {
  onShowToast: (message: string) => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({ onShowToast }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const handleCopyProof = (id: string, hash: string) => {
    navigator.clipboard?.writeText(hash).catch(() => {});
    setCopiedId(id);
    onShowToast(`Artifact Hash [${hash}] Copied & Verified`);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleExportPassport = () => {
    const payload = {
      candidate: 'Alex Chen',
      network: 'Mainnet-L2',
      merkleRoot: '0x9f38e',
      totalVerifiedHours: 315.0,
      validatedProofs: 47,
      domains: DOMAIN_RECORDS.map((d) => ({
        title: d.title,
        level: d.levelLabel,
        threshold: `${d.progressPct}%`,
      })),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alex-chen-skill-passport.json';
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Compiled & exported Signed Skill Passport (L2 Validated)');
  };

  const handleGenerateRecruiterKey = () => {
    const token = `pkey_${Math.random().toString(16).slice(2, 8)}`;
    setGeneratedKey(token);
    navigator.clipboard?.writeText(token).catch(() => {});
    onShowToast(`Generated Ephemeral Recruiter Token: ${token}`);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header Section with Live Telemetry */}
      <section className="flex flex-col space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--pt-secondary)] animate-pulse" />
            <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] uppercase tracking-wider font-semibold">
              Telemetry Engine v4.2
            </span>
          </div>
          <div className="flex items-center gap-1 text-[var(--pt-on-surface-variant)] font-mono-code text-[11px]">
            <span className="material-symbols-outlined text-[15px] text-[var(--pt-secondary)]">
              encrypted
            </span>
            <span>SHA-256 Validated</span>
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="font-display text-[26px] sm:text-[30px] leading-[34px] text-[var(--pt-primary)] tracking-tight font-bold">
            AI-Extracted Competency Matrix
          </h1>
          <p className="text-[14px] text-[var(--pt-on-surface-variant)]">
            Real execution over self-reported resume bullet points.
          </p>
        </div>
      </section>

      {/* Main Split: Radar Visualizer + Authenticity/Tags on Left/Right for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Execution Vector Radar + Authenticity Differential + Tags + CTAs */}
        <div className="lg:col-span-5 space-y-5">
          {/* Interactive Radar / Skill Breakdown Visualizer */}
          <section className="bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] text-[20px]">
                  hub
                </span>
                <span className="font-display text-[17px] font-semibold text-[var(--pt-on-surface)]">
                  Execution Vector Radar
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-[var(--pt-primary)] bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-highest)] border border-[var(--pt-outline-variant)] px-2.5 py-0.5 rounded-full">
                4 Domain Nodes
              </span>
            </div>

            {/* Hexagonal Matrix Visualization SVG */}
            <div className="relative flex items-center justify-center py-3 overflow-hidden bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] rounded-xl">
              <svg
                className="w-64 h-56"
                fill="none"
                viewBox="0 0 240 210"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  fill="none"
                  points="120,20 205,70 205,160 120,205 35,160 35,70"
                  stroke="var(--pt-radar-grid)"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <polygon
                  fill="none"
                  points="120,45 180,82 180,147 120,180 60,147 60,82"
                  stroke="var(--pt-radar-grid)"
                  strokeDasharray="2 2"
                  strokeWidth="1"
                />
                <polygon
                  fill="var(--pt-radar-grid)"
                  fillOpacity="0.25"
                  points="120,70 155,94 155,134 120,155 85,134 85,94"
                  stroke="var(--pt-radar-grid)"
                  strokeWidth="1"
                />
                <line
                  stroke="var(--pt-radar-grid)"
                  strokeDasharray="2 2"
                  strokeWidth="1"
                  x1="120"
                  x2="120"
                  y1="20"
                  y2="205"
                />
                <line
                  stroke="var(--pt-radar-grid)"
                  strokeDasharray="2 2"
                  strokeWidth="1"
                  x1="35"
                  x2="205"
                  y1="70"
                  y2="160"
                />
                <line
                  stroke="var(--pt-radar-grid)"
                  strokeDasharray="2 2"
                  strokeWidth="1"
                  x1="35"
                  x2="205"
                  y1="160"
                  y2="70"
                />
                <polygon
                  fill="var(--pt-radar-fill)"
                  points="120,28 198,78 174,152 120,172 45,150 48,76"
                  stroke="var(--pt-radar-stroke)"
                  strokeWidth="2"
                />
                <circle className="animate-pulse" cx="120" cy="28" fill="var(--pt-radar-stroke)" r="4.5" />
                <circle cx="198" cy="78" fill="var(--pt-secondary)" r="4" />
                <circle cx="174" cy="152" fill="var(--pt-secondary)" r="3.5" />
                <circle cx="48" cy="76" fill="var(--pt-radar-stroke)" r="3.5" />
                <circle cx="45" cy="150" fill="var(--pt-tertiary)" r="3.5" />
                <circle
                  cx="120"
                  cy="112"
                  fill="var(--pt-surface)"
                  r="7"
                  stroke="var(--pt-radar-stroke)"
                  strokeWidth="2"
                />
                <circle cx="120" cy="112" fill="var(--pt-secondary)" r="2.5" />
              </svg>

              <div className="absolute bottom-2 left-3 flex items-center gap-1 font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                <span className="text-[var(--pt-secondary)] font-bold">98.4%</span>
                <span>Mesh Fidelity</span>
              </div>
              <div className="absolute top-2 right-3 flex items-center gap-1 font-mono-code text-[11px] text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)]">
                <span className="material-symbols-outlined text-[13px]">fingerprint</span>
                <span>ROOT: 0x9f38e</span>
              </div>
            </div>

            {/* Quick Telemetry Counters */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-lg p-3">
                <div className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                  Total Verified Time
                </div>
                <div className="font-display text-[18px] text-[var(--pt-primary)] font-bold tracking-tight tabular-nums">
                  315.0 hrs
                </div>
              </div>
              <div className="bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-lg p-3">
                <div className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                  Validated Proofs
                </div>
                <div className="font-display text-[18px] text-[var(--pt-secondary)] font-bold tracking-tight tabular-nums">
                  47 Hashes
                </div>
              </div>
            </div>
          </section>

          {/* Verification Authenticity Breakdown Banner */}
          <section className="bg-[var(--pt-surface-lowest)] border border-[var(--pt-outline-variant)] rounded-xl p-4 sm:p-5 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] text-[20px]">
                fact_check
              </span>
              <h3 className="font-display text-[18px] text-[var(--pt-primary)] font-bold">
                Authenticity Differential
              </h3>
            </div>
            <div className="space-y-2.5">
              <div className="bg-[var(--pt-error-container)]/50 dark:bg-[var(--pt-surface-high)]/60 border border-[var(--pt-error)]/25 rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--pt-error)]">
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                  <span className="font-mono-code text-[13px] font-semibold">Traditional Resume</span>
                </div>
                <p className="text-[12px] text-[var(--pt-on-surface-variant)] pl-6">
                  Unverified claims. Anyone types &quot;Expert in Python / Microservices&quot; with
                  zero forensic validation or verifiable artifact trail.
                </p>
              </div>
              <div className="bg-[var(--pt-secondary-container)]/50 dark:bg-[var(--pt-surface-container)] border border-[var(--pt-secondary)]/25 rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--pt-secondary)]">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span className="font-mono-code text-[13px] font-semibold">ProofTrail Protocol</span>
                </div>
                <p className="text-[12px] text-[var(--pt-on-surface)] dark:text-[var(--pt-primary)] pl-6">
                  100% Cryptographically Backed by Real Git Commits, Container Runtime Telemetry, &amp;
                  Signed Lab Artifacts.
                </p>
                <div className="pl-6 pt-1 flex items-center gap-2 flex-wrap">
                  <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-highest)] border border-[var(--pt-outline-variant)] px-2 py-0.5 rounded font-semibold">
                    MERKLE ROOT VALID
                  </span>
                  <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                    Block #18,924,102
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Verified Domain Records + Extracted Tags + Action CTAs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Detailed Competency Breakdown Cards */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[20px]">
                  layers
                </span>
                <h2 className="font-display text-[18px] font-semibold text-[var(--pt-on-surface)]">
                  Verified Domain Records
                </h2>
              </div>
              <span className="font-mono-code text-[11px] text-[var(--pt-on-surface-variant)]">
                ORDER: IMPACT
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {DOMAIN_RECORDS.map((record) => {
                const isCopied = copiedId === record.id;
                return (
                  <div
                    key={record.id}
                    className="bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] rounded-xl p-4 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display text-[17px] text-[var(--pt-on-surface)] dark:text-[var(--pt-primary)] font-semibold">
                            {record.title}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full font-mono-code text-[11px] font-semibold ${
                              record.levelTone === 'mastery'
                                ? 'bg-[var(--pt-secondary-container)] text-[var(--pt-primary)] dark:text-[var(--pt-secondary-fixed)]'
                                : record.levelTone === 'advanced'
                                ? 'bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] text-[var(--pt-on-surface)] dark:text-[var(--pt-primary-fixed)] border border-[var(--pt-outline-variant)]'
                                : 'bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] text-[var(--pt-on-surface-variant)] border border-[var(--pt-outline-variant)]'
                            }`}
                          >
                            {record.levelLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[var(--pt-on-surface-variant)] font-mono-code text-[11px]">
                          <span>{record.hours}</span>
                          <span>•</span>
                          <span className="text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] font-semibold">
                            {record.proofCount}
                          </span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] flex items-center justify-center shrink-0">
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            record.iconTone === 'primary'
                              ? 'text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)]'
                              : record.iconTone === 'tertiary'
                              ? 'text-[var(--pt-tertiary)]'
                              : 'text-[var(--pt-secondary)]'
                          }`}
                        >
                          {record.icon}
                        </span>
                      </div>
                    </div>

                    {/* Execution Progress */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono-code text-[11px]">
                        <span className="text-[var(--pt-on-surface-variant)]">
                          {record.progressLabel}
                        </span>
                        <span className="text-[var(--pt-secondary)] font-semibold tabular-nums">
                          {record.progressPct}% Threshold
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[var(--pt-surface-high)] dark:bg-[var(--pt-surface-highest)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--pt-primary-container)] rounded-full transition-all duration-300"
                          style={{ width: `${record.progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Linked Recent Proof Thumbnail Card */}
                    <div className="flex items-center gap-3 bg-[var(--pt-surface-low)] dark:bg-[var(--pt-surface-container)] border border-[var(--pt-outline-variant)] rounded-lg p-2.5">
                      <div className="w-12 h-12 rounded-lg bg-[var(--pt-surface-highest)] overflow-hidden shrink-0 border border-[var(--pt-outline-variant)]">
                        <ResilientImage
                          src={record.thumbnailUrl}
                          alt={record.thumbnailAlt}
                          className="w-full h-full object-cover"
                          fallbackIcon={record.icon}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1 font-mono-code text-[11px] text-[var(--pt-primary)] font-semibold truncate">
                          <span className="material-symbols-outlined text-[13px] text-[var(--pt-secondary)]">
                            verified
                          </span>
                          <span className="truncate">{record.recentProofHash}</span>
                        </div>
                        <div className="text-[12px] text-[var(--pt-on-surface-variant)] truncate">
                          {record.recentProofTitle}
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={`Copy hash for ${record.title}`}
                        onClick={() => handleCopyProof(record.id, record.recentProofCopyValue)}
                        className="shrink-0 w-8 h-8 rounded bg-[var(--pt-surface-container)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] flex items-center justify-center text-[var(--pt-on-surface-variant)] hover:text-[var(--pt-primary)] transition-colors cursor-pointer"
                      >
                        <span
                          className={`material-symbols-outlined text-[15px] ${
                            isCopied ? 'text-[var(--pt-secondary)]' : ''
                          }`}
                        >
                          {isCopied ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Top Extracted Tags with Confidence Scores */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[var(--pt-primary)] dark:text-[var(--pt-primary-container)] text-[20px]">
                  psychology
                </span>
                <h3 className="font-display text-[18px] font-semibold text-[var(--pt-on-surface)]">
                  Extracted Execution Tags
                </h3>
              </div>
              <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] font-semibold">
                AI CONFIDENCE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
              {EXECUTION_TAGS.map((tag) => (
                <div
                  key={tag.name}
                  className="bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-low)] border border-[var(--pt-outline-variant)] rounded-xl p-3 space-y-1.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: tag.dotColor }}
                      />
                      <span className="font-mono-code text-[13px] text-[var(--pt-on-surface)] dark:text-[var(--pt-primary)] font-bold truncate">
                        {tag.name}
                      </span>
                    </div>
                    <span className="font-mono-code text-[11px] text-[var(--pt-secondary)] font-bold tabular-nums">
                      {tag.confidence}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--pt-surface-high)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${tag.confidence}%`, backgroundColor: tag.dotColor }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[var(--pt-on-surface-variant)] font-mono-code text-[11px] pt-0.5">
                    <span>{tag.proofs}</span>
                    <span className="text-[var(--pt-primary)] font-medium">{tag.tier}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action CTAs */}
          <section className="space-y-2.5 pt-1">
            {generatedKey && (
              <div className="rounded-xl bg-[var(--pt-secondary-container)]/40 border border-[var(--pt-secondary)]/30 p-3 flex items-center justify-between gap-2">
                <div className="font-mono-code text-[12px] text-[var(--pt-on-surface)]">
                  Ephemeral Key Active: <strong className="text-[var(--pt-secondary)]">{generatedKey}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(generatedKey).catch(() => {});
                    onShowToast(`Copied key ${generatedKey}`);
                  }}
                  className="font-mono-code text-[11px] text-[var(--pt-primary)] underline cursor-pointer"
                >
                  Copy Key
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleExportPassport}
                className="w-full py-3 px-4 rounded-xl bg-[var(--pt-primary-container)] text-[var(--pt-on-primary-container)] font-display text-[15px] font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                <span>Export Skill Passport</span>
              </button>
              <button
                type="button"
                onClick={handleGenerateRecruiterKey}
                className="w-full py-3 px-4 rounded-xl bg-[var(--pt-surface-lowest)] dark:bg-[var(--pt-surface-high)] border border-[var(--pt-outline-variant)] text-[var(--pt-primary)] font-display text-[15px] font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[var(--pt-secondary)] text-[20px]">
                  vpn_key
                </span>
                <span>Recruiter Verification Key</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
