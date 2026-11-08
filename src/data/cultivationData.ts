import { CultivationStep } from '../types/mycology';

export const CULTIVATION_WORKFLOW: CultivationStep[] = [
  {
    stepNumber: 1,
    title: 'Substrate Preparation & Pasteurization',
    subtitle: 'Why Straw is Boiled, Not Autoclaved',
    duration: '24–36 Hours',
    optimalTemp: 'Pasteurize at 65°C–75°C (149°F–167°F)',
    humidity: 'Target Moisture: 65%–70% (Field Capacity)',
    explanation:
      'Agricultural byproducts like golden wheat straw or paddy rice straw are chopped into 2–3 inch segments to break down the natural waxy silica cuticle and expose the cellulose and lignin to the fungal enzymes.',
    criticalDetail:
      'CRITICAL REASON WHY STRAW IS BOILED: Full autoclaving (121°C) creates a completely sterile biological vacuum where rogue mold spores (Trichoderma) land and instantly colonize without resistance. Boiling/steeping at 65°C–75°C for 60–90 minutes PASTEURIZES instead: it eradicates competitor molds, nematodes, and insect larvae while leaving behind dormant beneficial thermophilic bacteria (Bacillus spp.). These friendly bacteria act as a biological immune shield protecting the fresh straw while your mushroom mycelium takes over!',
    proTip:
      'Squeeze Test: Grab a handful of cooled pasteurized straw and squeeze firmly. Only 1 to 2 drops of water should squeeze between your knuckles. If it streams water, it is too wet and will encourage anaerobic sour rot.',
  },
  {
    stepNumber: 2,
    title: 'Inoculation & Spawning',
    subtitle: 'Layering Grain Spawn into Cylindrical Blocks',
    duration: '1–2 Hours',
    optimalTemp: 'Substrate cooled below 28°C (82°F)',
    humidity: 'Work in clean, draft-free room',
    explanation:
      'Colonized sterile grain spawn (millet, rye, or wheat coated with pure white mycelium) is introduced to the cooled substrate. In Nepal and global farms, clean perforated polythene bags (typically 12" x 24") are packed firmly.',
    criticalDetail:
      'Layering Method: Create alternating 3-inch layers of packed straw, sprinkling 2–3% grain spawn by dry weight along the outer edges where oxygen access is highest. Pack tightly to eliminate dry air pockets where mold spores might stagnate.',
    proTip:
      'Never spawn warm substrate! Even if the outside of the straw feels warm, the core can retain 40°C heat, which will fatally cook and kill the delicate mycelial hyphae.',
  },
  {
    stepNumber: 3,
    title: 'Incubation (Spawn Run)',
    subtitle: 'Mycelial Colonization in Complete Darkness',
    duration: '15–21 Days',
    optimalTemp: '22°C–25°C (71°F–77°F)',
    humidity: 'Ambient 60%–70% (Retained inside bag)',
    explanation:
      'The bagged cylinders are arranged on bamboo racks in a dark incubation room. The fungal hyphae branch out rapidly, consuming cellulose and weaving a solid, fragrant white block that binds the straw together.',
    criticalDetail:
      'High CO2 Tolerance: During incubation, mycelium thrives under high carbon dioxide levels (>5,000 ppm) mimicking underground subterranean conditions. Minimal fresh air ventilation is needed during this vegetative phase.',
    proTip:
      'Inspect bags daily without handling roughly. Healthy mycelium is snow-white and smells sweet like fresh forest soil. Any emerald green or black patch must be moved to quarantine immediately.',
  },
  {
    stepNumber: 4,
    title: 'Fruiting Induction (Pinning)',
    subtitle: 'Shifting Climate to Trigger Fruiting Bodies',
    duration: '4–7 Days',
    optimalTemp: '16°C–20°C (Oyster/Button) / 22°C–26°C (Pink/Warm Oyster)',
    humidity: '85%–95% Relative Humidity (Fine Mist)',
    explanation:
      'Once the block is 100% white, make 4–8 criss-cross slits (X-cuts) in the plastic bag. The mycelium senses fresh air, drops in CO2, light exposure, and humidity, triggering primordial knot formation (pinheads).',
    criticalDetail:
      'The 3 Fruiting Triggers: (1) Fresh Air Exchange (FAE) dropping CO2 to <1,000 ppm, (2) Light exposure (10–12 hours of indirect 6,500K daylight), and (3) Sustained relative humidity (90% misting) so micro-droplets do not dry out delicate pins.',
    proTip:
      'Never spray heavy water droplets directly onto baby pinheads! Use a fine atomizer or ultrasonic misting system. Standing water pools on pins cause yellow bacterial blotch rot.',
  },
  {
    stepNumber: 5,
    title: 'Harvest & Flush Cycling',
    subtitle: 'Twist & Pull Harvest, Followed by 2nd & 3rd Flushes',
    duration: 'Harvest on Day 5–7 of Fruiting; 21 Days total cycle',
    optimalTemp: '18°C–22°C',
    humidity: '80%–85% for harvest; rehydrate for Flush 2',
    explanation:
      'Harvest mushroom clusters when the cap edges are still slightly curled downward. Once the caps flatten out or begin curling upwards, they dump billions of spores and rapidly lose culinary moisture and shelf life.',
    criticalDetail:
      'Twist and Pull: Do not cut with a dirty knife leaving dead stump tissue in the bag, which invites mold. Grasp the cluster firmly at the base, twist gently, and pull the whole clump free.',
    proTip:
      'Dunking for Flush 2: After harvesting the first flush, rest the block for 3 days, then submerge it in clean cold water for 4–8 hours to rehydrate the lost moisture. Return to the fruiting room for Flush 2 (60% yield of Flush 1)!',
  },
];

