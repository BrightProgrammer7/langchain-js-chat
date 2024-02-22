// import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "@langchain/openai";

// const llm = new OpenAI({
const llm = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  temperature: 0.9, // Can be between 0 and 1
  modelName: "gpt-3.5-turbo-16k", // Default. Other options: https://platform.openai.com/docs/models/
});

export async function getAnswer(question: string) {
  let answer = "";
  try {
    answer = await llm.predict(question);
  } catch (e) {
    console.error(e);
  }

  return answer;
}
