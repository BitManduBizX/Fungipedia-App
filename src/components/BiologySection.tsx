import React, { useState } from 'react';
import { ShieldCheck, Heart, Zap, Sparkles, Brain, Dna, CheckCircle2 } from 'lucide-react';

export const BiologySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'what-is' | 'nutrition' | 'health' | 'taxonomy'>('what-is');

  return (
    <section id="biology" className="py-14 sm:py-20 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold text-[#4A7C59] dark:text-[#64A377] tracking-wider uppercase">
            Chapter 01 · Fungal Science & Cellular Architecture
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C221E] dark:text-[#EDE6DE] mt-1.5" style={{ textWrap: 'balance' }}>
            What is a Mushroom? Biology, Nutrition & Health Science
          </h2>
          <p className="text-sm sm:text-base text-[#2C221E]/75 dark:text-[#EDE6DE]/75 mt-2">
            Neither plants nor animals, fungi constitute their own kingdom of eukaryotic life. Discover their unique chitin cell walls, nutrient density, and scientifically proven medicinal compounds.
          </p>
        </div>

        {/* Interactive Segmented Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EAE6DC] dark:bg-[#191F1A] rounded-xl border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 mb-8 max-w-fit">
          <button
            onClick={() => setActiveTab('what-is')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'what-is'
                ? 'bg-white dark:bg-[#2C342D] text-[#2C221E] dark:text-white shadow-sm'
                : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white'
            }`}
          >
            What is a Mushroom?
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'nutrition'
                ? 'bg-white dark:bg-[#2C342D] text-[#2C221E] dark:text-white shadow-sm'
                : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white'
            }`}
          >
            What's Inside? (Nutrition)
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'health'
                ? 'bg-white dark:bg-[#2C342D] text-[#2C221E] dark:text-white shadow-sm'
                : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white'
            }`}
          >
            Health Benefits & Medicine
          </button>
          <button
            onClick={() => setActiveTab('taxonomy')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'taxonomy'
                ? 'bg-white dark:bg-[#2C342D] text-[#2C221E] dark:text-white shadow-sm'
                : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white'
            }`}
          >
            Scientific Taxonomy
          </button>
        </div>

        {/* Tab 1: What is a Mushroom? */}
        {activeTab === 'what-is' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#EAE6DC]/60 dark:bg-[#191F1A]/70 border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#D96B43]/15 text-[#D96B43] flex items-center justify-center font-bold">
                🍎
              </div>
              <h3 className="font-display text-lg font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                The Fruiting Body of an Invisible Organism
              </h3>
              <p className="text-xs sm:text-sm text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                Just as an apple is the fruit of an apple tree, a mushroom is the transient reproductive organ of a vast underground fungal web called <strong>mycelium</strong>. The mushroom emerges purely to manufacture and broadcast millions of spores into passing wind currents.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#EAE6DC]/60 dark:bg-[#191F1A]/70 border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#4A7C59]/15 text-[#4A7C59] flex items-center justify-center font-bold">
                🦞
              </div>
              <h3 className="font-display text-lg font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                Chitin Cell Walls (Like Lobster Shells!)
              </h3>
              <p className="text-xs sm:text-sm text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                Unlike plants, which construct rigid walls out of cellulose, fungi build their cell walls with <strong>chitin</strong>—the same tough, fibrous structural polymer found in crustacean shells and insect exoskeletons! This is why cooking mushrooms gently tenderizes them without turning them to mush.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#EAE6DC]/60 dark:bg-[#191F1A]/70 border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#E09F3E]/15 text-[#E09F3E] flex items-center justify-center font-bold">
                🧪
              </div>
              <h3 className="font-display text-lg font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                External Digestion (Absorptive Heterotrophy)
              </h3>
              <p className="text-xs sm:text-sm text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                Fungi do not photosynthesize sunlight. Instead, they secrete potent digestive enzymes (cellulases and laccases) directly into their surrounding soil, straw, or dead wood, digesting complex polymers externally and absorbing the dissolved nutrients directly through hyphae walls.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Nutritional Breakdown */}
        {activeTab === 'nutrition' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 p-6 rounded-xl bg-[#EAE6DC]/70 dark:bg-[#191F1A]/80 border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-4">
              <h3 className="font-display text-xl font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                Nutritional Profile (per 100g Fresh Raw)
              </h3>
              <p className="text-xs sm:text-sm text-[#2C221E]/80 dark:text-[#EDE6DE]/80">
                Mushrooms are exceptionally nutrient-dense yet low in calories, making them an ideal dietary staple worldwide.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs sm:text-sm pb-1.5 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
                  <span className="font-medium text-[#2C221E] dark:text-[#EDE6DE]">Energy</span>
                  <span className="font-mono tabular-nums text-[#2C221E]/70 dark:text-[#EDE6DE]/70">22 kcal (92 kJ)</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm pb-1.5 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
                  <span className="font-medium text-[#2C221E] dark:text-[#EDE6DE]">Crude Protein (Dry Weight)</span>
                  <span className="font-mono tabular-nums font-semibold text-[#4A7C59] dark:text-[#64A377]">20% – 35%</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm pb-1.5 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
                  <span className="font-medium text-[#2C221E] dark:text-[#EDE6DE]">Dietary Fiber (Chitin & Beta-Glucan)</span>
                  <span className="font-mono tabular-nums text-[#2C221E]/70 dark:text-[#EDE6DE]/70">2.2 g</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm pb-1.5 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
                  <span className="font-medium text-[#2C221E] dark:text-[#EDE6DE]">Total Fats & Cholesterol</span>
                  <span className="font-mono tabular-nums font-semibold text-[#D96B43]">0.3 g (0 mg Chol)</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm pb-1.5 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
                  <span className="font-medium text-[#2C221E] dark:text-[#EDE6DE]">Potassium (Electrolyte)</span>
                  <span className="font-mono tabular-nums text-[#2C221E]/70 dark:text-[#EDE6DE]/70">318 mg (More than bananas!)</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-medium text-[#2C221E] dark:text-[#EDE6DE]">Selenium (Antioxidant Trace Mineral)</span>
                  <span className="font-mono tabular-nums text-[#2C221E]/70 dark:text-[#EDE6DE]/70">9.3 mcg (17% DV)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-2">
                <span className="font-mono text-xs font-semibold text-[#4A7C59]">MICRO-01</span>
                <h4 className="font-semibold text-sm sm:text-base text-[#2C221E] dark:text-[#EDE6DE]">
                  Natural Vitamin D2 Synthesis
                </h4>
                <p className="text-xs text-[#2C221E]/75 dark:text-[#EDE6DE]/75 leading-relaxed">
                  Mushrooms contain ergosterol in their cellular membranes. When placed under natural sunlight or UV light for just 15 minutes, ergosterol converts into bioavailable Vitamin D2!
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-2">
                <span className="font-mono text-xs font-semibold text-[#D96B43]">MICRO-02</span>
                <h4 className="font-semibold text-sm sm:text-base text-[#2C221E] dark:text-[#EDE6DE]">
                  Ergothioneine & Glutathione
                </h4>
                <p className="text-xs text-[#2C221E]/75 dark:text-[#EDE6DE]/75 leading-relaxed">
                  Dr. Robert Beelman at Penn State discovered that mushrooms are by far the richest dietary source of ergothioneine—a master antioxidant that travels directly into mitochondria to protect DNA.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-2">
                <span className="font-mono text-xs font-semibold text-[#E09F3E]">MICRO-03</span>
                <h4 className="font-semibold text-sm sm:text-base text-[#2C221E] dark:text-[#EDE6DE]">
                  All Essential Amino Acids
                </h4>
                <p className="text-xs text-[#2C221E]/75 dark:text-[#EDE6DE]/75 leading-relaxed">
                  Unlike many plant proteins which lack lysine or methionine, mushroom protein provides all 9 essential amino acids, serving as an exceptional sustainable alternative to animal meat.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-2">
                <span className="font-mono text-xs font-semibold text-[#3B6960]">MICRO-04</span>
                <h4 className="font-semibold text-sm sm:text-base text-[#2C221E] dark:text-[#EDE6DE]">
                  Low Glycemic Prebiotic Fiber
                </h4>
                <p className="text-xs text-[#2C221E]/75 dark:text-[#EDE6DE]/75 leading-relaxed">
                  The indigestible chitin and beta-glucan fibers survive human stomach acid and reach the colon intact, where they selectively nourish beneficial Bifidobacteria and Akkermansia microbes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Health Benefits & Scientific Medicine */}
        {activeTab === 'health' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-[#EAE6DC]/60 dark:bg-[#191F1A]/70 border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#4A7C59]/15 text-[#4A7C59] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                Immune Modulation
              </h3>
              <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                Beta-D-glucans bind to Dectin-1 receptors on human macrophage and dendritic cells, "training" white blood cells to detect and neutralize viral invaders without causing autoimmune overreactions.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#EAE6DC]/60 dark:bg-[#191F1A]/70 border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#D96B43]/15 text-[#D96B43] flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                Brain & Neurogenesis
              </h3>
              <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                Hericenones and erinacines isolated from Lion's Mane cross the blood-brain barrier and trigger Nerve Growth Factor (NGF) synthesis, promoting hippocampus axon branching and memory clarity.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#EAE6DC]/60 dark:bg-[#191F1A]/70 border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#E09F3E]/15 text-[#E09F3E] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                Cellular Energy & ATP
              </h3>
              <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                Himalayan Cordyceps contains cordycepin and adenosine, which promote cellular ATP regeneration, improve oxygen utilization in lungs, and enhance cardiovascular stamina.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#EAE6DC]/60 dark:bg-[#191F1A]/70 border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#3B6960]/15 text-[#3B6960] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                Cardiovascular Health
              </h3>
              <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                Oyster mushrooms naturally synthesize lovastatin, which inhibits HMG-CoA reductase to balance LDL cholesterol, while Shiitake's eritadenine prevents arterial plaque adhesion.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Scientific Taxonomy Explorer */}
        {activeTab === 'taxonomy' && (
          <div className="p-6 rounded-xl bg-[#EAE6DC]/60 dark:bg-[#191F1A]/70 border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-6">
            <div>
              <h3 className="font-display text-xl font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                The Seven Taxonomic Tiers of Mycology
              </h3>
              <p className="text-xs sm:text-sm text-[#2C221E]/75 dark:text-[#EDE6DE]/75 mt-1">
                Fungi branched away from plants over 1 billion years ago. Here is how modern mycology classifies species from Domain to Species:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#D96B43]">TIER 1 · KINGDOM</div>
                <h4 className="font-bold text-sm text-[#2C221E] dark:text-[#EDE6DE]">Fungi</h4>
                <p className="text-xs text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
                  Eukaryotic, non-vascular organisms lacking chlorophyll; cell walls composed of glucans and chitin.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#4A7C59]">TIER 2 · PHYLUM</div>
                <h4 className="font-bold text-sm text-[#2C221E] dark:text-[#EDE6DE]">Basidiomycota vs Ascomycota</h4>
                <p className="text-xs text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
                  Basidiomycetes produce spores externally on microscopic clubs (basidia). Ascomycetes (Morels, Truffles) produce spores inside microscopic sacs (asci).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#E09F3E]">TIER 3 · ORDER</div>
                <h4 className="font-bold text-sm text-[#2C221E] dark:text-[#EDE6DE]">Agaricales (Gilled Fungi)</h4>
                <p className="text-xs text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
                  Contains the classic umbrella-capped mushrooms, comprising over 33 families and 4,000 described species.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#3B6960]">TIER 4 · BINOMIAL</div>
                <h4 className="font-bold text-sm text-[#2C221E] dark:text-[#EDE6DE]">Genus + Species</h4>
                <p className="text-xs text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
                  Example: <em>Pleurotus ostreatus</em> (Oyster) or <em>Agaricus bisporus</em> (Button). Always italicized in scientific literature.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
