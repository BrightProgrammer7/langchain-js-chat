// import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "@langchain/openai";
// import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

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

  // const systemTemplate = "Take the role of a {role}, that answers questions in a {style} way.";
  const systemTemplate = `Create an ICS file compatible with Google Calendar using the following structure: "BEGIN:VCALENDAR
  VERSION:2.0
  BEGIN:VEVENT
  SUMMARY:title
  DTSTART:startDate
  DTEND:endDate
  LOCATION:location
  DESCRIPTION:description
  END:VEVENT
  END:VCALENDAR" and Extract event details from the provided article and Make sure to format the date according to this pattern for DTSTART and DTEND:

  javascript
  Copy code
  DTSTART:startDate.toISOString().replace(/[-:]/g, "").replace(/."d3"/, "")Z
  DTEND:endDate.toISOString().replace(/[-:]/g, "").replace(/.d"3"/, "")Z
  Your task is to generate the ICS file using the provided event details and date formatting instructions.`;
  const humanTemplate = "{text}";

  const chatPrompt = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["human", humanTemplate],
  ])

  // const formattedChatPrompt = await chatPrompt.formatMessages({
  //     role: "personal travel agent",
  //     style: "detailed",
  //     text: question
  // })
  const formattedChatPrompt = await chatPrompt.formatMessages({
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
