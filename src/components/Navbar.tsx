import React from 'react';
import { Sparkles, Sun, Moon, BookOpen, UserCheck, MessageSquare } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAI: () => void;
  onOpenJournal: () => void;
  onOpenFeedback: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenAI,
  onOpenJournal,
  onOpenFeedback,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F7F4EC]/90 dark:bg-[#121613]/90 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <span className="w-8 h-8 rounded-lg bg-[#D96B43] flex items-center justify-center text-white text-base font-bold shadow-sm group-hover:scale-105 transition-transform">
            🍄
          </span>
          <span className="font-display font-bold text-xl tracking-tight text-[#2C221E] dark:text-[#EDE6DE]">
            Fungipedia
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2C221E]/80 dark:text-[#EDE6DE]/80">
          <a
            href="#biology"
            className="hover:text-[#D96B43] dark:hover:text-[#E09F3E] transition-colors whitespace-nowrap shrink-0"
          >
            Biology & Health
          </a>
          <a
            href="#anatomy"
            className="hover:text-[#D96B43] dark:hover:text-[#E09F3E] transition-colors whitespace-nowrap shrink-0"
          >
            Interactive Anatomy
          </a>
          <a
            href="#species"
            className="hover:text-[#D96B43] dark:hover:text-[#E09F3E] transition-colors whitespace-nowrap shrink-0"
          >
            Species & Market Rates
          </a>
          <a
            href="#cultivation"
            className="hover:text-[#D96B43] dark:hover:text-[#E09F3E] transition-colors whitespace-nowrap shrink-0"
          >
            Cultivation & Nepal Hub
          </a>
          <a
            href="#kids"
            className="hover:text-[#D96B43] dark:hover:text-[#E09F3E] transition-colors whitespace-nowrap shrink-0"
          >
            Kids Corner
          </a>
        </nav>

        {/* Zone 3: 1 primary action area with functional utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenJournal}
            title="Grow Journal & Offline Notes"
            className="p-2 rounded-lg text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
            aria-label="Mycology Journal"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenFeedback}
            title="Feedback & Suggestions"
            className="p-2 rounded-lg text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
            aria-label="Submit Feedback"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenProfile}
            title="User Profile & Settings"
            className="p-2 rounded-lg text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
            aria-label="User Profile"
          >
            <UserCheck className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-lg text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#E09F3E]" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#D96B43] hover:bg-[#c25a34] dark:bg-[#E09F3E] dark:hover:bg-[#ca892e] dark:text-[#121613] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask MycoAI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
