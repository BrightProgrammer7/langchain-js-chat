import { OpenAI } from "langchain/llms/opeanai";

const llm = new OpenAI(
    {
        openAIApiKey: import.meta.env
    }
)