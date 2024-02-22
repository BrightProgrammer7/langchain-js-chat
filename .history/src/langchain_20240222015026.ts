import { OpenAI } from "langchain/llms/opeanai";

const llm = new OpenAI({
  openAIApiKey: import.meta.env.OPENAI_API_KEY,
});

async