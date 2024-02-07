import { doc, getDoc, setDoc, deleteDoc, Firestore } from 'firebase/firestore';
import { FIRE_BASE_COLLECTION_NAME } from '../constants/keys';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserTaskData } from '../types/types';

type OldTask = {
  id: string;
  isActive: boolean;
  isCancele: boolean;
  isComplete: boolean;
  title: string;
};

export const repository = (userId: string, useFireBase: Firestore) => {
  const { getItem, saveItems } = useLocalStorage();

  const saveIntoFirebase = async (userTaksData: UserTaskData) => {
    const userTask = doc(useFireBase, FIRE_BASE_COLLECTION_NAME, userId);
    await setDoc(userTask, {
      activeItems: Object.fromEntries(userTaksData.activeItems),
      cancelItems: Object.fromEntries(userTaksData.cancelItems),
      inboxItems: Object.fromEntries(userTaksData.inboxItems),
      doneItems: Object.fromEntries(userTaksData.doneItems),
    });
  };

  const save = async (items: UserTaskData) => {
    saveItems(items);
    await saveIntoFirebase(items);
  };

  const getData = async (): Promise<UserTaskData> => {
    let data = await getDataFromFirebase();
    if (!data) data = getItem();
    return data;
  };

  const getDataFromFirebase = async (): Promise<UserTaskData> => {
    const userTaskDoc = doc(useFireBase, FIRE_BASE_COLLECTION_NAME, userId);
    const itemsInFirebase = await getDoc(userTaskDoc);
    const userData = itemsInFirebase.data();
    if (userData?.items) return parseItemsIntoUserData(userData.items);
    if (userData)
      return {
        activeItems: new Map(Object.entries(userData.activeItems)),
        cancelItems: new Map(Object.entries(userData.cancelItems)),
        doneItems: new Map(Object.entries(userData.doneItems)),
        inboxItems: new Map(Object.entries(userData.inboxItems)),
      };
    return {
      activeItems: new Map(),
      cancelItems: new Map(),
      doneItems: new Map(),
      inboxItems: new Map(),
    };
  };

  const parseItemsIntoUserData = (items: Array<OldTask>): UserTaskData => {
    const activeItems = new Map();
    const cancelItems = new Map();
    const doneItems = new Map();
    const inboxItems = new Map();
    items.forEach((item) => {
      if (item.isActive && !item.isComplete) activeItems.set(item.id, item);
      if (item.isCancele) cancelItems.set(item.id, item);
      if (item.isActive && item.isComplete) doneItems.set(item.id, item);
      else inboxItems.set(item.id, item);
    });
    return {
      activeItems,
      cancelItems,
      doneItems,
      inboxItems,
    };
  };

  const clear = async () => {
    const userTaskDoc = doc(useFireBase, FIRE_BASE_COLLECTION_NAME, userId);
    await deleteDoc(userTaskDoc);
  };

  return {
    save,
    clear,
    getData,
  };
};
