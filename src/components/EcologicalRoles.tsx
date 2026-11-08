import React from 'react';
import { Network, Recycle, Shield, Box } from 'lucide-react';

export const EcologicalRoles: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10 bg-[#FAF7F0] dark:bg-[#151A16] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold text-[#4A7C59] dark:text-[#64A377] tracking-wider uppercase">
            Chapter 05 · Planetary Ecology & Biotechnology
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C221E] dark:text-[#EDE6DE] mt-1.5" style={{ textWrap: 'balance' }}>
            Ecological Stewardship & The Wood-Wide Web
          </h2>
          <p className="text-sm sm:text-base text-[#2C221E]/75 dark:text-[#EDE6DE]/75 mt-2">
            Fungi are the ecological architects of planet Earth. From inter-forest communication conduits to plastic-digesting bioremediation enzymes, discover their indispensable biosphere functions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: The Wood-Wide Web */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#191F1A] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#4A7C59]/15 text-[#4A7C59] flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-[#2C221E] dark:text-[#EDE6DE]">
              The Wood-Wide Web (Mycorrhiza)
            </h3>
            <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
              Over 90% of land plants form mycorrhizal partnerships. Fungal hyphae act as biological fiber-optic cables, trading phosphorus and water in exchange for 20% of the trees' photosynthetic carbon, and even routing alarm signals when pests attack neighboring trees!
            </p>
          </div>

          {/* Card 2: Lignin Recyclers */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#191F1A] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#D96B43]/15 text-[#D96B43] flex items-center justify-center">
              <Recycle className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-[#2C221E] dark:text-[#EDE6DE]">
              Saprophytic Nutrient Recyclers
            </h3>
            <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
              Lignin is the rigid polymer that gives wood its strength; almost no bacteria on Earth can digest it. Without white-rot and brown-rot fungi secreting oxidative laccase enzymes, forests would remain buried beneath hundreds of feet of fallen, undecayed logs.
            </p>
          </div>

          {/* Card 3: Mycoremediation */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#191F1A] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#3B6960]/15 text-[#3B6960] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-[#2C221E] dark:text-[#EDE6DE]">
              Mycoremediation of Toxins
            </h3>
            <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
              Pioneered by mycologists like Paul Stamets, fungal strains such as <em>Pleurotus ostreatus</em> dismantle the resilient carbon-hydrogen bonds in petroleum oil spills, pesticides, and polyurethane plastics, transforming toxic pollutants into harmless fungal sugars.
            </p>
          </div>

          {/* Card 4: Fungal Biomaterials */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#191F1A] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#E09F3E]/15 text-[#E09F3E] flex items-center justify-center">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-[#2C221E] dark:text-[#EDE6DE]">
              Mycomaterials & Sustainable Packaging
            </h3>
            <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
              Inoculated agricultural husks grow into rigid molds within 5 days, forming fire-resistant, water-repellent, 100% compostable alternatives to styrofoam, acoustic wall tiles, and cruelty-free vegan mycelium leather (Mylo).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
