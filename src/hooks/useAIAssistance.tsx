import { useEffect, useState, useContext } from "react";
import { openAIPort } from "../port/openAIPort";
import { Configuration } from "../types/types";

export const useAIAssistance = (configuration: Configuration) => {
  const { queryAsUser } = openAIPort(configuration);
  const EMPTY_RESPONSE: string = '';

  const queryAboutSplitATask = async (taskToSplit: string): Promise<string> => {
    const promt: string = `Hi chat, how you split this task in tow sub task ? task to split: ${taskToSplit}`;
    const response = await queryAsUser(promt);
    if(response)
      return response;
    return EMPTY_RESPONSE;
  };

  return { queryAboutSplitATask };
};
