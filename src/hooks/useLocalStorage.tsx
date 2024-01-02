import { LOCAL_STORAGE_KEY } from '../constants /keys';
import { InboxTasks, UserData } from '../types/types';

export const useLocalStorage = () => {
  const ITEMS_KEY: string = 'items';
  const USER_DATA_KEY: string = 'userData';

  const saveItems = (items: InboxTasks) => {
    save(ITEMS_KEY, items);
  };

  const getItem = () => {
    return get(ITEMS_KEY);
  };

  const saveUserData = (useData: UserData | undefined) => {
    if (useData) {
      save(USER_DATA_KEY, useData);
    } else {
    }
  };

  const getUserData = () => {
    return get(USER_DATA_KEY);
  };

  const save = (key: string, item: any) => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const dataInLocal = JSON.parse(data);
      dataInLocal[key] = item;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataInLocal));
    } else {
      deleteKey(key);
    }
  };

  const get = (key: string) => {
    const gtdData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (gtdData) {
      const gtdDataPars = JSON.parse(gtdData);
      return gtdDataPars[key];
    }
    return undefined;
  };

  const deleteKey = (key: string) => {
    const gtdData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (gtdData) {
      const gtdDataPars = JSON.parse(gtdData);
      delete gtdDataPars[key];
      const dataInLocal = JSON.parse(gtdDataPars);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataInLocal));
    }
  };

  return {
    saveItems,
    saveUserData,
    getItem,
    getUserData,
  };
};
