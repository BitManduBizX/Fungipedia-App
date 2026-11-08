import React, { useState } from 'react';
import { KID_FACTS, TRIVIA_QUESTIONS, KidFact } from '../data/kidsFactsData';
import { Award, CheckCircle, RefreshCw, Sparkles, Smile, Star } from 'lucide-react';

export const KidsCorner: React.FC = () => {
  const [selectedFact, setSelectedFact] = useState<KidFact>(KID_FACTS[0]);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    TRIVIA_QUESTIONS.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) score += 1;
    });
    return score;
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setShowResults(false);
  };

  return (
    <section id="kids" className="py-14 sm:py-20 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E09F3E] uppercase tracking-wider">
            <Smile className="w-4 h-4" />
            <span>Curious Explorers & Family Discovery</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C221E] dark:text-[#EDE6DE] mt-1.5" style={{ textWrap: 'balance' }}>
            Kids Corner & Junior Mycologist Quiz
          </h2>
          <p className="text-sm sm:text-base text-[#2C221E]/75 dark:text-[#EDE6DE]/75 mt-2">
            Did you know mushrooms can make rain, glow in the dark, and survive in outer space? Dive into wild fungal superpowers and earn your Junior Mycologist Explorer Badge!
          </p>
        </div>

        {/* Fact Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Fact Selector Cards on Left */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {KID_FACTS.map((fact) => (
              <button
                key={fact.id}
                onClick={() => setSelectedFact(fact)}
                className={`p-3.5 rounded-xl border text-left transition-all space-y-2 flex flex-col justify-between ${
                  selectedFact.id === fact.id
                    ? 'bg-white dark:bg-[#1E2520] border-[#E09F3E] shadow-sm ring-1 ring-[#E09F3E]'
                    : 'bg-[#EAE6DC]/50 dark:bg-[#191F1A]/50 border-transparent hover:bg-[#EAE6DC] dark:hover:bg-[#191F1A]'
                }`}
              >
                <span className="text-2xl block">{fact.emoji}</span>
                <span className="font-semibold text-xs text-[#2C221E] dark:text-[#EDE6DE] line-clamp-2">
                  {fact.title}
                </span>
              </button>
            ))}
          </div>

          {/* Active Kid Fact Showcase on Right */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFF9EE] to-[#F5ECE0] dark:from-[#1E2520] dark:to-[#171D18] border border-[#E09F3E]/30 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-4xl">{selectedFact.emoji}</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D96B43] dark:text-[#E09F3E]">
                Fungal Superpower
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2C221E] dark:text-[#EDE6DE]">
              {selectedFact.title}
            </h3>

            <p className="text-sm sm:text-base text-[#2C221E]/85 dark:text-[#EDE6DE]/85 leading-relaxed">
              {selectedFact.fact}
            </p>

            <div className="p-4 rounded-xl bg-white/80 dark:bg-[#121613]/80 border border-[#E09F3E]/20 space-y-1">
              <span className="text-xs font-bold text-[#4A7C59] dark:text-[#64A377] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Science Secret:</span>
              </span>
              <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                {selectedFact.scientificPunchline}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Junior Mycologist Trivia Quiz */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#191F1A] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#E09F3E]" />
                <h3 className="font-display text-xl font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                  Interactive Junior Mycologist Quiz
                </h3>
              </div>
              <p className="text-xs text-[#2C221E]/70 dark:text-[#EDE6DE]/70 mt-1">
                Test your knowledge across 3 fun fungal trivia questions!
              </p>
            </div>

            {showResults && (
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#EAE6DC] dark:bg-[#2C342D] text-[#2C221E] dark:text-[#EDE6DE] hover:bg-[#ded9cd] transition-colors self-start"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Quiz Again</span>
              </button>
            )}
          </div>

          <div className="space-y-6">
            {TRIVIA_QUESTIONS.map((question, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];
              return (
                <div key={qIdx} className="space-y-3">
                  <p className="font-semibold text-sm text-[#2C221E] dark:text-[#EDE6DE]">
                    {qIdx + 1}. {question.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {question.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      let btnStyle = 'bg-[#FAF7F0] dark:bg-[#151A16] border-[#2C221E]/10 dark:border-[#EDE6DE]/10 text-[#2C221E] dark:text-[#EDE6DE] hover:bg-[#EAE6DC]';

                      if (showResults) {
                        if (optIdx === question.correctIndex) {
                          btnStyle = 'bg-[#4A7C59]/15 border-[#4A7C59] text-[#2C221E] dark:text-white font-semibold';
                        } else if (isChosen && optIdx !== question.correctIndex) {
                          btnStyle = 'bg-[#A23B2A]/15 border-[#A23B2A] text-[#A23B2A]';
                        }
                      } else if (isChosen) {
                        btnStyle = 'bg-[#2C221E] text-white dark:bg-[#EDE6DE] dark:text-[#121613] font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showResults}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`p-3 text-xs text-left rounded-lg border transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <p className="text-xs text-[#4A7C59] dark:text-[#64A377] font-medium pt-1">
                      💡 {question.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {!showResults ? (
            <div className="pt-2">
              <button
                disabled={Object.keys(quizAnswers).length < TRIVIA_QUESTIONS.length}
                onClick={() => setShowResults(true)}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#D96B43] text-white hover:bg-[#c25a34] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Submit Answers & View Score
              </button>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-[#FAF7F0] dark:bg-[#151A16] border border-[#E09F3E]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E09F3E]/20 text-[#E09F3E] flex items-center justify-center text-xl font-bold">
                  🌟
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-[#2C221E] dark:text-[#EDE6DE]">
                    Quiz Result: {calculateScore()} of {TRIVIA_QUESTIONS.length} Correct!
                  </h4>
                  <p className="text-xs text-[#2C221E]/75 dark:text-[#EDE6DE]/75">
                    {calculateScore() === 3
                      ? 'Incredible! You earned the Master Spore Scout Gold Badge!'
                      : 'Great job! Keep exploring the wonderful fungal world!'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E09F3E]/20 text-[#8B5A10] dark:text-[#E09F3E] text-xs font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>Certified Junior Mycologist</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
