import { Task } from '../types/types';
import { v4 as uuid } from 'uuid';
import { THEME_ONE } from '../constants/colors';

export const taskFactory = (newTask: boolean): Function => {
  if (newTask) {
    return newTaskFactory;
  }
  return createTask;
};

const newTaskFactory = (
  newTaskTitle: string,
  parentId: string,
  itsRepeat: boolean = false,
): Task => {
  const task: Task = {
    id: uuid(),
    title: newTaskTitle,
    points: 0,
    parentTask: parentId,
    repiteTask: itsRepeat,
    creationDate: new Date().toISOString(),
    backgroundColor: THEME_ONE.stickBackGround,
  };

  return task;
};

const createTask = (): Task => {
  return {
    id: uuid(),
    title: 'Factory Task',
    creationDate: new Date().toISOString(),
    repiteTask: false,
    points: 0,
    backgroundColor: THEME_ONE.stickBackGround,
  };
};
