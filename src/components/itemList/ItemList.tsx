import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../views/main/Main';

export type ItemListProps = {
  title: string;
  items: Array<Task>;
};

type ItemAddButtonProps = {
  action: (event: any) => void;
  onChange: (event: any) => void;
  value: string;
};

const ItemAddButton = ({
  onChange,
  action,
  value,
}: ItemAddButtonProps): JSX.Element => {
  return (
    <AddItemContent data-cy={`task-add-button`}>
      <Icon icon={faPlus} />
      <AddItemInput
        data-cy={`task-add-button-input`}
        placeholder={'Add Task'}
        onBlur={action}
        value={value}
        onChange={onChange}
      />
    </AddItemContent>
  );
};

const Item = ({ title, isComplete }: Task): JSX.Element => {
  return (
    <ItemContent data-cy={`task-${title}`}>
      <Icon icon={faCheck} />
      <ItemText>{title}</ItemText>
    </ItemContent>
  );
};

export const ItemList = ({ title, items }: ItemListProps): JSX.Element => {
  const [task, setTask] = useState<Array<Task>>(items);
  const [value, setValue] = useState<string>('');

  const buttonAdd = (event: any) => {
    if (event.target.value !== '') {
      const oldTask = task;
      oldTask.push({ title: event.target.value, isComplete: false });
      setTask([...oldTask]);
      setValue('');
    }
  };

  const onChangeButton = (event: any) => {
    setValue(event.target.value);
  };

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
        <ItemAddButton
          onChange={onChangeButton}
          value={value}
          action={buttonAdd}
        />
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
  outline: none;
  width: 100%;
  &::placeholder {
    color: black;
    font-weight: bold;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  padding-left: 5px;
  padding-right: 5px;
`;
