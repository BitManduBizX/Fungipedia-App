import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BiologySection } from './components/BiologySection';
import { AnatomyInteractive } from './components/AnatomyInteractive';
import { SpeciesCatalog } from './components/SpeciesCatalog';
import { CultivationHub } from './components/CultivationHub';
import { EcologicalRoles } from './components/EcologicalRoles';
import { KidsCorner } from './components/KidsCorner';
import { MycoAIAssistant } from './components/MycoAIAssistant';
import { CultivationJournal } from './components/CultivationJournal';
import { OnboardingModal } from './components/OnboardingModal';
import { ProfileModal } from './components/ProfileModal';
import { FeedbackModal } from './components/FeedbackModal';
import { Footer } from './components/Footer';
import { GrowLogEntry, UserPreferences } from './types/mycology';
import { Sparkles } from 'lucide-react';

// Defensive Error Boundary to guarantee zero white screen crashes
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}
class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by Fungipedia ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#F7F4EC] text-[#2C221E]">
          <div className="max-w-md p-8 rounded-2xl bg-white shadow-xl border border-[#D96B43]/30 text-center space-y-4">
            <span className="text-4xl block">🍄</span>
            <h2 className="font-display text-xl font-bold">Fungipedia Recovered Gracefully</h2>
            <p className="text-xs text-[#2C221E]/75">
              An unexpected component issue was safely isolated. Click below to reload smoothly.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#D96B43] text-white hover:bg-[#c25a34]"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const DEFAULT_PREFERENCES: UserPreferences = {
  currency: 'USD',
  tempUnit: 'C',
  experienceLevel: 'beginner',
  displayName: 'Fungal Enthusiast',
};

const INITIAL_LOGS: GrowLogEntry[] = [
  {
    id: 'log-1',
    speciesName: 'Pearl Oyster (Pleurotus ostreatus)',
    substrateType: 'Boiled Paddy Straw (Pasteurized 70°C)',
    inoculationDate: '2026-10-18',
    pinningDate: '2026-11-02',
    temperatureC: 22,
    humidityPercent: 92,
    yieldGrams: 1450,
    status: 'harvested',
    notes: 'Straw boiled for 75 min. First flush yielded heavy white clusters on day 20. Dunked for Flush 2!',
  },
  {
    id: 'log-2',
    speciesName: "Lion's Mane (Hericium erinaceus)",
    substrateType: 'Hardwood Sawdust + Wheat Bran',
    inoculationDate: '2026-10-25',
    temperatureC: 21,
    humidityPercent: 88,
    yieldGrams: 0,
    status: 'pinning',
    notes: 'Early icicle primordia forming at top slits. Fresh air exchange set to 3 cycles per day.',
  },
];

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('fungipedia_dark_mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // User preferences
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('fungipedia_preferences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PREFERENCES;
      }
    }
    return DEFAULT_PREFERENCES;
  });

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('fungipedia_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['oyster-mushroom', 'lions-mane', 'morel'];
      }
    }
    return ['oyster-mushroom', 'lions-mane', 'morel'];
  });

  // Cultivation Grow Logs
  const [growLogs, setGrowLogs] = useState<GrowLogEntry[]>(() => {
    const saved = localStorage.getItem('fungipedia_grow_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_LOGS;
      }
    }
    return INITIAL_LOGS;
  });

  // Modals state
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Apply dark class to documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('fungipedia_dark_mode', String(darkMode));
  }, [darkMode]);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('fungipedia_preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('fungipedia_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Persist grow logs
  useEffect(() => {
    localStorage.setItem('fungipedia_grow_logs', JSON.stringify(growLogs));
  }, [growLogs]);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddLog = (entry: Omit<GrowLogEntry, 'id'>) => {
    const newEntry: GrowLogEntry = {
      ...entry,
      id: 'log-' + Date.now(),
    };
    setGrowLogs((prev) => [newEntry, ...prev]);
  };

  const handleDeleteLog = (id: string) => {
    setGrowLogs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleImportLogs = (imported: GrowLogEntry[]) => {
    setGrowLogs(imported);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#F7F4EC] dark:bg-[#121613] text-[#2C221E] dark:text-[#EDE6DE] transition-colors duration-200">
        {/* Navigation Bar */}
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenAI={() => setIsAIOpen(true)}
          onOpenJournal={() => setIsJournalOpen(true)}
          onOpenFeedback={() => setIsFeedbackOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Main Single-Page Educational Flow */}
        <main className="flex-1">
          <HeroSection
            onOpenAI={() => setIsAIOpen(true)}
            onOpenTour={() => setIsTourOpen(true)}
          />

          <BiologySection />

          <AnatomyInteractive />

          <SpeciesCatalog
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            currency={preferences.currency}
            onChangeCurrency={(curr) => setPreferences({ ...preferences, currency: curr })}
          />

          <CultivationHub />

          <EcologicalRoles />

          <KidsCorner />
        </main>

        {/* Footer */}
        <Footer />

        {/* Persistent Floating AI Mycologist Trigger Button */}
        <button
          onClick={() => setIsAIOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#D96B43] hover:bg-[#c25a34] dark:bg-[#E09F3E] dark:hover:bg-[#ca892e] text-white dark:text-[#121613] font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
          title="Open MycoAI Assistant"
        >
          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Ask MycoAI</span>
        </button>

        {/* Modals & Slide-overs */}
        <MycoAIAssistant
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
        />

        <CultivationJournal
          isOpen={isJournalOpen}
          onClose={() => setIsJournalOpen(false)}
          bookmarkedIds={bookmarkedIds}
          onRemoveBookmark={handleToggleBookmark}
          logs={growLogs}
          onAddLog={handleAddLog}
          onDeleteLog={handleDeleteLog}
          onImportLogs={handleImportLogs}
        />

        <OnboardingModal
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          onOpenAI={() => {
            setIsTourOpen(false);
            setIsAIOpen(true);
          }}
        />

        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          preferences={preferences}
          onSavePreferences={setPreferences}
        />

        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}
