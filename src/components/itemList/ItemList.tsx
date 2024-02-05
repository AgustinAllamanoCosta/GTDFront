import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useContext, useState } from 'react';
import { ItemAddButton } from '../itemButton/ItemButton';
import { Item } from '../item/Item';
import { v4 as uuidv4 } from 'uuid';
import { TaskInformationContext } from '../../contexts/taskContext';
import { Task } from '../../types/types';
import { BLACK } from '../../constants/colors';
import { SIZE } from '../../constants/size';
import { UserInformationContext } from '../../contexts/userContext';
import { EventContext } from '../../contexts/eventContext';
import { SUBSCRIBER_NAMES } from '../useEvent/useEvent';

export type ItemListProps = {
  title: string;
};

export const ItemList = ({ title }: ItemListProps): JSX.Element => {
  const itemsInformation = useContext(TaskInformationContext);
  const userInformation = useContext(UserInformationContext);
  const { eventBus } = useContext(EventContext);
  const [value, setValue] = useState<string>('');

  const buttonAdd = (event: any) => {
    if (event.target.value !== '') {
      const oldTask = itemsInformation.items;
      oldTask.push({
        id: uuidv4(),
        title: event.target.value,
        isComplete: false,
        isCancele: false,
        isActive: false,
      });
      itemsInformation.setItems([...oldTask]);
      setValue('');
      eventBus.publish({
        name: SUBSCRIBER_NAMES.METRICS,
        data: {
          name: 'addItem',
          userId: userInformation.userData?.id,
          taskLenght: event.target.value.lenght,
        },
      });
    }
  };

  const buttonAddSplitTask = (
    newTaskOne: string,
    newTaskTwo: string,
    parentTaskId: string,
  ) => {
    const oldTask = itemsInformation.items;
    const newTaskToAddOne: Task = {
      id: uuidv4(),
      title: newTaskOne,
      isComplete: false,
      isCancele: false,
      isActive: false,
      parentTask: parentTaskId,
    };
    const newTaskToAddTwo: Task = {
      id: uuidv4(),
      title: newTaskTwo,
      isComplete: false,
      isCancele: false,
      isActive: false,
      parentTask: parentTaskId,
    };
    const parentTask: Task | undefined = oldTask.find((item: Task) => {
      return item.id === parentTaskId;
    });
    if (parentTask) {
      parentTask.childTask = {
        taksOne: newTaskToAddOne.id,
        taksTwo: newTaskToAddTwo.id,
      };
      parentTask.isCancele = true;
    }
    oldTask.push(newTaskToAddOne);
    oldTask.push(newTaskToAddTwo);

    itemsInformation.setItems([...oldTask]);

    eventBus.publish({
      name: SUBSCRIBER_NAMES.METRICS,
      data: {
        name: 'splitTask',
        userId: userInformation.userData?.id,
        taskId: parentTaskId,
      },
    });
  };

  const onCancelTask = (taskId: string) => {
    const oldTask = itemsInformation.items;
    const taskToCancel: Task | undefined = oldTask.find((item: Task) => {
      return item.id === taskId;
    });
    if (taskToCancel) {
      taskToCancel.isCancele = true;
      itemsInformation.setItems([...oldTask]);
      eventBus.publish({
        name: SUBSCRIBER_NAMES.METRICS,
        data: {
          name: 'cancelItem',
          userId: userInformation.userData?.id,
          taskId: taskToCancel.id,
        },
      });
    }
  };

  const onActiveTask = (taskId: string) => {
    if (itemsInformation.activeTasks.length < 3) {
      const oldTask = itemsInformation.items;
      const taskToCancel: Task | undefined = oldTask.find((item: Task) => {
        return item.id === taskId;
      });
      if (taskToCancel) {
        taskToCancel.isActive = true;
        itemsInformation.setItems([...oldTask]);
        eventBus.publish({
          name: SUBSCRIBER_NAMES.METRICS,
          data: {
            name: 'activeTask',
            userId: userInformation.userData?.id,
            taskId: taskToCancel.id,
          },
        });
      }
    }
  };

  const onChangeButton = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <InboxTaskContainer is_mobile={`${userInformation.isMobile}`}>
      <CardTitle
        title={title}
        label={`total ${itemsInformation.inboxTasks.length}`}
      >
        <InboxContainer>
          {itemsInformation.inboxTasks.map((item, index) => {
            return (
              <Item
                key={`${uuidv4()}-${item.title}`}
                title={item.title}
                onAcive={() => onActiveTask(item.id)}
                onCancel={() => onCancelTask(item.id)}
                onSplit={(taskOne: string, taskTwo: string) =>
                  buttonAddSplitTask(taskOne, taskTwo, item.id)
                }
              />
            );
          })}
        </InboxContainer>
        <AddItemContent
          onChange={onChangeButton}
          value={value}
          action={buttonAdd}
        />
      </CardTitle>
    </InboxTaskContainer>
  );
};

const AddItemContent = styled(ItemAddButton)`
  margin-bottom: 15px;
`;

const InboxContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${BLACK};
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
      height: 580px;
      width: 360px;
  `};
`;
