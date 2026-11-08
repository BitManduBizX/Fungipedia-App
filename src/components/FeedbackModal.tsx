import React, { useState } from 'react';
import { MessageSquare, Star, Check, X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('Cultivation Content');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, category, feedback }),
      });
    } catch {
      // optimistic
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#F7F4EC] dark:bg-[#151A16] border border-[#2C221E]/15 dark:border-[#EDE6DE]/15 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#2C221E]/60 dark:text-[#EDE6DE]/60 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D96B43] text-white flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-[#2C221E] dark:text-[#EDE6DE]">
              Continuous Improvement Feedback
            </h3>
            <p className="text-xs text-[#2C221E]/60 dark:text-[#EDE6DE]/60">
              Help us expand Fungipedia for global mycology education
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 rounded-xl bg-[#4A7C59]/15 border border-[#4A7C59] text-center space-y-2">
            <Check className="w-8 h-8 text-[#4A7C59] mx-auto" />
            <h4 className="font-bold text-sm text-[#2C221E] dark:text-[#EDE6DE]">
              Thank You for Your Feedback!
            </h4>
            <p className="text-xs text-[#2C221E]/75 dark:text-[#EDE6DE]/75">
              Your feedback directly shapes our future mycology guides and AI models.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1.5">
                Overall Experience Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-lg transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-[#E09F3E] fill-current'
                          : 'text-[#2C221E]/20 dark:text-[#EDE6DE]/20'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                Topic Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1E2520] border border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE]"
              >
                <option value="Cultivation Content">Cultivation & Farming Advice</option>
                <option value="Nepal Agriculture">Nepal Agriculture & NMDC Details</option>
                <option value="AI Assistant">MycoAI Multimodal Accuracy</option>
                <option value="Species Encyclopedia">Species Taxonomy & Market Rates</option>
                <option value="Kids Corner">Kids Corner & Educational Trivia</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                Your Suggestions or Field Notes
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={3}
                placeholder="What species, cultivation guides, or interactive tools would you like to see next?"
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1E2520] border border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE] focus:outline-none focus:ring-1 focus:ring-[#D96B43]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:bg-[#EAE6DC]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg font-semibold bg-[#D96B43] text-white hover:bg-[#c25a34] transition-all"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
