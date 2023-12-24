import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useContext, useState } from 'react';
import { TaskInformationContext } from '../../views/main/Main';
import { ItemAddButton } from '../itemButton/ItemButton';
import { Item } from '../item/Item';
import { v4 as uuidv4 } from 'uuid';

export type ItemListProps = {
  title: string;
};

export const ItemList = ({ title }: ItemListProps): JSX.Element => {
  const activeInformation = useContext(TaskInformationContext);
  const [value, setValue] = useState<string>('');

  const buttonAdd = (event: any) => {
    if (event.target.value !== '') {
      const oldTask = activeInformation.items;
      oldTask.push({
        id: uuidv4(),
        title: event.target.value,
        isComplete: false,
        isCancele: false,
        isActive: false,
      });
      activeInformation.setItems([...oldTask]);
      setValue('');
    }
  };

  const onCancelTask = (index: number) => {
    const oldTask = activeInformation.items;
    oldTask[index].isCancele = true;
    activeInformation.setItems([...oldTask]);
  };

  const onActiveTask = (index: number) => {
    if (activeInformation.activeTasks.length < 3) {
      const oldTask = activeInformation.items;
      oldTask[index].isActive = true;
      activeInformation.setItems([...oldTask]);
    }
  };

  const onChangeButton = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <InboxTaskContainer>
      <CardTitle
        title={title}
        label={`total ${activeInformation.inboxTasks.length}`}
      >
        <InboxContainer>
          {activeInformation.inboxTasks.map((item, index) => {
            return (
              <Item
                key={`${index}-${item.title}`}
                title={item.title}
                onAcive={() => onActiveTask(index)}
                onCancel={() => onCancelTask(index)}
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
