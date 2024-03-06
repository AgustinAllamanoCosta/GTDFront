import { Configuration, Task } from '../types/types';
import axios from 'axios';

export const GTDBackPort = (configuration: Configuration) => {
  const queryEstimateTask = async (taskToEstimate: Task): Promise<Task> => {
    const { data } = await axios.post<Task>(
      `${configuration.backendURL}/estimate`,
      { task: taskToEstimate },
    );
    return data;
  };

  return { queryEstimateTask };
};
