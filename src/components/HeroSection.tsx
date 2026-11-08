import React from 'react';
import { ArrowRight, Compass, Sprout, Sparkles, HelpCircle } from 'lucide-react';

interface HeroSectionProps {
  onOpenAI: () => void;
  onOpenTour: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAI, onOpenTour }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D96B43] dark:text-[#E09F3E]">
              <span>Scientific Encyclopedia</span>
              <span aria-hidden="true">·</span>
              <span>Global & Nepal Agriculture</span>
              <span aria-hidden="true">·</span>
              <span>Gemini AI Multimodal</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C221E] dark:text-[#EDE6DE] leading-[1.15]" style={{ textWrap: 'balance' }}>
              Discover, Cultivate, and Explore the Secret Kingdom of Fungi.
            </h1>

            <p className="text-base sm:text-lg text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed max-w-2xl">
              From curious children and home hobbyists to commercial mushroom farmers and research mycologists—delve into fungal cellular biology, interactive anatomy, market economics, and proven cultivation techniques.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#biology"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#2C221E] text-[#F7F4EC] hover:bg-[#3d302a] dark:bg-[#EDE6DE] dark:text-[#121613] dark:hover:bg-white shadow-sm transition-all whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-[#E09F3E]" />
                <span>Explore Biology</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#cultivation"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#EAE6DC] dark:bg-[#212822] text-[#2C221E] dark:text-[#EDE6DE] hover:bg-[#ded9cd] dark:hover:bg-[#2b342c] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 transition-colors whitespace-nowrap"
              >
                <Sprout className="w-4 h-4 text-[#4A7C59]" />
                <span>Cultivation Guide</span>
              </a>

              <button
                onClick={onOpenAI}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#D96B43] dark:text-[#E09F3E] bg-[#D96B43]/10 dark:bg-[#E09F3E]/10 hover:bg-[#D96B43]/20 dark:hover:bg-[#E09F3E]/20 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask MycoAI</span>
              </button>

              <button
                onClick={onOpenTour}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#2C221E]/60 dark:text-[#EDE6DE]/60 hover:text-[#2C221E] dark:hover:text-white transition-colors"
                title="Platform Walkthrough"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Quick Tour</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Hero Photographic Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 group">
              <img
                src="/src/assets/images/hero_mycology_forest_1794137267214.jpg"
                alt="Bioluminescent mushrooms and golden chanterelles thriving on a mossy forest floor"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs font-semibold text-[#E09F3E] tracking-wider uppercase">
                  Mycorrhizal Web & Bioluminescence
                </span>
                <p className="text-sm font-medium text-white/95 mt-1">
                  Wild Mycena and Cantharellus interwoven through subterranean hyphal networks.
                </p>
                <div className="flex items-center gap-3 text-xs text-white/70 mt-2">
                  <span>Forest Ecosystem</span>
                  <span aria-hidden="true">·</span>
                  <span>Saprophytic Recycling</span>
                  <span aria-hidden="true">·</span>
                  <span>Luciferin Glow</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Metric Strip below */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-[#EAE6DC]/70 dark:bg-[#191F1A]/80 border border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-display font-bold text-[#2C221E] dark:text-[#EDE6DE] tabular-nums">
              150,000+
            </p>
            <p className="text-xs text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
              Described Fungal Species (est. 3.8M total)
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-display font-bold text-[#4A7C59] dark:text-[#64A377] tabular-nums">
              92%
            </p>
            <p className="text-xs text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
              Plant Families Reliant on Mycorrhizal Web
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-display font-bold text-[#D96B43] dark:text-[#E09F3E] tabular-nums">
              2–3 Weeks
            </p>
            <p className="text-xs text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
              Average Flush Cycle in Paddy Straw Bags
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-display font-bold text-[#2C221E] dark:text-[#EDE6DE] tabular-nums">
              $62.4 B
            </p>
            <p className="text-xs text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
              Global Mushroom Industry Market Value
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
