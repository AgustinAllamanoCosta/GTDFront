import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  lazy,
  useState,
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

const ActiveTask = lazy(() => import('../../components/activeTask/ActiveTask'));
const ItemList = lazy(() => import('../../components/itemList/ItemList'));
const CancelList = lazy(() => import('../../components/cancelList/CancelList'));
const DoneList = lazy(() => import('../../components/doneList/DoneList'));

const TaskView = ({
  inboxTasks = undefined,
  userData,
  refreshTaskInterval,
  loadScheduleTask,
  calculateTaskTemp,
  environment,
}: TaskViewProps) => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const itemsInformation = useContext(TaskInformationContext);
  const { eventBus } = useContext(EventContext);
  const [activeTask, setActiveTask] = useState<Array<Task>>([]);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10,
      delay: 100,
      tolerance: 5,
    },
  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const sensors = useSensors(touchSensor, mouseSensor);

  const navigate = useNavigate();

  const [draggingItem, setDraggingItem] = useState<string | undefined>(
    undefined,
  );

  useInterval(itemsInformation.refreshData, refreshTaskInterval, environment);
  useInterval(itemsInformation.loadScheduleTask, loadScheduleTask, environment);
  useInterval(
    itemsInformation.calculateTaskTemp,
    calculateTaskTemp,
    environment,
  );

  const logOut = useCallback(() => {
    googleLogout();
    userInformation.setUserData(undefined);
    itemsInformation.clearCache();
    navigate('/');
  }, [userInformation.userData]);

  const onActiveTask = ({ active, over }: DragEndEvent) => {
    if (activeTask.length < 3 && over) {
      itemsInformation.activeTask(active.id.toString());
      eventBus.publish({
        name: SUBSCRIBER_NAMES.METRICS,
        data: {
          name: 'activeTaskDraggable',
          userId: userInformation.userData?.id,
          taskId: active.id,
        },
      });
    }
    setDraggingItem(undefined);
  };

  const onDragStart = ({ active, over }: DragEndEvent) => {
    if (active.id) {
      const title: string | undefined = itemsInformation.getInboxTask(
        active.id.toString(),
      )?.title;
      setDraggingItem(title);
    }
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
      itemsInformation.refreshData();
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
      onDragEnd={onActiveTask}
    >
      <Container>
        {userInformation.userData && (
          <UserCard
            userName={userInformation.userData.name}
            userPhoto={userInformation.userData.photoURL}
            logout={logOut}
          />
        )}
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
      <DragOverlay>
        {draggingItem ? <Item title={draggingItem} /> : undefined}
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
