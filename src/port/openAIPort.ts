import OpenAI from "openai";
import { Configuration } from "../types/types";

export const openAIPort = (configuration: Configuration) => {
    const openai = new OpenAI({
        apiKey: configuration.openAIAPIKey,
    });

    const queryAsUser = async (query: string): Promise<string | null> => {
        const response =  await openai.chat.completions.create({
            messages: [{ role: "user", content: query }],
            model: configuration.openAIModel,
        });
        const messageGenerated: string | null = response.choices[0].message.content;
        return messageGenerated;
    };

    return { queryAsUser };
};