import { doc, getDoc, setDoc, deleteDoc, Firestore } from 'firebase/firestore';
import { FIRE_BASE_COLLECTION_NAME } from '../constants/keys';
import { UserTaskData } from '../types/types';
import { userDataDocumentFactory, userDataFactory, userDataFactoryFromData } from '../factories/UserDataFactory';

export const repository = (userId: string, useFireBase: Firestore) => {
  
  const saveIntoFirebase = async (userTasksData: UserTaskData) => {
    const userTaskDoc: any = doc(useFireBase, FIRE_BASE_COLLECTION_NAME, userId);
    const documentData: any = userDataDocumentFactory(userTasksData);
    await setDoc(userTaskDoc, documentData);
  };

  const save = async (items: UserTaskData): Promise<void> => {
    await saveIntoFirebase(items);
  };

  const getData = async (): Promise<UserTaskData> => {
      const data: UserTaskData | null = await getDataFromFirebase();
      if(data === null){
        return userDataFactory();
      }else{
        return data;
      }
  };

  const getDataFromFirebase = async (): Promise<UserTaskData | null> => {
    const userTaskDoc: any = doc(useFireBase, FIRE_BASE_COLLECTION_NAME, userId);
    const itemsInFirebase = await getDoc(userTaskDoc);
    const userData: any = itemsInFirebase.data();
    if (userData) {
      return userDataFactoryFromData(userData);
    } else {
      return null;
    }
  };

  const clear = async (): Promise<void> => {
    const userTaskDoc: any = doc(useFireBase, FIRE_BASE_COLLECTION_NAME, userId);
    await deleteDoc(userTaskDoc);
  };

  return {
    save,
    clear,
    getData,
  };
};
