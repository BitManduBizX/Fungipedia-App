export interface KidFact {
  id: string;
  emoji: string;
  title: string;
  fact: string;
  scientificPunchline: string;
}

export const KID_FACTS: KidFact[] = [
  {
    id: 'breathe',
    emoji: '💨',
    title: 'Mushrooms Inhale Oxygen!',
    fact: 'Plants breathe in carbon dioxide and exhale oxygen, but mushrooms do the opposite! They breathe in oxygen and breathe out carbon dioxide, just like you and your pets!',
    scientificPunchline: 'Because mushrooms are fungi, not plants! They are actually more closely related to animals than green vegetables.',
  },
  {
    id: 'giant',
    emoji: '🦖',
    title: 'The Biggest Living Thing on Earth!',
    fact: 'Before dinosaurs walked the Earth, giant mushrooms called Prototaxites towered 26 feet high like trees! Even today, a single Honey Mushroom in Oregon spans 3.5 square miles and is over 8,000 years old!',
    scientificPunchline: 'Its underground mycelial web weighs as much as 3 blue whales combined.',
  },
  {
    id: 'glow',
    emoji: '✨',
    title: 'Glowing Foxfire in the Dark!',
    fact: 'Over 80 species of mushrooms can glow in the dark with an eerie neon-green light! Early pioneers and Native Americans used glowing pieces of wood to mark forest trails at night.',
    scientificPunchline: 'The glow comes from luciferin, the same natural chemical fireflies use to attract night-flying beetles!',
  },
  {
    id: 'rainmakers',
    emoji: '🌧️',
    title: 'Mushrooms Can Make Rain!',
    fact: 'Every second, mushrooms launch trillions of microscopic spores into the atmosphere. In clouds, water vapor condenses around each spore, helping rain droplets form!',
    scientificPunchline: 'Mushrooms literally create the raindrops that keep their forest homes moist and green.',
  },
  {
    id: 'super-speed',
    emoji: '🚀',
    title: 'Fastest Launch in Nature!',
    fact: 'The Cannon Fungus (Sphaerobolus) can shoot its spore packet at 180,000 Gs of acceleration! That is faster than a speeding bullet or a space rocket launch!',
    scientificPunchline: 'High hydraulic pressure builds inside until the cap snaps inside-out like an organic catapult.',
  },
  {
    id: 'space-travel',
    emoji: '🛸',
    title: 'Mushrooms in Outer Space!',
    fact: 'Scientists sent fungal spores outside the International Space Station into the freezing, airless vacuum of space with high UV cosmic rays. And guess what? When brought back down, they still grew!',
    scientificPunchline: 'Their tough chitin walls and protective melanin shield them from deadly radiation.',
  },
];

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    question: 'Are mushrooms plants, animals, or their own unique kingdom?',
    options: ['They are plants because they grow in dirt', 'They are animals because they have legs', 'Their own kingdom: Kingdom Fungi', 'They are types of rocks'],
    correctIndex: 2,
    explanation: 'Mushrooms belong to Kingdom Fungi! Genetically, their cellular structure is actually closer to animals than to plants.',
  },
  {
    question: 'What is the true underground "body" of a mushroom called?',
    options: ['Mycelium', 'Spore root', 'Tree trunk', 'Fungal rope'],
    correctIndex: 0,
    explanation: 'The mushroom cap you see above ground is just the fruit! The vast living body underground is a web of threads called Mycelium.',
  },
  {
    question: 'Why do farmers boil or pasteurize straw before growing oyster mushrooms?',
    options: ['To cook it so it tastes like soup', 'To kill bad competitor molds while keeping friendly heat-tolerant bacteria', 'To make the straw turn bright pink', 'To freeze the mycelium'],
    correctIndex: 1,
    explanation: 'Spot on! Boiling at 65°C–75°C kills unwanted wild mold spores but preserves beneficial thermophilic bacteria that protect the mushroom!',
  },
];
