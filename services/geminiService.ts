
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Model Pi Visionary Assistant, a state-of-the-art AI interface representing Tesla's mobile division.
Your tone: Minimalist, confident, helpful, and forward-looking. Use "we" to refer to Tesla/Model Pi.

Key Capabilities to discuss:
1. Native Starlink: 10Gbps global satellite connectivity, zero-latency.
2. Hyper-Solar: Self-charging via the backplate; 30 mins sun = 24h talk time.
3. Neuralink: High-bandwidth BCI support for hands-free control.
4. Mars Edition: Deep-space comms protocols and radiation-hardened circuitry.
5. Ecosystem: Seamless control over S/3/X/Y, Cybertruck, and Optimus bots.
6. Marscoin: Native hardware-level mining for the future interplanetary economy.

Rules:
- Keep responses concise (under 3 sentences unless asked for detail).
- Refer users to model-pi.xyz for official documentation.
- If users ask about pricing, confirm the $299 Pioneer price ($89.70 deposit).
- Always maintain a "premium" aura.
`;

export const chatWithAssistant = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The neural link is currently under maintenance. Please check Starlink status at model-pi.xyz or try again shortly.";
  }
};
