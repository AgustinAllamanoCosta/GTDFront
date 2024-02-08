import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useContext, useState } from 'react';
import { ItemAddButton } from '../itemButton/ItemButton';
import { ItemWithActions } from '../itemWithActions/ItemWithActions';
import { TaskInformationContext } from '../../contexts/taskContext';
import { Task } from '../../types/types';
import { BLACK } from '../../constants/colors';
import { SIZE } from '../../constants/size';
import { UserInformationContext } from '../../contexts/userContext';
import { EventContext } from '../../contexts/eventContext';
import { SUBSCRIBER_NAMES } from '../useEvent/useEvent';

const ItemList = (): React.JSX.Element => {
  const itemsInformation = useContext(TaskInformationContext);
  const userInformation = useContext(UserInformationContext);
  const { eventBus } = useContext(EventContext);
  const [value, setValue] = useState<string>('');

  const buttonAdd = (event: any) => {
    if (event.target.value !== '') {
      itemsInformation.addNewTask(event.target.value, '');
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
    const parentTask: Task | undefined =
      itemsInformation.getInboxTask(parentTaskId);

    if (parentTask) {
      parentTask.childTask = {
        taksOne: itemsInformation.addNewTask(newTaskOne, parentTaskId),
        taksTwo: itemsInformation.addNewTask(newTaskTwo, parentTaskId),
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
    if (itemsInformation.getActiveTaskToMap().length < 3) {
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
    setValue(event.target.value);
  };

  return (
    <InboxTaskContainer is_mobile={`${userInformation.isMobile}`}>
      <CardTitle
        title={'Inbox'}
        label={`total ${itemsInformation.getInboxTaskToMap().length}`}
      >
        <InboxContainer>
          {itemsInformation.getInboxTaskToMap().map((item: Task) => {
            return (
              <ItemWithActions
                key={`${item.id}-${item.title}`}
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

export default ItemList;
