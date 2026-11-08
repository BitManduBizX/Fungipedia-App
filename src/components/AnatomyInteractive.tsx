import React, { useState } from 'react';
import { ANATOMY_PARTS } from '../data/anatomyData';
import { AnatomyPart } from '../types/mycology';
import { Volume2, Sparkles, AlertTriangle, Eye, RefreshCw } from 'lucide-react';

export const AnatomyInteractive: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<AnatomyPart>(ANATOMY_PARTS[0]);
  const [showSporeDrift, setShowSporeDrift] = useState<boolean>(true);
  const [showDangerMarkers, setShowDangerMarkers] = useState<boolean>(false);

  const speakTerm = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="anatomy" className="py-14 sm:py-20 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10 bg-[#FAF7F0] dark:bg-[#151A16] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold text-[#D96B43] dark:text-[#E09F3E] tracking-wider uppercase">
            Chapter 02 · Morphological Structure & Identification
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C221E] dark:text-[#EDE6DE] mt-1.5" style={{ textWrap: 'balance' }}>
            Interactive Botanical Anatomy Diagram
          </h2>
          <p className="text-sm sm:text-base text-[#2C221E]/75 dark:text-[#EDE6DE]/75 mt-2">
            Click on any anatomical hotspot on the specimen to inspect its microscopic function, hear phonetic Latin pronunciations, and learn key morphological survival markers.
          </p>
        </div>

        {/* Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-xl bg-[#EAE6DC]/70 dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#2C221E]/70 dark:text-[#EDE6DE]/70">Simulation Controls:</span>
            <button
              onClick={() => setShowSporeDrift(!showSporeDrift)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                showSporeDrift
                  ? 'bg-[#4A7C59] text-white'
                  : 'bg-white dark:bg-[#2C342D] text-[#2C221E] dark:text-[#EDE6DE]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showSporeDrift ? 'Spore Drift Active' : 'Enable Spore Drift'}</span>
            </button>

            <button
              onClick={() => setShowDangerMarkers(!showDangerMarkers)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                showDangerMarkers
                  ? 'bg-[#A23B2A] text-white'
                  : 'bg-white dark:bg-[#2C342D] text-[#2C221E] dark:text-[#EDE6DE]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{showDangerMarkers ? 'Danger Markers On' : 'Highlight Toxic Markers'}</span>
            </button>
          </div>

          <div className="text-xs text-[#2C221E]/60 dark:text-[#EDE6DE]/60 flex items-center gap-2">
            <span>Selected:</span>
            <strong className="text-[#D96B43] dark:text-[#E09F3E]">{selectedPart.name} ({selectedPart.scientificTerm})</strong>
          </div>
        </div>

        {/* 2-Column Interactive Canvas + Concept Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Visual Interactive Stage */}
          <div className="lg:col-span-7 rounded-2xl bg-[#F7F4EC] dark:bg-[#121613] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
            {/* SVG Interactive Canvas */}
            <div className="relative w-full max-w-[480px] aspect-[4/5] flex items-center justify-center">
              <svg viewBox="0 0 500 520" className="w-full h-full drop-shadow-sm select-none">
                <defs>
                  {/* Gradients for anatomy */}
                  <radialGradient id="capGrad" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#E26D46" />
                    <stop offset="70%" stopColor="#B84A28" />
                    <stop offset="100%" stopColor="#8A2E16" />
                  </radialGradient>
                  <linearGradient id="stipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F5F0E6" />
                    <stop offset="50%" stopColor="#FFFDF9" />
                    <stop offset="100%" stopColor="#E6DECE" />
                  </linearGradient>
                  <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4A3B32" />
                    <stop offset="100%" stopColor="#2A1E18" />
                  </linearGradient>
                </defs>

                {/* Soil Cross Section at the Bottom */}
                <rect x="20" y="400" width="460" height="110" rx="12" fill="url(#soilGrad)" opacity="0.85" />
                <text x="35" y="425" fill="#C5B5A5" fontSize="11" fontFamily="sans-serif" opacity="0.8">
                  Subterranean Humus & Soil Layer
                </text>

                {/* Underground Mycelial Hyphae Network Threads */}
                <g stroke="#E8E0D5" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" className="animate-pulse">
                  <path d="M 250 410 Q 230 430 200 450 T 130 480 M 200 450 Q 170 470 120 495" fill="none" />
                  <path d="M 250 410 Q 280 435 320 460 T 400 485 M 320 460 Q 360 480 430 500" fill="none" />
                  <path d="M 250 410 Q 240 450 245 490 T 235 510 M 245 470 Q 270 490 290 510" fill="none" />
                  <path d="M 210 440 Q 180 430 150 445 T 70 460" fill="none" />
                  <path d="M 290 440 Q 330 430 370 445 T 440 460" fill="none" />
                </g>

                {/* Volva / Bulbous Cup at Base */}
                <path
                  d="M 210 415 C 205 385 220 370 235 370 C 245 370 255 370 265 370 C 280 370 295 385 290 415 Z"
                  fill="#D4C8B5"
                  stroke="#968571"
                  strokeWidth="2"
                  className={selectedPart.id === 'volva' ? 'stroke-[#A23B2A] stroke-[3]' : ''}
                />

                {/* Stipe (Stem) */}
                <path
                  d="M 235 180 C 235 240 230 330 225 395 C 240 400 260 400 275 395 C 270 330 265 240 265 180 Z"
                  fill="url(#stipeGrad)"
                  stroke="#B5A997"
                  strokeWidth="1.5"
                />

                {/* Annulus (Ring / Skirt) */}
                <path
                  d="M 226 240 C 210 255 205 265 220 268 C 235 270 265 270 280 268 C 295 265 290 255 274 240 Z"
                  fill="#ECE4D6"
                  stroke="#B0A08A"
                  strokeWidth="1.5"
                  className={selectedPart.id === 'annulus' ? 'stroke-[#3B6960] stroke-[3]' : ''}
                />

                {/* Gills (Lamellae) - radiating fine lines */}
                <g stroke="#CFBFA8" strokeWidth="1.5" opacity="0.9">
                  <path d="M 120 180 Q 180 185 235 180" fill="none" />
                  <path d="M 140 170 Q 190 178 235 178" fill="none" />
                  <path d="M 160 160 Q 200 170 235 176" fill="none" />
                  <path d="M 380 180 Q 320 185 265 180" fill="none" />
                  <path d="M 360 170 Q 310 178 265 178" fill="none" />
                  <path d="M 340 160 Q 300 170 265 176" fill="none" />
                </g>

                {/* Cap (Pileus) Outer Dome */}
                <path
                  d="M 90 180 C 90 70 410 70 410 180 C 370 175 300 185 250 185 C 200 185 130 175 90 180 Z"
                  fill="url(#capGrad)"
                  stroke="#681F0E"
                  strokeWidth="2.5"
                  className={selectedPart.id === 'pileus' ? 'stroke-[#D96B43] stroke-[4]' : ''}
                />

                {/* Cap Warts / Scales (Velum universale remnants) */}
                <ellipse cx="210" cy="115" rx="12" ry="8" fill="#FFFDF8" opacity="0.9" />
                <ellipse cx="290" cy="115" rx="14" ry="9" fill="#FFFDF8" opacity="0.9" />
                <ellipse cx="250" cy="90" rx="16" ry="10" fill="#FFFDF8" opacity="0.95" />
                <ellipse cx="150" cy="140" rx="10" ry="7" fill="#FFFDF8" opacity="0.85" />
                <ellipse cx="350" cy="140" rx="11" ry="8" fill="#FFFDF8" opacity="0.85" />

                {/* Animated Spore Drift Particles */}
                {showSporeDrift && (
                  <g fill="#E09F3E" opacity="0.8">
                    <circle cx="160" cy="205" r="2.5" className="animate-ping" />
                    <circle cx="190" cy="220" r="2" />
                    <circle cx="310" cy="210" r="2.5" className="animate-ping" />
                    <circle cx="340" cy="225" r="2" />
                    <circle cx="280" cy="235" r="3" />
                    <circle cx="220" cy="230" r="2" />
                    <circle cx="150" cy="245" r="1.5" />
                    <circle cx="360" cy="250" r="2" />
                  </g>
                )}

                {/* Interactive Hotspot Targets */}
                {ANATOMY_PARTS.map((part) => {
                  const isSelected = selectedPart.id === part.id;
                  const isDanger = (part.id === 'volva' || part.id === 'annulus') && showDangerMarkers;

                  return (
                    <g
                      key={part.id}
                      className="cursor-pointer group"
                      onClick={() => setSelectedPart(part)}
                    >
                      {/* Pulse Ring */}
                      <circle
                        cx={part.cx}
                        cy={part.cy}
                        r={isSelected ? 18 : 12}
                        fill={isDanger ? '#A23B2A' : part.colorHex}
                        opacity={isSelected ? 0.35 : 0.2}
                        className={isSelected ? 'animate-ping' : ''}
                      />
                      {/* Inner Pin */}
                      <circle
                        cx={part.cx}
                        cy={part.cy}
                        r={isSelected ? 9 : 6}
                        fill={isDanger ? '#A23B2A' : part.colorHex}
                        stroke="#FFF"
                        strokeWidth="2"
                        className="transition-all duration-200 group-hover:scale-125"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Part Navigation Chips below Diagram */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 pt-4 border-t border-[#2C221E]/10 dark:border-[#EDE6DE]/10 w-full">
              {ANATOMY_PARTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPart(p)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    selectedPart.id === p.id
                      ? 'bg-[#2C221E] text-white dark:bg-[#EDE6DE] dark:text-[#121613]'
                      : 'bg-[#EAE6DC]/60 dark:bg-[#1E2520] text-[#2C221E]/80 dark:text-[#EDE6DE]/80 hover:bg-[#EAE6DC]'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Concept Deck: Active Anatomical Inspector */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#191F1A] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 shadow-sm space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#D96B43] dark:text-[#E09F3E]">
                  Anatomical Structure #{ANATOMY_PARTS.findIndex((p) => p.id === selectedPart.id) + 1}
                </span>

                <button
                  onClick={() => speakTerm(`${selectedPart.name}, scientifically known as ${selectedPart.scientificTerm}`)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-md bg-[#EAE6DC] dark:bg-[#212822] text-[#2C221E] dark:text-[#EDE6DE] hover:bg-[#ded9cd] transition-colors"
                  title="Pronounce Scientific Latin Name"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#D96B43]" />
                  <span>Audio Pronounce</span>
                </button>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                  {selectedPart.name}
                </h3>
                <p className="text-sm italic font-serif text-[#D96B43] dark:text-[#E09F3E] mt-0.5">
                  {selectedPart.scientificTerm} · [{selectedPart.pronunciation}]
                </p>
              </div>

              <p className="text-sm text-[#2C221E]/85 dark:text-[#EDE6DE]/85 leading-relaxed">
                {selectedPart.description}
              </p>

              {/* Functional Role Box */}
              <div className="p-4 rounded-xl bg-[#FAF7F0] dark:bg-[#151A16] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A7C59] dark:text-[#64A377]">
                  Primary Biological Function
                </h4>
                <p className="text-xs sm:text-sm text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                  {selectedPart.function}
                </p>
              </div>

              {/* Microscopic Cellular Secret */}
              <div className="p-4 rounded-xl bg-[#FAF7F0] dark:bg-[#151A16] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E09F3E]">
                  Microscopic & Cellular Detail
                </h4>
                <p className="text-xs sm:text-sm text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                  {selectedPart.microscopicDetail}
                </p>
              </div>
            </div>

            {/* Toxic Marker Warning Callout */}
            {selectedPart.id === 'volva' && (
              <div className="p-3.5 rounded-lg bg-[#A23B2A]/10 border border-[#A23B2A]/20 text-[#A23B2A] dark:text-[#f87171] text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Critical Forager Identification Warning</span>
                </div>
                <p className="text-xs leading-relaxed text-[#2C221E]/80 dark:text-[#EDE6DE]/80">
                  Always excavate the base when picking field mushrooms. The presence of a subterranean cup (volva) combined with white gills almost invariably signals a member of the lethal <em>Amanita</em> genus (Death Cap, Destroying Angel).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
