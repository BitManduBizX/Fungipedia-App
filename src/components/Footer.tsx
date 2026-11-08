import React from 'react';
import { AlertTriangle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EAE6DC]/80 dark:bg-[#0E120F] text-[#2C221E] dark:text-[#EDE6DE] border-t border-[#2C221E]/10 dark:border-[#EDE6DE]/10 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Strict Foraging Safety Banner */}
        <div className="p-4 rounded-xl bg-[#A23B2A]/10 border border-[#A23B2A]/20 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-[#A23B2A] shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
            <strong>Critical Foraging Safety Notice:</strong> Never ingest any wild mushroom based solely on photographs, AI optical diagnosis, or digital guides. Deadly species (such as <em>Amanita phalloides</em>) possess deceptive lookalikes that can cause fatal organ failure. Always verify physical specimens with an accredited local mycologist and spore print analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#D96B43] flex items-center justify-center text-white text-sm font-bold">
                🍄
              </span>
              <span className="font-display font-bold text-lg text-[#2C221E] dark:text-[#EDE6DE]">
                Fungipedia
              </span>
            </div>
            <p className="text-[#2C221E]/70 dark:text-[#EDE6DE]/70 leading-relaxed">
              The living open encyclopedia of mycology, mushroom biology, global cultivation science, and Nepal agricultural empowerment.
            </p>
          </div>

          {/* Quick Sections */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-[#2C221E] dark:text-[#EDE6DE]">
              Knowledge Hubs
            </h4>
            <ul className="space-y-1.5 text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
              <li><a href="#biology" className="hover:text-[#D96B43] dark:hover:text-[#E09F3E]">Cellular Biology & Chitin</a></li>
              <li><a href="#anatomy" className="hover:text-[#D96B43] dark:hover:text-[#E09F3E]">Interactive Botanical Anatomy</a></li>
              <li><a href="#species" className="hover:text-[#D96B43] dark:hover:text-[#E09F3E]">Species & 1kg Market Rates</a></li>
              <li><a href="#cultivation" className="hover:text-[#D96B43] dark:hover:text-[#E09F3E]">Pasteurization & Nepal Farming</a></li>
              <li><a href="#kids" className="hover:text-[#D96B43] dark:hover:text-[#E09F3E]">Kids Corner & Junior Quiz</a></li>
            </ul>
          </div>

          {/* Scientific Citations & Acknowledgments */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-[#2C221E] dark:text-[#EDE6DE]">
              Research & Regional Citations
            </h4>
            <ul className="space-y-1.5 text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
              <li>National Mushroom Development Centre (NMDC), Balambu</li>
              <li>Ministry of Agriculture & Livestock Development, Nepal</li>
              <li>FAO Mushroom Cultivation Technical Guidelines</li>
              <li>Paul Stamets: <em>Mycelium Running</em> & <em>Growing Gourmet Fungi</em></li>
            </ul>
          </div>

          {/* Technical Specs */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-[#2C221E] dark:text-[#EDE6DE]">
              Technology & Access
            </h4>
            <p className="text-[#2C221E]/70 dark:text-[#EDE6DE]/70 leading-relaxed">
              Powered by Gemini 3.8 Flash multimodal API with offline-first client storage and zero-crash fault-tolerant fallbacks.
            </p>
            <div className="pt-2 text-[11px] text-[#2C221E]/50 dark:text-[#EDE6DE]/50">
              Offline Cache Ready · Accessible UI
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#2C221E]/10 dark:border-[#EDE6DE]/10 text-xs text-[#2C221E]/60 dark:text-[#EDE6DE]/60">
          <div>
            © {new Date().getFullYear()} Fungipedia (MycoVerse). Educational & Open Scientific Compendium.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted for curious minds & commercial growers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
