export type EdibilityStatus = 'choice_edible' | 'edible' | 'medicinal' | 'inedible' | 'toxic' | 'deadly';

export interface MushroomSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  nepaliName?: string;
  family: string;
  order: string;
  edibility: EdibilityStatus;
  edibilityLabel: string;
  flavorProfile: string;
  sporePrintColor: string;
  habitat: string;
  fruitingSeason: string;
  commercialPricePerKgUSD: number; // in USD
  commercialPricePerKgNPR: number; // in Nepalese Rupee
  commercialPricePerKgEUR: number; // in EUR
  commercialPricePerKgINR: number; // in INR
  yieldPerBagKg: number;
  healthBenefits: string[];
  keyCompounds: string[];
  lookalikes: string[];
  cautionaryNotes: string;
  description: string;
  imageUrl?: string;
}

export interface AnatomyPart {
  id: string;
  name: string;
  scientificTerm: string;
  pronunciation: string;
  description: string;
  function: string;
  microscopicDetail: string;
  colorHex: string;
  cx: number;
  cy: number;
  labelX: number;
  labelY: number;
}

export interface CultivationStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  optimalTemp: string;
  humidity: string;
  explanation: string;
  criticalDetail: string; // e.g. Why hay is boiled
  proTip: string;
}

export interface GrowLogEntry {
  id: string;
  speciesName: string;
  substrateType: string;
  inoculationDate: string;
  pinningDate?: string;
  harvestDate?: string;
  temperatureC: number;
  humidityPercent: number;
  yieldGrams: number;
  notes: string;
  status: 'colonizing' | 'pinning' | 'fruiting' | 'harvested' | 'contaminated';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isDiagnosis?: boolean;
  imagePreview?: string;
  isFallback?: boolean;
}

export interface UserPreferences {
  currency: 'USD' | 'NPR' | 'EUR' | 'INR';
  tempUnit: 'C' | 'F';
  experienceLevel: 'beginner' | 'forager' | 'commercial' | 'scientist';
  displayName: string;
  email?: string;
}
