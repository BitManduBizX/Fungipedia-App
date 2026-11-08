import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/mycology';
import { Sparkles, Send, Upload, Camera, Volume2, ShieldCheck, X, RefreshCw, AlertTriangle, Check, User, Bot } from 'lucide-react';

interface MycoAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'model',
    text: "Welcome to MycoAI! I am your scientific mycology consultant and cultivation engineer. Ask me anything about fungal cellular biology, substrate pasteurization (why straw is boiled), species identification, market pricing, or Nepal cultivation practices. You can also upload a mushroom photo for botanical diagnostic inspection!",
    timestamp: 'Just now',
  },
];

const SUGGESTED_PROMPTS = [
  'Why is straw boiled instead of autoclaved?',
  'How do I identify and treat Trichoderma green mold?',
  'Tell me about oyster mushroom farming in Nepal (NMDC)',
  'What are the health benefits of Lion\'s Mane?',
];

export const MycoAIAssistant: React.FC<MycoAIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('fungipedia_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasUserConsent, setHasUserConsent] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pendingImageAnalysis, setPendingImageAnalysis] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    localStorage.setItem('fungipedia_chat_history', JSON.stringify(messages.slice(-20)));
  }, [messages]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Strip markdown asterisks and hash tags for pleasant speech
      const clean = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query && !selectedImage) return;

    if (selectedImage && !hasUserConsent) {
      setShowConsentModal(true);
      setPendingImageAnalysis(true);
      return;
    }

    const userMsgId = 'msg-' + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: query || 'Analyze uploaded specimen photograph.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imagePreview: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      if (selectedImage) {
        // Send to multimodal diagnose endpoint
        const res = await fetch('/api/gemini/diagnose', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: selectedImage,
            question: query,
          }),
        });

        const data = await res.json();
        const modelReply = data.analysis || 'Analysis complete.';
        const fullText = `${modelReply}\n\n⚠️ ${data.edibilityWarning || 'Safety note: Never consume wild mushrooms without in-person expert certification.'}`;

        setMessages((prev) => [
          ...prev,
          {
            id: 'model-' + Date.now(),
            role: 'model',
            text: fullText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isDiagnosis: true,
          },
        ]);
        setSelectedImage(null);
      } else {
        // Send to text chat endpoint
        const res = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
          }),
        });

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: 'model-' + Date.now(),
            role: 'model',
            text: data.reply || 'I am ready to assist your mycology research.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isFallback: data.isFallback,
          },
        ]);
      }
    } catch (err) {
      console.error('AI chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'model-' + Date.now(),
          role: 'model',
          text: "I am currently functioning in offline mycology mode. In mushroom cultivation, remember that straw pasteurization at 65°C–75°C for 60–90 min is the key foundation for healthy mycelial colonization without competitor molds.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      if (!hasUserConsent) {
        setShowConsentModal(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmConsent = () => {
    setHasUserConsent(true);
    setShowConsentModal(false);
    if (pendingImageAnalysis) {
      setPendingImageAnalysis(false);
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('fungipedia_chat_history');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl h-[92vh] max-h-[750px] flex flex-col rounded-2xl bg-[#F7F4EC] dark:bg-[#151A16] border border-[#2C221E]/15 dark:border-[#EDE6DE]/15 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10 bg-white dark:bg-[#191F1A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D96B43] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                MycoAI Assistant
              </h3>
              <p className="text-[11px] text-[#2C221E]/60 dark:text-[#EDE6DE]/60">
                Powered by Gemini 3.8 · Multimodal Diagnostic Mycology
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={clearChat}
              className="p-1.5 rounded-lg text-[#2C221E]/60 dark:text-[#EDE6DE]/60 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
              title="Reset Conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#2C221E]/60 dark:text-[#EDE6DE]/60 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-[#D96B43]/15 text-[#D96B43] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 shadow-sm ${
                    isUser
                      ? 'bg-[#2C221E] text-white dark:bg-[#EDE6DE] dark:text-[#121613]'
                      : 'bg-white dark:bg-[#1E2520] text-[#2C221E] dark:text-[#EDE6DE] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10'
                  }`}
                >
                  {m.imagePreview && (
                    <div className="rounded-lg overflow-hidden border border-white/20 mb-2 max-w-[200px]">
                      <img src={m.imagePreview} alt="Uploaded Specimen" className="w-full h-auto object-cover" />
                    </div>
                  )}

                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                  <div className="flex items-center justify-between gap-3 pt-1 text-[10px] opacity-70">
                    <span>{m.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => speakText(m.text)}
                        className="hover:opacity-100 flex items-center gap-1"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-[#2C221E]/10 dark:bg-[#EDE6DE]/10 text-[#2C221E] dark:text-[#EDE6DE] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#2C221E]/60 dark:text-[#EDE6DE]/60 p-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-[#D96B43]" />
              <span>Analyzing mycology data and literature...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="px-4 py-2 border-t border-[#2C221E]/10 dark:border-[#EDE6DE]/10 bg-[#FAF7F0] dark:bg-[#151A16] overflow-x-auto">
          <div className="flex items-center gap-2 w-max">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 text-[11px] rounded-md bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 text-[#2C221E]/80 dark:text-[#EDE6DE]/80 hover:bg-[#EAE6DC] dark:hover:bg-[#2C342D] transition-colors whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Image Preview Thumbnail if selected */}
        {selectedImage && (
          <div className="flex items-center justify-between px-4 py-2 bg-[#EAE6DC]/60 dark:bg-[#191F1A] border-t border-[#2C221E]/10 dark:border-[#EDE6DE]/10 text-xs">
            <div className="flex items-center gap-2">
              <img src={selectedImage} alt="Preview" className="w-8 h-8 rounded object-cover border" />
              <span className="text-[#2C221E] dark:text-[#EDE6DE] font-medium">Specimen photo attached</span>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="text-[#A23B2A] hover:underline"
            >
              Remove
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white dark:bg-[#191F1A] border-t border-[#2C221E]/10 dark:border-[#EDE6DE]/10 flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-xl bg-[#FAF7F0] dark:bg-[#151A16] text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#D96B43] dark:hover:text-[#E09F3E] hover:bg-[#EAE6DC] transition-colors"
            title="Upload Mushroom Photo for Diagnosis"
          >
            <Camera className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Ask about mushroom biology, pasteurization, or upload a photo..."
            className="flex-1 px-4 py-2 text-xs sm:text-sm rounded-xl bg-[#FAF7F0] dark:bg-[#151A16] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 text-[#2C221E] dark:text-[#EDE6DE] focus:outline-none focus:ring-2 focus:ring-[#D96B43]/30 placeholder:text-[#2C221E]/40 dark:placeholder:text-[#EDE6DE]/40"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || (!inputPrompt.trim() && !selectedImage)}
            className="p-2.5 rounded-xl bg-[#D96B43] hover:bg-[#c25a34] dark:bg-[#E09F3E] dark:hover:bg-[#ca892e] text-white dark:text-[#121613] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* User Privacy & Consent Modal */}
        {showConsentModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md p-6 rounded-2xl bg-[#F7F4EC] dark:bg-[#151A16] border border-[#2C221E]/20 dark:border-[#EDE6DE]/20 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-[#D96B43] dark:text-[#E09F3E] font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>User Consent & Image Privacy Notice</span>
              </div>

              <p className="text-xs sm:text-sm text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                Before uploading and analyzing your mushroom photograph, please confirm your consent. Your image is processed securely for optical botanical feature detection and diagnosis.
              </p>

              <div className="p-3 rounded-lg bg-[#A23B2A]/10 border border-[#A23B2A]/20 text-[#A23B2A] dark:text-[#f87171] text-xs">
                <strong>Critical Foraging Advisory:</strong> AI image analysis is for educational inquiry only. Never consume wild mushrooms based on photo analysis.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowConsentModal(false);
                    setSelectedImage(null);
                    setPendingImageAnalysis(false);
                  }}
                  className="px-3.5 py-1.5 text-xs rounded-lg text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:bg-[#EAE6DC]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmConsent}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#D96B43] text-white hover:bg-[#c25a34]"
                >
                  I Consent & Analyze
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
