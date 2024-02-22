import { OpenAI } from "langchain/llms/opeanai";

const llm = new OpenAI({
  openAIApiKey: import.meta.env.OPENAI_API_KEY,
});

async function getAnswer(question: string) {
    let answer = ''
    try {
        answer= await llm.predict(question)
    } catch (error) {
        console.error(e);
    } 

    return answer
}
