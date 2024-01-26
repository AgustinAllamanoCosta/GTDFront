import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import useFireBase from '../hooks/useFirebase';
import { FIRE_BASE_COLLECTION_NAME } from '../constants/keys';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { InboxTasks } from '../types/types';

export const repository = (userId: string) => {
  const { getItem, saveItems } = useLocalStorage();

  const saveIntoFirebase = async (items: InboxTasks) => {
    const userTask = doc(useFireBase, FIRE_BASE_COLLECTION_NAME, userId);
    await setDoc(userTask, { items });
  };

  const save = async (items: InboxTasks) => {
    saveItems(items);
    await saveIntoFirebase(items);
  };

  const getData = async () => {
    let data = await getDataFromFirebase();
    if (!data) data = getItem();
    return data;
  };

  const getDataFromFirebase = async () => {
    const userTaskDoc = doc(useFireBase, FIRE_BASE_COLLECTION_NAME, userId);
    const itemsInFirebase = await getDoc(userTaskDoc);
    const userData = itemsInFirebase.data();
    if (userData && userData.items) return userData.items;
    return [];
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
