import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
});


// export const AIChatSession = async (prompt) => {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     config: {
//       responseMimeType: "application/json",
//     },
//     contents: prompt,
//   });

//   return JSON.parse(response.text);
// };

export const AIChatSession = async (PROMT) => {

   

  // const prompt = `
  //   Job Title: ${jobTitle}

  //   Based on the job title, generate 3 professional resume summaries:
  //   1. Fresher
  //   2. Mid Level
  //   3. Experienced

  //   Each summary should be 3-4 lines.

  //   Return ONLY valid JSON in the following format:

    
  //     {
  //       "experience_level": "Fresher",
  //       "summary": "..."
  //     },
  //     {
  //       "experience_level": "Mid Level",
  //       "summary": "..."
  //     },
  //     {
  //       "experience_level": "Experienced",
  //       "summary": "..."
  //     }
    
  // `;

  try {
    const response = await ai.models.generateContent({
     model: 'gemini-3.1-flash-lite',
      config: {
        responseMimeType: "application/json",
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: PROMT,
            },
          ],
        },
      ],
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
};