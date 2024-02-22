import { OpenAI } from "langchain/llms/opeanai";

const llm = new OpenAI({
  openAIApiKey: import.meta.env.OPENAI_API_KEY,
});

async function getAnswer(question: string) {
    const answer= await llm.predict(question)

    return answer
}