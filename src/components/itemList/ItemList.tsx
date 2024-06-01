import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useContext, useEffect, useRef, useState } from 'react';
import { ItemWithActions } from '../itemWithActions/ItemWithActions';
import { TaskInformationContext } from '../../contexts/taskContext';
import { Task } from '../../types/types';
import { THEME_ONE } from '../../constants/colors';
import { SIZE } from '../../constants/size';
import { UserInformationContext } from '../../contexts/userContext';
import { EventContext } from '../../contexts/eventContext';
import { SUBSCRIBER_NAMES } from '../useEvent/useEvent';
import { Spiner } from '../loadingSpiner/Spiner';
import { ItemAddButtonWithOptions } from '../itemButtonWithOptions/ItemButtonWithOptions';

type ItemListProps = {
  id?: string;
};

const ItemList = ({ id }: ItemListProps): React.JSX.Element => {
  const CHARACTER_LIMIT: number = 43;
  const itemsInformation = useContext(TaskInformationContext);
  const userInformation = useContext(UserInformationContext);
  const { eventBus } = useContext(EventContext);
  const refToList = useRef<HTMLDivElement[]>([]);

  const [value, setValue] = useState<string>('');

  const activeTask = itemsInformation.getActiveTaskToMap();
  const inboxToMap = itemsInformation.getInboxTaskToMap();

  const buttonAdd = (makeDaily: boolean = false) => {
    if (value) {
      itemsInformation.addNewTask(value, '', makeDaily);
      setValue('');
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

  const onChangeButton = (event: any) => {
    const value: string = event.target.value;
    if (value.length <= CHARACTER_LIMIT) {
      setValue(value);
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
      >
        <ItemWithActions
          key={`${item.id}-${item.title}`}
          title={item.title}
          onAcive={() => onActiveTask(item.id)}
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
          <Spiner />
        ) : (
          <>
            <ItemAddButtonWithOptions
              onChange={onChangeButton}
              value={value}
              action={() => {
                buttonAdd(false);
              }}
              disable={itemsInformation.getIsLoading()}
              characterLimit={CHARACTER_LIMIT}
              onMakeDaily={() => {
                buttonAdd(true);
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
    background: ${THEME_ONE.backgorund};
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
