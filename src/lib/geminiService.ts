import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ViralSegment {
  startTime: number;
  endTime: number;
  title: string;
  reason: string;
  script: string;
}

export async function analyzeVideo(url: string, context?: string): Promise<ViralSegment[]> {
  const prompt = `
    Analyze this YouTube video URL: ${url}
    Context/Description: ${context || "A popular YouTube video"}
    
    Tasks:
    1. Identify 3 highly engaging "Viral Segments" (each 30-50 seconds long) that would work well for YouTube Shorts.
    2. For each segment, provide:
       - Start and End time in seconds.
       - A catchy title.
       - A short explanation of why it's viral.
       - A "Transformative Script" for a voiceover that makes the content unique and helps avoid copyright issues.
    
    Format the output as a JSON array.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            startTime: { type: Type.NUMBER },
            endTime: { type: Type.NUMBER },
            title: { type: Type.STRING },
            reason: { type: Type.STRING },
            script: { type: Type.STRING }
          },
          required: ["startTime", "endTime", "title", "reason", "script"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
}

export async function generateVoiceover(script: string) {
  // Using the generateContent for TTS as per skill
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-tts-preview",
    contents: [{ parts: [{ text: `Say with a hype energetic viral TikTok voice: ${script}` }] }],
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
}
