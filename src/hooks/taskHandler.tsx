import { useState, useContext } from 'react';
import { ArchiveItems, Task, TaskHandler, UserTaskData } from '../types/types';

import { ErrorHandlerContext } from '../contexts/errorHandlerContext';
import { UserInformationContext } from '../contexts/userContext';
import { repositoryFactory } from '../repository/repository';
import { firebaseData } from '../hooks/useFirebase';
import { configuration } from '../config/appConfig';
import { itemUtil } from './itemUtil';
import { userDataFactory } from '../factories/UserDataFactory';
import {
  FIRE_BASE_COLLECTION_NAME,
  FIRE_HISTORIC_COLLECTION_NAME,
} from '../constants/keys';

export const taskHandler: TaskHandler = (
  isLoadingDefault: boolean | undefined = false,
) => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);

  const { getData, save } = repositoryFactory(configuration.environment)(
    userInformation.userData?.id ? userInformation.userData?.id : '',
    firebaseData.useFireBase,
    FIRE_BASE_COLLECTION_NAME,
  );

  const archive = repositoryFactory(configuration.environment)(
    userInformation.userData?.id ? userInformation.userData?.id : '',
    firebaseData.useFireBase,
    FIRE_HISTORIC_COLLECTION_NAME,
  );

  const {
    mergeMaps,
    loadScheduleTask,
    archiveDoneTaskWithAfterAWeek,
    archiveCancelTaskWithAfterAWeek,
  } = itemUtil();

  const [userTaskData, setUserTaskData] =
    useState<UserTaskData>(userDataFactory());
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingDefault);

  const loadScheduleItems = () => {
    const newTask: Map<string, Task> = loadScheduleTask(
      userTaskData.scheduleTask,
      userTaskData.inboxItems,
    );
    userTaskData.inboxItems = newTask;
    setUserTaskData({ ...userTaskData });
  };

  const updateTask = async () => {
    try {
      if (userInformation?.userData?.id) {
        const userTaskDataOnRemote: UserTaskData = await getData();
        let isDataToUpdate: boolean = false;
        Object.keys(userTaskDataOnRemote).forEach((key) => {
          const castKey = key as keyof typeof userTaskDataOnRemote;
          if (userTaskDataOnRemote[castKey].size > 0) {
            isDataToUpdate = true;
          }
        });

        if (isDataToUpdate) {
          const rawLocalData: string | null = localStorage.getItem(
            userInformation.userData.id,
          );
          if (rawLocalData != null) {
            const localData: UserTaskData = JSON.parse(rawLocalData);
            Object.keys(localData).forEach((key) => {
              const castKey = key as keyof typeof userTaskData;
              if (localData[castKey].size > 0) {
                userTaskDataOnRemote[castKey] = mergeMaps(
                  userTaskDataOnRemote[castKey],
                  localData[castKey],
                );
              }
            });
          }
          setUserTaskData(userTaskDataOnRemote);
          localStorage.setItem(
            userInformation.userData.id,
            JSON.stringify(userTaskDataOnRemote),
          );
        }
      }
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error);
    }
  };

  const archiveOldCancelAndDoneTask = async () => {
    try {
      const userTaskDataOnRemote: UserTaskData = await getData();
      const latestCancelItems: ArchiveItems = archiveCancelTaskWithAfterAWeek(
        userTaskDataOnRemote.cancelItems,
      );
      const latestDoneItems: ArchiveItems = archiveDoneTaskWithAfterAWeek(
        userTaskDataOnRemote.doneItems,
      );
      userTaskDataOnRemote.cancelItems = latestCancelItems.noArchiveItems;
      userTaskDataOnRemote.doneItems = latestDoneItems.noArchiveItems;
      const archiveItems = userDataFactory();
      archiveItems.doneItems = latestDoneItems.archiveItems;
      archiveItems.cancelItems = latestCancelItems.archiveItems;
      if (
        archiveItems.doneItems.size > 0 ||
        archiveItems.cancelItems.size > 0
      ) {
        await archive.save(archiveItems);
        await save(userTaskDataOnRemote);
        setUserTaskData(userTaskDataOnRemote);
      }
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error);
    }
  };

  const saveData = async () => {
    try {
      if (userInformation?.userData?.id) {
        localStorage.setItem(
          userInformation.userData.id,
          JSON.stringify(userTaskData),
        );
        await save(userTaskData);
      }
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error);
    }
  };

  const loadDataForFirstTime = async () => {
    try {
      setIsLoading(true);
      await updateTask();
      await archiveOldCancelAndDoneTask();
    } catch (error) {
      console.error('Error in loadDataForFirstTime:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearTask = () => {
    setUserTaskData(userDataFactory());
  };

  return {
    setUserTaskData,
    userTaskData,
    isLoading,
    refreshData: updateTask,
    saveData,
    loadDataForFirstTime: loadDataForFirstTime,
    loadScheduleTask: loadScheduleItems,
    clearTask,
  };
};
