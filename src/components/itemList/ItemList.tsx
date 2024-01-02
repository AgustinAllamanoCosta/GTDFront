import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useContext, useState } from 'react';
import { ItemAddButton } from '../itemButton/ItemButton';
import { Item } from '../item/Item';
import { v4 as uuidv4 } from 'uuid';
import { TaskInformationContext } from '../../contexts/taskContext';
import { Task } from '../../types/types';

export type ItemListProps = {
  title: string;
};

export const ItemList = ({ title }: ItemListProps): JSX.Element => {
  const itemsInformation = useContext(TaskInformationContext);
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
    }
  };

  const onCancelTask = (taskId: string) => {
    const oldTask = itemsInformation.items;
    const taskToCancel: Task | undefined = oldTask.find((item: Task) => {
      return item.id === taskId;
    });
    if (taskToCancel) {
      taskToCancel.isCancele = true;
      itemsInformation.setItems([...oldTask]);
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
      }
    }
  };

  const onChangeButton = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <InboxTaskContainer>
      <CardTitle
        title={title}
        label={`total ${itemsInformation.inboxTasks.length}`}
      >
        <InboxContainer>
          {itemsInformation.inboxTasks.map((item, index) => {
            return (
              <Item
                key={`${index}-${item.title}`}
                title={item.title}
                onAcive={() => onActiveTask(item.id)}
                onCancel={() => onCancelTask(item.id)}
              />
            );
          })}
        </InboxContainer>
        <ItemAddButton
          onChange={onChangeButton}
          value={value}
          action={buttonAdd}
        />
      </CardTitle>
    </InboxTaskContainer>
  );
};

const InboxContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

const InboxTaskContainer = styled.div`
  height: 60vh;
  width: 43vh;
`;
