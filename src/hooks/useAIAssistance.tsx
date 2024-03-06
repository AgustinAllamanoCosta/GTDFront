import { Configuration, Task } from '../types/types';
import { GTDBackPort } from '../port/GTDBackPort';

export const useAIAssistance = (configuration: Configuration) => {
  const { queryEstimateTask } = GTDBackPort(configuration);

  const estimateTask = (taskToEstimate: Task): Promise<Task> => {
    return queryEstimateTask(taskToEstimate);
  };

  return { estimateTask };
};
