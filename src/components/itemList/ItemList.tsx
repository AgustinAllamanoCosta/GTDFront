import { styled } from 'styled-components';
import { CardWithTitle } from '../cardWithTile/CardWithTitle';
import { useContext, useRef } from 'react';
import { TaskInformationContext } from '../../contexts/taskContext';
import { ItemListProps, Task } from '../../types/types';
import { THEME_ONE } from '../../constants/colors';
import { SIZE } from '../../constants/size';
import { UserInformationContext } from '../../contexts/userContext';
import { EventContext } from '../../contexts/eventContext';
import { SUBSCRIBER_NAMES } from '../useEvent/useEvent';
import { Spinner } from '../loadingSpiner/Spiner';
import { InputWithActions } from '../itemButtonWithOptions/ItemButtonWithOptions';
import { v4 as uuidv4 } from 'uuid';
import { DraggableItem } from '../draggableItem/DraggableItem';
import { useDroppable } from '@dnd-kit/core';
import { DRAGGING_IDS } from '../../views/tasks/Task';
import { NotificationHandlerContext } from '../notificationContext';

const ItemList = ({ id }: ItemListProps): React.JSX.Element => {
  const { setNodeRef } = useDroppable({ id: DRAGGING_IDS.ITEM_TASK });
  const CHARACTER_LIMIT: number = 43;
  const itemsInformation = useContext(TaskInformationContext);
  const notificationManager = useContext(NotificationHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const { eventBus } = useContext(EventContext);
  const refToList = useRef<HTMLDivElement[]>([]);

  const inboxToMap = itemsInformation.getInboxTaskToMap();

  const buttonAdd = (makeDaily: boolean = false, value: string | undefined) => {
    if (value) {
      itemsInformation.addNewTask(value, '', makeDaily);
      eventBus.publish({
        name: SUBSCRIBER_NAMES.METRICS,
        data: {
          name: 'addItem',
          userId: userInformation.userData?.id,
          taskLength: value.length,
        },
      });
    }
  };

  const buttonAddSplitTask = (
    newTaskOne: string,
    newTaskTwo: string,
    parentTaskId: string,
  ) => {
    const parentTask: Task | undefined =
      itemsInformation.getInboxTask(parentTaskId);

    if (parentTask) {
      parentTask.childTask = {
        taskOne: itemsInformation.addNewTask(newTaskOne, parentTaskId, false),
        taskTwo: itemsInformation.addNewTask(newTaskTwo, parentTaskId, false),
      };
      itemsInformation.cancelTask(parentTask.id);

      eventBus.publish({
        name: SUBSCRIBER_NAMES.METRICS,
        data: {
          name: 'splitTask',
          userId: userInformation.userData?.id,
          taskId: parentTaskId,
        },
      });
    }
  };

  const onCancelTask = (taskId: string) => {
    itemsInformation.cancelTask(taskId);
    eventBus.publish({
      name: SUBSCRIBER_NAMES.METRICS,
      data: {
        name: 'cancelItem',
        userId: userInformation.userData?.id,
        taskId,
      },
    });
  };

  const onActiveTask = (taskId: string) => {
    itemsInformation.activeTask(taskId);
    eventBus.publish({
      name: SUBSCRIBER_NAMES.METRICS,
      data: {
        name: 'activeTask',
        userId: userInformation.userData?.id,
        taskId,
      },
    });
  };

  const itemComponentsList: React.ReactNode[] = inboxToMap.map(
    (item: Task, index: number) => (
      <div
        ref={(el) => {
          if (el) {
            refToList.current[index] = el;
          }
          return refToList;
        }}
        onClick={() => {
          refToList?.current[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }}
        key={item.id}
      >
        <DraggableItem
          data-cy="DraggableItem"
          key={`${item.id}-${item.title}`}
          id={item.id}
          title={item.title}
          onActive={() => {
            try {
              onActiveTask(item.id);
            } catch (er: any) {
              notificationManager.setNotification(er.message);
            }
          }}
          onCancel={() => onCancelTask(item.id)}
          onSplit={(taskOne: string, taskTwo: string) =>
            buttonAddSplitTask(taskOne, taskTwo, item.id)
          }
        />
      </div>
    ),
  );

  return (
    <InboxTaskContainer
      is_mobile={`${userInformation.isMobile}`}
      id={id}
      ref={setNodeRef}
    >
      <CardWithTitle
        title={'Inbox'}
        label={`total ${inboxToMap.length}`}
      >
        {itemsInformation.getIsLoading() ? (
          <Spinner key={`${uuidv4()}`} />
        ) : (
          <>
            <InputWithActions
              action={(value: string | undefined) => {
                buttonAdd(false, value);
              }}
              disable={itemsInformation.getIsLoading()}
              characterLimit={CHARACTER_LIMIT}
              onMakeDaily={(value: string | undefined) => {
                buttonAdd(true, value);
              }}
            />
            <InboxContainer>{itemComponentsList}</InboxContainer>
          </>
        )}
      </CardWithTitle>
    </InboxTaskContainer>
  );
};

const InboxContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${THEME_ONE.background};
    border-radius: 10px;
  }
`;

const InboxTaskContainer = styled.div<{ is_mobile?: string }>`
  ${(props) =>
    props.is_mobile === 'true'
      ? `
      height: ${SIZE.L};
      width: ${SIZE.L};
      min-width: 280px;
      max-width: 380px;
      min-height: 400px;
    `
      : `
      height: 600px;
      width: 430px;
      padding: 8px;
  `};
`;

export default ItemList;
