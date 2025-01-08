import { GoogleGenerativeAI } from "@google/generative-ai";

// const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.REACT_APP_GENERATIVE_AI_KEY;
const genAI = new GoogleGenerativeAI(apiKey ?? "");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const runAI = async (prompt: string) => {
  const draftedPrompt =
    `Act as a Movie Recommendation system and suggest some movies for the query : ` +
    `${prompt}` +
    `. Only give me names of movies, comma separated like the example ahead. Example Result: Gadar, Sholay, Don, Golmaal`;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(draftedPrompt);
  return result.response.text();
};
