import { doc, getDoc, setDoc, deleteDoc, Firestore } from 'firebase/firestore';
import { FIRE_BASE_COLLECTION_NAME } from '../constants/keys';
import { Repository, UserTaskData } from '../types/types';
import {
  userDataDocumentFactory,
  userDataFactory,
  userDataFactoryFromData,
} from '../factories/UserDataFactory';
import { IS_LOCAL_TESTING } from '../constants/environment';
const userInformation: Map<string, UserTaskData> = new Map();

export const firebaseRepository = (userId: string, useFireBase: Firestore) => {
  if (userId == undefined || useFireBase == undefined) {
    const errorMessage: string = `The value/s ${userId ? '' : 'userId'} ${
      useFireBase ? '' : 'useFirebase'
    } can not be undefined`;
    throw new Error(errorMessage);
  }

  const saveIntoFirebase = async (userTasksData: UserTaskData) => {
    const userTaskDoc: any = doc(
      useFireBase,
      FIRE_BASE_COLLECTION_NAME,
      userId,
    );
    const documentData: any = userDataDocumentFactory(userTasksData);
    await setDoc(userTaskDoc, documentData);
  };

  const save = async (items: UserTaskData): Promise<void> => {
    await saveIntoFirebase(items);
  };

  const getData = async (): Promise<UserTaskData> => {
    const data: UserTaskData | null = await getDataFromFirebase();
    if (data != null) {
      return data;
    }
    return userDataFactory();
  };

  const getDataFromFirebase = async (): Promise<UserTaskData | null> => {
    const userTaskDoc: any = doc(
      useFireBase,
      FIRE_BASE_COLLECTION_NAME,
      userId,
    );
    const itemsInFirebase = await getDoc(userTaskDoc);
    const userData: any = itemsInFirebase.data();
    if (userData) {
      return userDataFactoryFromData(userData);
    } else {
      return null;
    }
  };

  const clear = async (): Promise<void> => {
    const userTaskDoc: any = doc(
      useFireBase,
      FIRE_BASE_COLLECTION_NAME,
      userId,
    );
    await deleteDoc(userTaskDoc);
  };

  return {
    save,
    clear,
    getData,
  };
};

export const memoryRepository = (userId: string, useFireBase: Firestore) => {
  if (userId == undefined) {
    throw new Error('The use ID can not be undefined');
  }

  const save = async (items: UserTaskData): Promise<void> => {
    userInformation.set(userId, items);
  };

  const getData = async (): Promise<UserTaskData> => {
    const data: UserTaskData | undefined = userInformation.get(userId);
    if (data) {
      return new Promise((resolver) => resolver(data));
    }
    return new Promise((resolver) => resolver(userDataFactory()));
  };

  const clear = async (): Promise<void> => {
    userInformation.delete(userId);
  };

  return {
    save,
    clear,
    getData,
  };
};

export const repositoryFactory = (environment: string): Repository => {
  if (environment === IS_LOCAL_TESTING) {
    return memoryRepository;
  }
  return firebaseRepository;
};
