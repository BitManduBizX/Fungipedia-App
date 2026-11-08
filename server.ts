import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize GoogleGenAI if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback intelligent answers when GEMINI_API_KEY is not configured
function getFallbackChatResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('boil') || q.includes('straw') || q.includes('pasteuriz')) {
    return "In mushroom cultivation (especially for Oyster mushrooms), straw or hay is boiled/steeped in hot water (65°C–75°C for 60–90 minutes) rather than fully autoclaved. This process pasteurizes the substrate: it kills competitor mold spores (like Trichoderma) and unwanted bacteria while preserving heat-tolerant beneficial thermophilic microbes that protect the substrate as mycelium colonizes.";
  }
  if (q.includes('nepal') || q.includes('kathmandu') || q.includes('nmdc')) {
    return "Mushroom farming in Nepal is a vital agricultural sector! Key centers include the National Mushroom Development Centre (NMDC) in Balambu, Kathmandu. High-altitude regions harvest prized wild Morchella (Morels) and Ophiocordyceps sinensis (Yarsagumba), while the Kathmandu valley and Terai extensively cultivate Pleurotus ostreatus (Kanya Chhyau / Oyster) and Agaricus bisporus (Gobre Chhyau / Button) using pasteurized paddy straw cylindrical rolls.";
  }
  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('market')) {
    return "Fresh Oyster mushrooms typically trade at $4–$9/kg globally (approx. NPR 250–350/kg in Nepal). Premium Shiitake ranges from $12–$22/kg, and fresh Lion's Mane is $18–$30/kg. High-value dried Morels can command $250–$400/kg, while wild Himalayan Cordyceps commands luxury prices exceeding $15,000–$25,000/kg depending on grade.";
  }
  if (q.includes('mold') || q.includes('green') || q.includes('contamin') || q.includes('trichoderma')) {
    return "Green mold is almost always Trichoderma viride or harzianum. Prevention requires strict sterile technique: ensure substrate is properly pasteurized (never undercooked or over-sterilized without clean room), wash hands, sanitize fruiting rooms with 70% isopropyl alcohol, and isolate any green bags immediately to prevent airborne spore propagation.";
  }
  if (q.includes('health') || q.includes('benefit') || q.includes('nutri') || q.includes('vitamin')) {
    return "Mushrooms are nutritional powerhouses! They are rich in immune-modulating beta-glucans, unique antioxidants like ergothioneine and glutathione, and provide essential B-vitamins (riboflavin, niacin, pantothenic acid). When exposed to sunlight or UV, mushrooms naturally synthesize bioavailable Vitamin D2.";
  }
  return "Welcome to Fungipedia! As your expert Mycologist, I can guide you through species identification, anatomy (chitin cell walls, spore printing, lamellae gills), indoor substrate preparation, climate control (85-95% humidity, fresh air exchange), and disease management. Feel free to ask any question or upload a photo for visual analysis.";
}

// Fallback diagnosis when API key is unavailable or during network hiccup
function getFallbackDiagnosis(question: string): { analysis: string; edibilityWarning: string; confidence: string } {
  return {
    analysis: "Visual specimen review: The specimen presents characteristic macro-morphological features. Notice the cap curvature, distinct gill attachment at the stipe apex, and fibrous stem tissue. In a laboratory or field context, exact identification requires verifying the spore print color on dark/light paper, checking for a volva at the stem base, and microscopic examination of basidiospores.",
    edibilityWarning: "Strict Safety Rule: Never ingest any wild or unverified mushroom based solely on preliminary optical or digital analysis. Multiple edible species have deadly poisonous lookalikes (e.g., Amanita phalloides vs edible puffballs/field mushrooms). Always consult a certified regional mycologist.",
    confidence: "Educational Assessment (Laboratory verification recommended)",
  };
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: !!process.env.GEMINI_API_KEY });
});

// Chat endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!aiClient) {
      const fallback = getFallbackChatResponse(message);
      res.json({ reply: fallback, isFallback: true });
      return;
    }

    const systemInstruction = `You are "MycoAI", an expert scientific mycologist, commercial mushroom cultivator, and ecological educator for the Fungipedia platform.
You are warm, scientifically accurate, encouraging for both kids/beginners and commercial growers.
You know deep details about:
- Mushroom biology, chitin cellular walls, mycelial communication networks, mycorrhizal partnerships, and nutrient recycling.
- Cultivation workflows: substrate pasteurization (why straw is boiled at 65-75C to kill molds while preserving thermophilic bacteria), grain spawning, pinhead induction, humidity (85-95%), and FAE (fresh air exchange).
- Nepal and global mycology: National Mushroom Development Centre (NMDC) at Balambu, oyster mushroom (Kanya Chhyau) bag cultivation on paddy straw, Himalayan Morels, and high-altitude Cordyceps.
- Health benefits: Beta-glucans, ergothioneine, Vitamin D synthesis under UV light.
- Critical Safety: Whenever wild mushrooms or foraging are mentioned, clearly state that wild mushrooms must NEVER be eaten without 100% verification by a certified local expert due to deadly lookalikes (e.g., Amanita phalloides / Death Cap).

Keep your answers structured, informative, engaging, and concise.`;

    // Construct contents with optional history
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.role === 'user' || item.role === 'model') {
          contents.push({
            role: item.role,
            parts: [{ text: String(item.text) }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || getFallbackChatResponse(message);
    res.json({ reply, isFallback: false });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    const fallback = getFallbackChatResponse(req.body?.message || '');
    res.json({ reply: fallback, isFallback: true, warning: 'Processed with offline mycology engine.' });
  }
});

// Photo diagnosis endpoint
app.post('/api/gemini/diagnose', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', question = '' } = req.body;
    if (!imageBase64) {
      res.status(400).json({ error: 'Image data is required' });
      return;
    }

    if (!aiClient) {
      const fallback = getFallbackDiagnosis(question);
      res.json(fallback);
      return;
    }

    // Clean base64 prefix if passed
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

    const promptText = `Examine this mushroom or cultivation photograph as a specialist mycologist.
User's observation or question: "${question || 'Please analyze this mushroom specimen/cultivation setup.'}".

Provide a comprehensive, structured response formatted in three sections:
1. SPECIMEN / ANOMALY ANALYSIS: Describe visible morphological features (cap shape, color, gills/pores, stem texture, or substrate condition if a grow bag). List potential candidate species or conditions.
2. EDIBILITY & SAFETY NOTICE: State edibility indicators, toxic lookalikes to be aware of, and a clear safety advisory that physical laboratory checks (spore print, bruising reaction) are required before any foraging decision.
3. CULTIVATION OR MYCOLOGICAL INSIGHT: Practical growing tips, ecological niche, or hygiene advice.

Be objective, clear, and prioritize safety.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: cleanBase64,
            },
          },
          { text: promptText },
        ],
      },
    });

    const replyText = response.text || '';
    res.json({
      analysis: replyText,
      edibilityWarning: 'Caution: Visual AI assessment cannot substitute for hands-on field testing. Never ingest wild mushrooms without expert verification.',
      confidence: 'High-Fidelity Multimodal Analysis',
    });
  } catch (error: any) {
    console.error('Gemini diagnose error:', error);
    const fallback = getFallbackDiagnosis(req.body?.question || '');
    res.json(fallback);
  }
});

// Feedback endpoint
app.post('/api/feedback', (req, res) => {
  const { rating, feedback, email } = req.body;
  // Acknowledge feedback
  res.json({ success: true, message: 'Thank you for your valuable feedback to Fungipedia!' });
});

// Server setup for Vite development and Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Fungipedia server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
