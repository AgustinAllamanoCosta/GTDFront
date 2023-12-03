import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../views/main/Main';

export type ItemListProps = {
  title: string;
  items: Array<Task>;
};

const ItemAddButton = (): JSX.Element => {
  return (
    <AddItemContent>
      <Icon icon={faPlus} />
      <AddItemInput placeholder={'Add Task'} />
    </AddItemContent>
  );
};

const Item = ({ title, isComplete }: Task): JSX.Element => {
  return (
    <ItemContent>
      <Icon icon={faCheck} />
      <ItemText>{title}</ItemText>
    </ItemContent>
  );
};

export const ItemList = ({ title, items }: ItemListProps): JSX.Element => {
  const [task, setTask] = useState<Array<Task>>(items);

  return (
    <CardTitle
      title={title}
      label={`total ${task.length}`}
    >
      <>
        {task.map((item, index) => {
          return (
            <Item
              key={`${index}-${item.title}`}
              {...item}
            />
          );
        })}
        <ItemAddButton />
      </>
    </CardTitle>
  );
};

const ItemContent = styled.div`
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  padding-left: 9px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const AddItemContent = styled(ItemContent)`
  margin-bottom: 15px;
`;

const ItemText = styled.span`
  font-weight: bold;
  font-size: 14px;
  height: 20px;
`;

const AddItemInput = styled.input`
  border: 0px;
  background-color: #d9d9d9;
  &::placeholder {
    color: black;
    font-weight: bold;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  padding-left: 5px;
  padding-right: 5px;
`;
