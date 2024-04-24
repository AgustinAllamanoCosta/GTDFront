import { Dict } from 'styled-components/dist/types';
import { LOCAL_STORAGE_KEY } from '../constants/keys';
import { UserData, UserTaskData } from '../types/types';
import secureLocalStorage from 'react-secure-storage';

export const useLocalStorage = () => {
  const ITEMS_KEY: string = 'items';
  const USER_DATA_KEY: string = 'userData';

  const saveItems = (items: UserTaskData | undefined): void => {
    if (items) save(ITEMS_KEY, items);
    else deleteKey(ITEMS_KEY);
  };

  const getItem = (): UserTaskData | undefined => {
    return get(ITEMS_KEY);
  };

  const saveUserData = (userData: UserData | undefined) => {
    if (userData) save(USER_DATA_KEY, userData);
    else deleteKey(USER_DATA_KEY);
  };

  const getUserData = (): UserData | undefined => {
    return get(USER_DATA_KEY);
  };

  const save = (key: string, item: any): void => {
    const data: any = secureLocalStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      data[key] = item;
      secureLocalStorage.setItem(LOCAL_STORAGE_KEY, data);
    } else {
      const dataInLocal: Dict<any> = {};
      dataInLocal[`${key}`] = item;
      secureLocalStorage.setItem(LOCAL_STORAGE_KEY, dataInLocal);
    }
  };

  const get = (key: string): any | undefined => {
    const gtdData: any = secureLocalStorage.getItem(LOCAL_STORAGE_KEY);
    if (gtdData) {
      return gtdData[key];
    }
    return undefined;
  };

  const deleteKey = (key: string): void => {
    const gtdData: any = secureLocalStorage.getItem(LOCAL_STORAGE_KEY);
    if (gtdData) {
      delete gtdData[key];
      secureLocalStorage.setItem(LOCAL_STORAGE_KEY, gtdData);
    }
  };

  return {
    saveItems,
    saveUserData,
    getItem,
    getUserData,
  };
};
