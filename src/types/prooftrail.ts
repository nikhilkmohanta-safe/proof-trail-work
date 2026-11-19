export type AppTab = 'timeline' | 'skills' | 'log-work' | 'github-sync' | 'audit';

export type ProofCategory = 'github' | 'hardware' | 'debugging' | 'architecture';

export interface ProofMetric {
  icon: string;
  label: string;
  tone: 'secondary' | 'primary' | 'neutral';
}

export interface ProofItem {
  id: string;
  category: ProofCategory;
  badgeLabel: string;
  badgeIcon: string;
  badgeTone: 'secondary' | 'tertiary';
  hashId: string;
  fullHash: string;
  timestamp: string;
  title: string;
  narrative: string;
  imageUrl?: string;
  imageAlt?: string;
  commitSha?: string;
  waveform?: {
    clockLabel: string;
    statusLabel: string;
    lut: string;
    dsp: string;
    slack: string;
  };
  comparisonBar?: {
    label: string;
    delta: string;
    beforePct: number;
    afterPct: number;
  };
  metrics?: ProofMetric[];
  skills: string[];
  trustScore?: string;
  trustPct?: number;
  sealLabel?: string;
  sealIcon?: string;
  showQuickActions?: boolean;
  nodeColor: 'primary' | 'tertiary' | 'secondary';
}

export interface DomainRecord {
  id: string;
  title: string;
  levelLabel: string;
  levelTone: 'mastery' | 'advanced' | 'intermediate';
  hours: string;
  proofCount: string;
  icon: string;
  iconTone: 'primary' | 'secondary' | 'tertiary';
  progressLabel: string;
  progressPct: number;
  barColor: 'primary' | 'secondary' | 'primary-fixed';
  recentProofHash: string;
  recentProofCopyValue: string;
  recentProofTitle: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
}

export interface ExecutionTag {
  name: string;
  confidence: number;
  proofs: string;
  tier: string;
  dotColor: string;
}

export interface RepoItem {
  id: string;
  fullName: string;
  visibility: 'private' | 'public';
  branch: string;
  description: string;
  skills: string[];
  skillsPrefix?: string;
  commits?: number;
  confidence?: string;
  ingestType?: 'zk-scrim' | 'full' | 'low-signal' | 'notice';
  noticeText?: string;
  includePrBranches?: boolean;
  selected: boolean;
  tags: string[];
}

export interface StagedExecution {
  id: string;
  badge: string;
  badgeTone: 'primary' | 'tertiary';
  title: string;
  hash: string;
  timeAgo: string;
  status: string;
}

export interface AuditValidationRecord {
  proofId: string;
  status: string;
  latency: string;
  artifact: string;
  impact: string;
  authority: string;
  signature: string;
}

export interface AuditMilestone {
  id: string;
  code: string;
  timeAgo: string;
  icon: string;
  title: string;
  description: string;
  diffChips?: { label: string; tone: 'primary' | 'error' | 'secondary' }[];
  gitDiff?: {
    commit: string;
    gpg: string;
    removedLines: string[];
    addedLines: string[];
    coverage: string;
    chaosTests: string;
  };
  metricPair?: {
    leftLabel: string;
    leftValue: string;
    rightLabel: string;
    rightValue: string;
  };
  paperMeta?: {
    specLabel: string;
    arxiv: string;
  };
}
