import { doc, getDoc, setDoc, deleteDoc, Firestore } from 'firebase/firestore';
import { FIRE_BASE_COLLECTION_NAME } from '../constants/keys';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserTaskData } from '../types/types';

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
