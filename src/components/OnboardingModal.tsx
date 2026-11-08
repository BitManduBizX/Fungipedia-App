import React, { useState } from 'react';
import { X, ArrowRight, Check, Compass, BookOpen, Sprout, Sparkles } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAI: () => void;
}

const STEPS = [
  {
    icon: Compass,
    color: '#D96B43',
    title: 'Welcome to Fungipedia (MycoVerse)',
    description:
      'The definitive open encyclopedia dedicated to the science of mycology, fungal cellular architecture, commercial cultivation, and ecological networks.',
  },
  {
    icon: BookOpen,
    color: '#4A7C59',
    title: 'Interactive Botanical Anatomy',
    description:
      'Inspect 3D-styled cross-sections of pileus, lamellae gills, annulus rings, and volva cups. Click any hotspot to hear authentic audio Latin pronunciations.',
  },
  {
    icon: Sprout,
    color: '#E09F3E',
    title: 'Global & Nepal Cultivation Hub',
    description:
      'Learn why straw is pasteurized at 65°C–75°C to preserve beneficial thermophilic bacteria. Explore Nepal\'s NMDC Balambu techniques and download grower references.',
  },
  {
    icon: Sparkles,
    color: '#3B6960',
    title: 'MycoAI Assistant & Specimen Diagnosis',
    description:
      'Engage with our Gemini-powered mycology AI. Upload photos of mystery mushrooms or fruiting bags for instant multimodal feature analysis and health advisories.',
  },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onOpenAI }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = STEPS[currentStepIndex];
  const isLast = currentStepIndex === STEPS.length - 1;
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (isLast) {
      onClose();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#F7F4EC] dark:bg-[#151A16] border border-[#2C221E]/15 dark:border-[#EDE6DE]/15 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#2C221E]/60 dark:text-[#EDE6DE]/60 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
          aria-label="Skip Tour"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator dots */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === currentStepIndex
                  ? 'w-6 bg-[#D96B43]'
                  : 'w-2 bg-[#2C221E]/20 dark:bg-[#EDE6DE]/20'
              }`}
            />
          ))}
        </div>

        {/* Visual Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm"
          style={{ backgroundColor: currentStep.color }}
        >
          <Icon className="w-7 h-7" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-display text-xl font-bold text-[#2C221E] dark:text-[#EDE6DE]">
            {currentStep.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#2C221E]/60 dark:text-[#EDE6DE]/60 hover:text-[#2C221E]"
          >
            Skip Walkthrough
          </button>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#2C221E] text-white dark:bg-[#EDE6DE] dark:text-[#121613] hover:opacity-90 transition-opacity"
          >
            <span>{isLast ? 'Begin Exploring' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
