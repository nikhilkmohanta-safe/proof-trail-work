import { useCallback, useEffect, useRef, useState } from 'react';
import { AuditView } from './components/AuditView';
import { BottomNav } from './components/BottomNav';
import { GitHubSyncView } from './components/GitHubSyncView';
import { Header } from './components/Header';
import { LogWorkView } from './components/LogWorkView';
import { SelectRepositoriesModal } from './components/SelectRepositoriesModal';
import { SkillsView } from './components/SkillsView';
import { TimelineView } from './components/TimelineView';
import {
  INITIAL_PROOFS,
  INITIAL_REPOSITORIES,
  INITIAL_STAGED_EXECUTIONS,
} from './data/mockData';
import { AppTab, ProofItem, RepoItem, StagedExecution } from './types/prooftrail';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('timeline');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [proofs, setProofs] = useState<ProofItem[]>(INITIAL_PROOFS);
  const [totalProofCount, setTotalProofCount] = useState<number>(42);
  const [stagedExecutions, setStagedExecutions] = useState<StagedExecution[]>(
    INITIAL_STAGED_EXECUTIONS
  );
  const [repositories, setRepositories] = useState<RepoItem[]>(INITIAL_REPOSITORIES);
  const [isRepoModalOpen, setIsRepoModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      showToast(
        next
          ? 'Switched to Cryptographic Dark Mode'
          : 'Switched to Warm Archival Light Mode'
      );
      return next;
    });
  };

  const handleSelectTab = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublishProof = (newProof: ProofItem, newStaged: StagedExecution) => {
    setProofs((prev) => [newProof, ...prev]);
    setTotalProofCount((c) => c + 1);
    setStagedExecutions((prev) => [newStaged, ...prev]);
    showToast(`Proof #${newProof.hashId} anchored to Timeline!`);
  };

  const handleConfirmRepos = (updated: RepoItem[]) => {
    setRepositories(updated);
    setIsRepoModalOpen(false);
    const count = updated.filter((r) => r.selected).length;
    showToast(`Synced ${count} repositories with ZK-Scrim enabled`);
  };

  const syncedRepoCount = repositories.filter((r) => r.selected).length;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--pt-surface)] text-[var(--pt-on-surface)] transition-colors">
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        syncedRepoCount={syncedRepoCount}
      />

      {/* Interactive Toast Notification */}
      <div
        aria-live="polite"
        className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--pt-surface-highest)] border border-[var(--pt-outline-variant)] text-[var(--pt-primary)] shadow-xl transition-all duration-200 pointer-events-none ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <span className="material-symbols-outlined text-[18px] text-[var(--pt-secondary)]">
          check_circle
        </span>
        <span className="font-mono-code text-[12px] font-medium">{toastMessage}</span>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pb-12">
        {activeTab === 'timeline' && (
          <TimelineView
            proofs={proofs}
            totalProofCount={totalProofCount}
            onShowToast={showToast}
            onNavigateToLogWork={() => handleSelectTab('log-work')}
          />
        )}

        {activeTab === 'skills' && <SkillsView onShowToast={showToast} />}

        {activeTab === 'log-work' && (
          <LogWorkView
            stagedExecutions={stagedExecutions}
            syncedRepoCount={syncedRepoCount}
            onPublishProof={handlePublishProof}
            onOpenGitHubSync={() => handleSelectTab('github-sync')}
            onOpenRepoModal={() => setIsRepoModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'github-sync' && (
          <GitHubSyncView
            repositories={repositories}
            onOpenRepoModal={() => setIsRepoModalOpen(true)}
            onCompleteSync={() => {
              showToast(`GitHub sync authorized for ${syncedRepoCount} repositories!`);
              handleSelectTab('timeline');
            }}
            onSkip={() => handleSelectTab('log-work')}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'audit' && <AuditView onShowToast={showToast} />}
      </main>

      <BottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />

      <SelectRepositoriesModal
        isOpen={isRepoModalOpen}
        repositories={repositories}
        onClose={() => setIsRepoModalOpen(false)}
        onConfirm={handleConfirmRepos}
      />
    </div>
  );
}
