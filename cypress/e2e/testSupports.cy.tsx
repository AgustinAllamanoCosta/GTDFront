import { initializeApp, deleteApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { IS_END_TO_END, IS_LOCAL_TESTING } from '../../src/constants/environment';
import { taskFactory } from '../../src/factories/TaskFactory';
import { userDataFactory } from '../../src/factories/UserDataFactory';
import { repositoryFactory } from '../../src/repository/repository';
import { InboxTasks, Task } from '../../src/types/types';

export const USER_NAME: string = 'Test User';
const userID: string = Cypress.env('VITE_ID') ? Cypress.env('VITE_ID') : '';
const STEP_TIME: number = 2000;

const firebaeAppConfiguration = {
  apiKey: Cypress.env('VITE_API_KEY'),
  authDomain: Cypress.env('VITE_AUTH_DOMAIN'),
  projectId: Cypress.env('VITE_PROJECT_ID'),
  storageBucket: Cypress.env('VITE_STORAGE_BUACKET'),
  messagingSenderId: Cypress.env('VITE_MESSAGING_SENDER_ID'),
  appId: Cypress.env('VITE_APP_ID'),
  measurementId: Cypress.env('VITE_MEASUREMENT_ID'),
};

const getFirebaseConfiguration = () => {
  const firebaseApp = initializeApp(firebaeAppConfiguration);
  const useFireBase = getFirestore(firebaseApp);
  return { useFireBase, firebaseApp };
};

export const isLocalEnv = (): boolean => {
  return Cypress.env('VITE_APP_ENV') == IS_LOCAL_TESTING;
};

export const isE2EEnv = (): boolean => {
  return Cypress.env('VITE_APP_ENV') == IS_END_TO_END;
};

export const cleanDB = async () => {
  if (isE2EEnv()) {
    cy.log('Cleaning DB for e2e');
    const { useFireBase, firebaseApp } = getFirebaseConfiguration();
    const { clear } = repositoryFactory(IS_END_TO_END)(userID, useFireBase);
    await clear();
    deleteApp(firebaseApp);
    cy.log('Clean ended');
  }
  window.localStorage.clear();
};

export const chargeInboxTaskOnFirebase = (taskContent: Array<string>) => {
  if (isE2EEnv()) {
    cy.wrap(null).then(async () => {
      const { useFireBase, firebaseApp } = getFirebaseConfiguration();
      const { save } = repositoryFactory(IS_END_TO_END)(userID, useFireBase);

      const inboxTask: InboxTasks = new Map<string, Task>();
      const dummyTaskFactory = taskFactory(true);

      taskContent.forEach((content: string) => {
        const dummyTask: Task = dummyTaskFactory(content, '', false);
        inboxTask.set(dummyTask.id, dummyTask);
      });

      await save(
        userDataFactory(undefined, undefined, undefined, inboxTask, undefined),
      );
      deleteApp(firebaseApp);
      cy.log('Clean ended');
    });
  }
  window.localStorage.clear();
};

export const gotToTask = () => {
  cy.visit('/task');
  cy.get('[data-cy="Card-SubTitle"]').should('have.text', `Hi ${USER_NAME} !`);
  cy.get('[data-cy="task-add-button-input"]');
};

export const configViewPorts = () => {
  if (Cypress.env('isMobile')) {
    cy.viewport(400, 790);
    cy.log('Mobile view');
  } else {
    cy.viewport(1700, 1000);
    cy.log('Desktop view');
  }
};

export const prepearEnvironment = () => {
  cy.clearLocalStorage();
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  cy.wrap(null).then(async () => {
    await cleanDB();
  });
  configViewPorts();
};

export const addANewTaskByButton = (taskContent: string) => {
  const input = cy.get('[data-cy="task-add-button-input"]');
  input.type(taskContent);
  const button = cy.get('[data-cy="button-accept"]');
  button.click();
};

export const addANewTaskByEnter = (taskContent: string) => {
  const taskInput = cy.get('[data-cy="task-add-button-input"]');
  taskInput.type(taskContent);
  const button = cy.get('[data-cy="task-add-button-input"]');
  button.type('{enter}');
};

export const activeATaskByContent = (taskContent: string) => {
  cy.get(`[data-cy="task-${taskContent}"]`).click();
  cy.get('[data-cy="button-active"]').click();
  cy.wait(STEP_TIME);
};

export const cancelATaskByContent = (taskContent: string) => {
  const task = cy.get(`[data-cy="task-${taskContent}"]`);
  task.click();
  const button = cy.get('[data-cy="button-cancel"]');
  button.click();
};

export const completeATaskByOrder = (order: number) => {
  const button = cy.get(`[data-cy="stick-note-button-${order}"]`);
  button.click();
};

export const addADailyTask = (taskContent: string) => {
  const button = cy.get('[data-cy="task-add-button-input"]');
  button.type(taskContent);
  const buttonDaily = cy.get('[data-cy="button-make daily"]');
  buttonDaily.click();
};

export const activeATaskDoingDropping = (taskId: string) => {
  const item = cy
    .get(`[data-cy="task-${taskId}"]`)
    .trigger('mousedown')
    .wait(100);
  let listPosition = undefined;
  const activeList = cy.get('[data-cy="Active-task-list"]').then((list) => {
    listPosition = list.position();
  });
  activeList.trigger('mousemove', listPosition);
  item.trigger('mouseup');
  cy.wait(STEP_TIME);
};

export const splitATaskByContent = (
  taskContent: string,
  subContentOne: string,
  subContenttwo: string,
) => {
  const task = cy.get(`[data-cy="task-${taskContent}"]`);
  task.click();
  const button = cy.get(`[data-cy="button-split"]`);
  button.click();

  const subTaskInputOne = cy.get('[data-cy="task-add-button-task1"]');
  const subTaskInputTwo = cy.get('[data-cy="task-add-button-task2"]');
  subTaskInputOne.type(subContentOne);
  subTaskInputTwo.type(subContenttwo);

  const buttonSplit = cy.get(`[data-cy="button-split"]`);
  buttonSplit.click();
};