export interface PestTrouble {
  issue: string;
  scientificAgent: string;
  symptoms: string;
  rootCause: string;
  prevention: string;
  severity: 'high' | 'medium' | 'critical';
}

export const COMMON_TROUBLES: PestTrouble[] = [
  {
    issue: 'Green Mold Outbreak',
    scientificAgent: 'Trichoderma harzianum / viride',
    symptoms: 'Bright emerald-green velvety powdery spots spreading across white mycelium on substrate blocks.',
    rootCause: 'Substrate over-sterilized without clean room, under-pasteurized straw, warm humid stagnant air, or dirty hands during spawning.',
    prevention: 'Maintain 65°C–75°C pasteurization duration; dust affected spots with food-grade hydrated lime (Ca(OH)2) to raise pH above 8.0, or discard severely contaminated bags immediately.',
    severity: 'critical',
  },
  {
    issue: 'Cobweb Mold',
    scientificAgent: 'Hypomyces / Cladobotryum',
    symptoms: 'Rapidly growing gray, fluffy gossamer strands resembling cotton candy enveloping baby mushrooms within 24 hours.',
    rootCause: 'Poor air exchange (stagnant CO2 pockets) paired with excessively high humidity and elevated temperatures.',
    prevention: 'Drastically increase Fresh Air Exchange (FAE). Lightly mist affected surface spots with 3% hydrogen peroxide (H2O2), which dissolves the thin cobweb mold without harming mushroom tissue.',
    severity: 'high',
  },
  {
    issue: 'Bacterial Blotch',
    scientificAgent: 'Pseudomonas tolaasii',
    symptoms: 'Yellowish to dark brown sunken, slimy, foul-smelling lesions on mushroom caps and stems.',
    rootCause: 'Liquid water droplets remaining on mushroom caps for longer than 2–3 hours after misting without airflow.',
    prevention: 'Never mist right before lights out. Ensure gentle fan ventilation ensures water droplets evaporate within 45 minutes of mist cycles.',
    severity: 'medium',
  },
  {
    issue: 'Fungus Gnats / Sciarid Flies',
    scientificAgent: 'Sciaridae & Phoridae family',
    symptoms: 'Tiny black flies hovering around substrate; microscopic white larvae tunneling through stems causing hollow rotting.',
    rootCause: 'Unscreened air vents, rotting spent substrate left near growing area, or high moisture compost.',
    prevention: 'Install ultra-fine mesh insect netting (<0.5mm) on all intake and exhaust fans. Hang yellow sticky cards and introduce beneficial predatory nematodes (Steinernema feltiae).',
    severity: 'medium',
  },
];

export const NEPAL_CULTIVATION_DETAILS = {
  overview:
    'In Nepal, mushroom farming (विशेषगरी कन्या र गोब्रे च्याउ) is celebrated as a transformative agri-business model empowering rural youth, women cooperatives, and smallholders. With low capital entry requirements and abundant paddy straw from rice harvests, it delivers rapid cash returns within 3 weeks.',
  keyCenters: [
    {
      name: 'National Mushroom Development Centre (NMDC)',
      location: 'Balambu, Kathmandu',
      role: 'Government apex body providing certified high-viability mother spawn, farmer training programs, and cold-tolerant Himalayan strain trials.',
      contactInfo: 'Ministry of Agriculture and Livestock Development, Balambu',
    },
    {
      name: 'Terai Sub-Tropical Belt',
      location: 'Chitwan, Morang, Jhapa, Rupandehi',
      role: 'Extensive winter production of Pleurotus florida and warm-weather Milky Mushroom (Calocybe indica) during summer months.',
    },
    {
      name: 'High Himalayan Alpine Regions',
      location: 'Jumla, Mugu, Dolpa, Darchula, Mustang',
      role: 'Indigenous wild harvest of Guchhi Chhyau (Morchella / Morels) and alpine Yarsagumba (Ophiocordyceps sinensis), commanding up to NPR 18,000–1,600,000/kg.',
    },
  ],
  nepalCalendar: [
    { season: 'Bhadra – Kartik (Autumn)', variety: 'Pleurotus ostreatus (Oyster)', note: 'Peak season in Kathmandu Valley and mid-hills; high natural humidity.' },
    { season: 'Mangsir – Magh (Winter)', variety: 'Agaricus bisporus (Button / Gobre)', note: 'Requires cooler 14°C–18°C temperatures; composted straw manure beds.' },
    { season: 'Falgun – Chaitra (Spring)', variety: 'Pleurotus sajor-caju', note: 'Fast growth; prolific fruiting before summer heat.' },
    { season: 'Baisakh – Ashadh (Summer)', variety: 'Calocybe indica (Dudh Chhyau / Milky)', note: 'Thrives in 30°C–35°C tropical heat of Terai plains.' },
  ],
  governmentSubsidies:
    'Nepal Ministry of Agriculture offers 50% matching grant subsidies on mushroom greenhouse plastic tunnels, moisture atomizers, and spawn grain purchases through local municipalities (Palikas) and Krishi Gyan Kendra.',
};
