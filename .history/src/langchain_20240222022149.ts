// import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "@langchain/openai";

// const llm = new OpenAI({
const llm = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
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
