// import { OpenAI } from "langchain/llms/openai";
// import { ChatOpenAI } from "@langchain/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "langchain/prompts";

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
export async function generateAnswer(question: string) {
  let answer = ''

  const systemTemplate = "Take the role of a {role}, that answers questions in a {style} way.";
  const humanTemplate = "{text}";

  const chatPrompt = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["human", humanTemplate],
  ])

  const formattedChatPrompt = await chatPrompt.formatMessages({
      role: "personal travel agent",
      style: "detailed",
      text: question
  });
  
  try {
      const result = await llm.invoke(formattedChatPrompt);

      answer = result?.content as string

  } catch (e) {
      return 'Something went wrong'
  }

  return answer
}
