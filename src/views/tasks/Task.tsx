import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  lazy,
  useState,
  ReactNode,
} from 'react';
import { TaskViewProps, UserTaskData, Task } from '../../types/types';
import { UserInformationContext } from '../../contexts/userContext';
import { googleLogout } from '@react-oauth/google';
import { TaskInformationContext } from '../../contexts/taskContext';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useNavigate } from 'react-router-dom';
import { Carousel } from '../../components/carousel/Carousel';
import { Spinner } from '../../components/loadingSpiner/Spiner';
import { useInterval } from '../../hooks/useInterval';
import { userDataFactory } from '../../factories/UserDataFactory';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SUBSCRIBER_NAMES } from '../../components/useEvent/useEvent';
import { EventContext } from '../../contexts/eventContext';
import { Item } from '../../components/item/Item';
import { StickyNote } from '../../components/stickyNote/StickyNote';
import { THEME_ONE } from '../../constants/colors';
import { NotificationHandlerContext } from '../../components/notificationContext';

const ActiveTask = lazy(() => import('../../components/activeTask/ActiveTask'));
const ItemList = lazy(() => import('../../components/itemList/ItemList'));
const CancelList = lazy(() => import('../../components/cancelList/CancelList'));
const DoneList = lazy(() => import('../../components/doneList/DoneList'));

export const DRAGGING_IDS = {
  ACTIVE_TASK: 'active-task',
  CANCEL_TASK: 'cancel-task',
  DONE_TASK: 'done-task',
  ITEM_TASK: 'item-task',
};

export const DRAGGIND_TYPES = {
  ACTIVE: 'active',
  ITEM: 'item',
};

export const TOUCH_SENSOR_OPTIONS = {
  activationConstraint: {
    distance: 10,
    delay: 100,
    tolerance: 5,
  },
};

export const MOUSE_SENSOR_OPTIONS = {
  activationConstraint: {
    delay: 100,
    tolerance: 5,
  },
};

const TaskView = ({
  inboxTasks = undefined,
  userData,
  refreshTaskInterval,
  loadScheduleTask,
  calculateTaskTemp,
  environment,
  showToast,
}: TaskViewProps) => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const notificationManager = useContext(NotificationHandlerContext);
  const itemsInformation = useContext(TaskInformationContext);
  const { eventBus } = useContext(EventContext);
  const [activeTask, setActiveTask] = useState<Array<Task>>([]);
  const touchSensor = useSensor(TouchSensor, TOUCH_SENSOR_OPTIONS);
  const mouseSensor = useSensor(MouseSensor, MOUSE_SENSOR_OPTIONS);

  const sensors = useSensors(touchSensor, mouseSensor);
  const navigate = useNavigate();

  useInterval(itemsInformation.refreshData, refreshTaskInterval);
  useInterval(itemsInformation.loadScheduleTask, loadScheduleTask);
  useInterval(itemsInformation.calculateTaskTemp, calculateTaskTemp);

  const [draggingItem, setDraggingItem] = useState<ReactNode | undefined>(
    undefined,
  );

  const logOut = useCallback(() => {
    googleLogout();
    userInformation.setUserData(undefined);
    itemsInformation.clearCache();
    navigate('/');
  }, [userInformation.userData]);

  const onDragEnds = (dragEndEvent: DragEndEvent) => {
    if (dragEndEvent.over) {
      switch (dragEndEvent.over.id) {
        case DRAGGING_IDS.ACTIVE_TASK:
          try {
            itemsInformation.activeTask(dragEndEvent.active.id.toString());
            eventBus.publish({
              name: SUBSCRIBER_NAMES.METRICS,
              data: {
                name: 'activeTaskDraggable',
                userId: userInformation.userData?.id,
                taskId: dragEndEvent.active.id,
              },
            });
          } catch (er: any) {
            notificationManager.setNotification(er.message);
          }
          break;
        case DRAGGING_IDS.CANCEL_TASK:
          itemsInformation.cancelTask(dragEndEvent.active.id.toString());
          eventBus.publish({
            name: SUBSCRIBER_NAMES.METRICS,
            data: {
              name: 'cancelTaskDraggable',
              userId: userInformation.userData?.id,
              taskId: dragEndEvent.active.id,
            },
          });
          break;
        case DRAGGING_IDS.DONE_TASK:
          itemsInformation.doneTask(dragEndEvent.active.id.toString());
          eventBus.publish({
            name: SUBSCRIBER_NAMES.METRICS,
            data: {
              name: 'doneTaskDraggable',
              userId: userInformation.userData?.id,
              taskId: dragEndEvent.active.id,
            },
          });
          break;
      }
      setDraggingItem(undefined);
    }
  };

  const onDragStart = ({ active, over }: DragEndEvent) => {
    let element: ReactNode | undefined = undefined;
    if (active.data.current?.type == DRAGGIND_TYPES.ACTIVE) {
      const title: string | undefined = itemsInformation.getActiveTask(
        active.id.toString(),
      )?.title;
      if (title)
        element = (
          <StickyNote
            number="1"
            text={title}
            backgroundColor={THEME_ONE.stickButton}
            onConfirm={() => {}}
            key={'DRAGGABLE'}
          />
        );
    } else if (active.id) {
      const title: string | undefined = itemsInformation.getInboxTask(
        active.id.toString(),
      )?.title;
      if (title) element = <Item title={title} />;
    }
    setDraggingItem(element);
  };

  useEffect(() => {
    try {
      if (userData) {
        userInformation.setUserData(userData);
      }
      if (inboxTasks) {
        const userTaskData: UserTaskData = userDataFactory();
        userTaskData.inboxItems = inboxTasks;
        itemsInformation.setUserTaskData(userTaskData);
      }
      if (showToast) {
        notificationManager.setNotification(
          'you need to complete an active task before active a new one',
        );
      }
      itemsInformation.loadDataForFirstTime();
      setActiveTask(itemsInformation.getActiveTaskToMap());
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error.message);
    }
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnds}
    >
      <Container>
        {userInformation.userData && (
          <UserCard
            userName={userInformation.userData.name}
            userPhoto={userInformation.userData.photoURL}
            logout={logOut}
          />
        )}{' '}
        <ContentContainer is_mobile={`${userInformation.isMobile}`}>
          {userInformation.isMobile ? (
            <>
              <ActiveTask />
              <Carousel>
                <Suspense fallback={<Spinner />}>
                  <ItemList id={'item-0'} />
                </Suspense>
                <Suspense fallback={<Spinner />}>
                  <DoneList id={'item-1'} />
                </Suspense>
                <Suspense fallback={<Spinner />}>
                  <CancelList id={'item-2'} />
                </Suspense>
              </Carousel>
            </>
          ) : (
            <>
              <Suspense fallback={<Spinner />}>
                <CancelList />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <ItemList />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <ActiveTask />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <DoneList />
              </Suspense>
            </>
          )}
        </ContentContainer>
      </Container>
      <DragOverlay data-cy="drag-overlay">
        {draggingItem ? draggingItem : undefined}
      </DragOverlay>
    </DndContext>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const ContentContainer = styled.div<{ is_mobile?: string }>`
  display: flex;
  ${(props) =>
    props.is_mobile === 'true'
      ? `
    flex-direction: column;
    align-items: center;`
      : `
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 830px;
    flex-wrap: nowrap;
  `};
`;

export default TaskView;
