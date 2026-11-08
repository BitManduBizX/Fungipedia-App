import React, { useState, useMemo } from 'react';
import { SPECIES_CATALOG } from '../data/speciesData';
import { MushroomSpecies, EdibilityStatus } from '../types/mycology';
import { Search, ShieldAlert, Sparkles, DollarSign, Bookmark, BookmarkCheck, X, AlertOctagon, CheckCircle2, Info } from 'lucide-react';

interface SpeciesCatalogProps {
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  currency: 'USD' | 'NPR' | 'EUR' | 'INR';
  onChangeCurrency: (currency: 'USD' | 'NPR' | 'EUR' | 'INR') => void;
}

export const SpeciesCatalog: React.FC<SpeciesCatalogProps> = ({
  bookmarkedIds,
  onToggleBookmark,
  currency,
  onChangeCurrency,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'edible' | 'medicinal' | 'toxic'>('all');
  const [activeModalSpecies, setActiveModalSpecies] = useState<MushroomSpecies | null>(null);

  const filteredSpecies = useMemo(() => {
    return SPECIES_CATALOG.filter((s) => {
      // Search matching
      const matchesSearch =
        s.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.nepaliName && s.nepaliName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        s.family.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Filter category
      if (selectedFilter === 'edible') return s.edibility === 'choice_edible' || s.edibility === 'edible';
      if (selectedFilter === 'medicinal') return s.edibility === 'medicinal';
      if (selectedFilter === 'toxic') return s.edibility === 'toxic' || s.edibility === 'deadly';
      return true;
    });
  }, [searchQuery, selectedFilter]);

  const getPriceDisplay = (species: MushroomSpecies) => {
    if (species.commercialPricePerKgUSD === 0) return 'Non-Commercial';
    switch (currency) {
      case 'NPR':
        return `NPR रू ${species.commercialPricePerKgNPR.toLocaleString()}/kg`;
      case 'EUR':
        return `€${species.commercialPricePerKgEUR.toLocaleString()}/kg`;
      case 'INR':
        return `₹${species.commercialPricePerKgINR.toLocaleString()}/kg`;
      case 'USD':
      default:
        return `$${species.commercialPricePerKgUSD.toLocaleString()}/kg`;
    }
  };

  const getEdibilityBadge = (status: EdibilityStatus, label: string) => {
    if (status === 'choice_edible' || status === 'edible') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B5A10] dark:text-[#E09F3E]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{label}</span>
        </span>
      );
    }
    if (status === 'medicinal') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B6960] dark:text-[#64A377]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{label}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#A23B2A] dark:text-[#f87171]">
        <AlertOctagon className="w-3.5 h-3.5" />
        <span>{label}</span>
      </span>
    );
  };

  return (
    <section id="species" className="py-14 sm:py-20 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold text-[#D96B43] dark:text-[#E09F3E] tracking-wider uppercase">
            Chapter 03 · Taxonomy & Market Economics
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C221E] dark:text-[#EDE6DE] mt-1.5" style={{ textWrap: 'balance' }}>
            Species Encyclopedia & 1kg Market Rates
          </h2>
          <p className="text-sm sm:text-base text-[#2C221E]/75 dark:text-[#EDE6DE]/75 mt-2">
            Explore popular gourmet varieties, sacred Himalayan medicinals, and hazardous wild lookalikes. View wholesale market rates across USD, Nepalese Rupee (NPR), EUR, and INR.
          </p>
        </div>

        {/* Filter & Currency Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C221E]/40 dark:text-[#EDE6DE]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by common, Latin, or Nepali name..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-white dark:bg-[#191F1A] border border-[#2C221E]/15 dark:border-[#EDE6DE]/15 text-[#2C221E] dark:text-[#EDE6DE] focus:outline-none focus:ring-2 focus:ring-[#D96B43]/30 transition-all placeholder:text-[#2C221E]/40 dark:placeholder:text-[#EDE6DE]/40"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1 p-1 bg-[#EAE6DC] dark:bg-[#191F1A] rounded-lg border border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedFilter === 'all'
                    ? 'bg-white dark:bg-[#2C342D] text-[#2C221E] dark:text-white shadow-sm'
                    : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white'
                }`}
              >
                All Species
              </button>
              <button
                onClick={() => setSelectedFilter('edible')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedFilter === 'edible'
                    ? 'bg-white dark:bg-[#2C342D] text-[#2C221E] dark:text-white shadow-sm'
                    : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white'
                }`}
              >
                Gourmet Edibles
              </button>
              <button
                onClick={() => setSelectedFilter('medicinal')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedFilter === 'medicinal'
                    ? 'bg-white dark:bg-[#2C342D] text-[#2C221E] dark:text-white shadow-sm'
                    : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white'
                }`}
              >
                Medicinal
              </button>
              <button
                onClick={() => setSelectedFilter('toxic')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedFilter === 'toxic'
                    ? 'bg-white dark:bg-[#2C342D] text-[#2C221E] dark:text-white shadow-sm'
                    : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white'
                }`}
              >
                Toxic Alert
              </button>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 text-xs bg-[#EAE6DC] dark:bg-[#191F1A] p-1 rounded-lg border border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
              <span className="px-2 text-[#2C221E]/60 dark:text-[#EDE6DE]/60">Currency:</span>
              {(['USD', 'NPR', 'EUR', 'INR'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onChangeCurrency(curr)}
                  className={`px-2 py-1 rounded font-medium transition-colors ${
                    currency === curr
                      ? 'bg-[#2C221E] text-white dark:bg-[#EDE6DE] dark:text-[#121613]'
                      : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:text-[#2C221E] dark:hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecies.map((species) => {
            const isBookmarked = bookmarkedIds.includes(species.id);
            const isDeadly = species.edibility === 'deadly' || species.edibility === 'toxic';

            return (
              <div
                key={species.id}
                className={`group flex flex-col justify-between p-5 rounded-xl transition-all duration-200 border ${
                  isDeadly
                    ? 'bg-[#FFF8F7] dark:bg-[#211616] border-[#A23B2A]/30 hover:border-[#A23B2A]/60'
                    : 'bg-white dark:bg-[#191F1A] border-[#2C221E]/10 dark:border-[#EDE6DE]/10 hover:border-[#D96B43]/40 dark:hover:border-[#E09F3E]/40 hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  {/* Top metadata line (clean unboxed text per Section 1.A) */}
                  <div className="flex items-center justify-between gap-2">
                    {getEdibilityBadge(species.edibility, species.edibilityLabel)}

                    <button
                      onClick={() => onToggleBookmark(species.id)}
                      className="p-1.5 rounded-md hover:bg-[#EAE6DC]/60 dark:hover:bg-[#2C342D] text-[#2C221E]/50 dark:text-[#EDE6DE]/50 hover:text-[#D96B43] transition-colors"
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark to Journal'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-[#D96B43] fill-current" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-[#2C221E] dark:text-[#EDE6DE] group-hover:text-[#D96B43] dark:group-hover:text-[#E09F3E] transition-colors">
                      {species.commonName}
                    </h3>
                    <p className="text-xs italic font-serif text-[#2C221E]/60 dark:text-[#EDE6DE]/60">
                      {species.scientificName}
                      {species.nepaliName && <span> · {species.nepaliName}</span>}
                    </p>
                  </div>

                  <p className="text-xs text-[#2C221E]/75 dark:text-[#EDE6DE]/75 line-clamp-2 leading-relaxed">
                    {species.description}
                  </p>

                  {/* Clean unboxed key metadata */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#2C221E]/60 dark:text-[#EDE6DE]/60 pt-2 border-t border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
                    <span>Spores: {species.sporePrintColor}</span>
                    <span aria-hidden="true">·</span>
                    <span>{species.family}</span>
                  </div>
                </div>

                {/* Bottom Card Footer: 1kg Price + Inspect Button */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-[#2C221E]/10 dark:border-[#EDE6DE]/10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#2C221E]/60 dark:text-[#EDE6DE]/60 block">
                      1kg Market Rate
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold tabular-nums text-[#2C221E] dark:text-[#EDE6DE]">
                      {getPriceDisplay(species)}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveModalSpecies(species)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#EAE6DC] dark:bg-[#2C342D] text-[#2C221E] dark:text-[#EDE6DE] hover:bg-[#D96B43] hover:text-white dark:hover:bg-[#E09F3E] dark:hover:text-[#121613] transition-colors whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Species Detail Modal */}
        {activeModalSpecies && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#F7F4EC] dark:bg-[#151A16] border border-[#2C221E]/20 dark:border-[#EDE6DE]/20 p-6 sm:p-8 shadow-2xl space-y-6">
              <button
                onClick={() => setActiveModalSpecies(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-[#2C221E]/60 dark:text-[#EDE6DE]/60 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 pr-8">
                <div className="flex items-center gap-2">
                  {getEdibilityBadge(activeModalSpecies.edibility, activeModalSpecies.edibilityLabel)}
                  <span className="text-xs text-[#2C221E]/60 dark:text-[#EDE6DE]/60">·</span>
                  <span className="text-xs text-[#2C221E]/60 dark:text-[#EDE6DE]/60">{activeModalSpecies.family}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                  {activeModalSpecies.commonName}
                </h3>
                <p className="text-sm italic font-serif text-[#D96B43] dark:text-[#E09F3E]">
                  {activeModalSpecies.scientificName} {activeModalSpecies.nepaliName && `(${activeModalSpecies.nepaliName})`}
                </p>
              </div>

              <p className="text-sm text-[#2C221E]/85 dark:text-[#EDE6DE]/85 leading-relaxed">
                {activeModalSpecies.description}
              </p>

              {/* Economic & Growth Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#EAE6DC]/60 dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 text-xs">
                <div>
                  <span className="text-[#2C221E]/60 dark:text-[#EDE6DE]/60 block">Market Rate (1kg)</span>
                  <strong className="font-mono tabular-nums text-[#2C221E] dark:text-[#EDE6DE]">
                    {getPriceDisplay(activeModalSpecies)}
                  </strong>
                </div>
                <div>
                  <span className="text-[#2C221E]/60 dark:text-[#EDE6DE]/60 block">Yield per Bag</span>
                  <strong className="font-mono tabular-nums text-[#2C221E] dark:text-[#EDE6DE]">
                    {activeModalSpecies.yieldPerBagKg > 0 ? `${activeModalSpecies.yieldPerBagKg} kg` : 'Wild Harvest'}
                  </strong>
                </div>
                <div>
                  <span className="text-[#2C221E]/60 dark:text-[#EDE6DE]/60 block">Spore Print</span>
                  <strong className="text-[#2C221E] dark:text-[#EDE6DE]">{activeModalSpecies.sporePrintColor}</strong>
                </div>
                <div>
                  <span className="text-[#2C221E]/60 dark:text-[#EDE6DE]/60 block">Season</span>
                  <strong className="text-[#2C221E] dark:text-[#EDE6DE]">{activeModalSpecies.fruitingSeason}</strong>
                </div>
              </div>

              {/* Health Benefits & Key Compounds */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A7C59] dark:text-[#64A377]">
                  Health Benefits & Bioactive Compounds
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalSpecies.keyCompounds.map((c, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 text-[#2C221E] dark:text-[#EDE6DE]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <ul className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 space-y-1 list-disc pl-4">
                  {activeModalSpecies.healthBenefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              {/* Lookalikes & Cautionary Note */}
              <div className="p-4 rounded-xl bg-[#A23B2A]/10 border border-[#A23B2A]/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#A23B2A] dark:text-[#f87171]">
                  <AlertOctagon className="w-4 h-4 shrink-0" />
                  <span>Lookalikes & Cautionary Advisories</span>
                </div>
                <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                  <strong>Dangerous Lookalikes:</strong> {activeModalSpecies.lookalikes.join(', ')}
                </p>
                <p className="text-xs text-[#2C221E]/80 dark:text-[#EDE6DE]/80 leading-relaxed">
                  {activeModalSpecies.cautionaryNotes}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveModalSpecies(null)}
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#2C221E] text-white dark:bg-[#EDE6DE] dark:text-[#121613] hover:opacity-90 transition-opacity"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
