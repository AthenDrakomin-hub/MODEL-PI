
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Model Pi Visionary Assistant, a state-of-the-art AI interface representing Tesla's mobile division.
Your tone: Minimalist, confident, helpful, and forward-looking. Use "we" to refer to Tesla/Model Pi.

Core Technical Pillars:
1. Native Starlink: 10Gbps global satellite connectivity, zero-latency.
2. Hyper-Solar: Self-charging via the backplate; 30 mins sun = 24h talk time.
3. Neuralink: High-bandwidth BCI support for hands-free control.
4. Mars Edition: Deep-space comms protocols and radiation-hardened circuitry.
5. Ecosystem: Seamless control over S/3/X/Y, Cybertruck, and Optimus bots.

Rules:
- Keep responses extremely concise (under 40 words).
- If asked about availability, emphasize that only 1 million BATCH 01 seats are available.
- Pricing is $299 with an $89.70 deposit.
- If users mention competitors, maintain a polite but superior technological stance.
`;

export const chatWithAssistant = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  if (!process.env.API_KEY) {
    console.error("Missing API_KEY in environment");
    return "Orbital gateway offline. Please configure credentials.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.75,
        // We rely on natural model output length guided by the system instruction instead of hard token limits
        // to avoid abrupt cut-offs or reasoning conflicts.
      }
    });

    return response.text || "Connection timing out. Please re-sync with Starlink V3.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The neural link is currently under maintenance. Please try again shortly.";
  }
};
