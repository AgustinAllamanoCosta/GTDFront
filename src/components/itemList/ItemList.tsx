import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useContext, useRef } from 'react';
import { ItemWithActions } from '../itemWithActions/ItemWithActions';
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

const ItemList = ({ id }: ItemListProps): React.JSX.Element => {
  const CHARACTER_LIMIT: number = 43;
  const itemsInformation = useContext(TaskInformationContext);
  const userInformation = useContext(UserInformationContext);
  const { eventBus } = useContext(EventContext);
  const refToList = useRef<HTMLDivElement[]>([]);

  const activeTask = itemsInformation.getActiveTaskToMap();
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
    if (activeTask.length < 3) {
      itemsInformation.activeTask(taskId);
      eventBus.publish({
        name: SUBSCRIBER_NAMES.METRICS,
        data: {
          name: 'activeTask',
          userId: userInformation.userData?.id,
          taskId,
        },
      });
    }
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
        <ItemWithActions
          key={`${item.id}-${item.title}`}
          title={item.title}
          onActive={() => onActiveTask(item.id)}
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
    >
      <CardTitle
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
      </CardTitle>
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
