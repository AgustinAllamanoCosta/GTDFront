import { createContext } from 'react';
import { UseTaskResponse } from '../types/types';

export const TaskInformationContext = createContext<UseTaskResponse>(
  {} as UseTaskResponse,
);
