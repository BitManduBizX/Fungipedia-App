import React, { useState } from 'react';
import { UserPreferences } from '../types/mycology';
import { UserCheck, Shield, KeyRound, Check, X, Smartphone, Globe, CloudCheck } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSavePreferences: (prefs: UserPreferences) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
}) => {
  const [formData, setFormData] = useState<UserPreferences>(preferences);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePreferences(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleSimulatedOAuth = () => {
    setIsSignedIn(!isSignedIn);
    if (!isSignedIn) {
      setFormData((prev) => ({
        ...prev,
        displayName: 'Dr. Hari Thapa',
        email: 'hari.thapa@nmdc.org.np',
      }));
    }
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
          <div className="w-10 h-10 rounded-xl bg-[#2C221E] text-white dark:bg-[#EDE6DE] dark:text-[#121613] flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-[#2C221E] dark:text-[#EDE6DE]">
              User Profile & Settings
            </h3>
            <p className="text-xs text-[#2C221E]/60 dark:text-[#EDE6DE]/60">
              Personalize currencies, experience levels, and offline backup
            </p>
          </div>
        </div>

        {/* Quick Simulated OAuth / Auth status */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-[#2C221E] dark:text-[#EDE6DE] block">
              {isSignedIn ? 'Certified Mycologist Session' : 'Guest Explorer Session'}
            </span>
            <span className="text-[11px] text-[#2C221E]/60 dark:text-[#EDE6DE]/60 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Offline Local Storage Active</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleSimulatedOAuth}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#2C221E]/15 dark:border-[#EDE6DE]/15 bg-[#FAF7F0] dark:bg-[#151A16] hover:bg-[#EAE6DC] text-[#2C221E] dark:text-[#EDE6DE] transition-colors"
          >
            {isSignedIn ? 'Sign Out' : 'Quick Connect'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1E2520] border border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE] focus:outline-none focus:ring-1 focus:ring-[#D96B43]"
            />
          </div>

          <div>
            <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
              Mycology Experience Tier
            </label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as any })}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1E2520] border border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE] focus:outline-none focus:ring-1 focus:ring-[#D96B43]"
            >
              <option value="beginner">Junior Explorer & Beginner</option>
              <option value="forager">Wild Forager & Naturalist</option>
              <option value="commercial">Commercial Mushroom Farmer</option>
              <option value="scientist">Research Mycologist / Biologist</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                Default Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1E2520] border border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE]"
              >
                <option value="USD">USD ($)</option>
                <option value="NPR">NPR (रू - Nepal)</option>
                <option value="EUR">EUR (€)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                Temperature Unit
              </label>
              <select
                value={formData.tempUnit}
                onChange={(e) => setFormData({ ...formData, tempUnit: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1E2520] border border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE]"
              >
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:bg-[#EAE6DC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg font-semibold bg-[#D96B43] text-white hover:bg-[#c25a34] transition-all flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
