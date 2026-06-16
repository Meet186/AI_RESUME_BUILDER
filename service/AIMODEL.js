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

export const AIChatSession = async (jobTitle) => {

     const PROMT = `Job Title: ${jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format`

  const prompt = `
    Job Title: ${jobTitle}

    Based on the job title, generate 3 professional resume summaries:
    1. Fresher
    2. Mid Level
    3. Experienced

    Each summary should be 3-4 lines.

    Return ONLY valid JSON in the following format:

    
      {
        "experience_level": "Fresher",
        "summary": "..."
      },
      {
        "experience_level": "Mid Level",
        "summary": "..."
      },
      {
        "experience_level": "Experienced",
        "summary": "..."
      }
    
  `;

  try {
    const response = await ai.models.generateContent({
     model: "gemini-2.5-flash",
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