import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../views/main/Main';
import { FONTS } from '../../constants /size';

const ENTER_KEY_COE = 13;

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
  const newTaskInput = useRef<any>();

  const focusInput = (event: any) => {
    if (newTaskInput.current) {
      newTaskInput.current.focus();
    }
  };

  const onInputKeyDown = (event: any) => {
    const keyCode = event.keyCode;
    if (keyCode === ENTER_KEY_COE) {
      event.preventDefault();
      action(event);
    }
  };

  return (
    <AddItemContent data-cy={`task-add-button`}>
      <Icon
        icon={faPlus}
        onClick={focusInput}
      />
      <AddItemInput
        ref={newTaskInput}
        data-cy={`task-add-button-input`}
        placeholder={'Add Task'}
        onBlur={action}
        value={value}
        onChange={onChange}
        onKeyDown={onInputKeyDown}
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
    <InboxTaskContainer>
      <CardTitle
        title={title}
        label={`total ${task.length}`}
      >
        <InboxContainer>
          {task.map((item, index) => {
            return (
              <Item
                key={`${index}-${item.title}`}
                {...item}
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
  font-size: ${FONTS.TEXT};
  height: 20px;
`;

const AddItemInput = styled.input`
  border: 0px;
  background-color: #d9d9d9;
  width: 85%;
  outline-width: 1px;
  border-radius: 2px;
  padding: 3px;
  &::placeholder {
    color: black;
    font-weight: bold;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  padding-left: 5px;
  padding-right: 5px;
`;

const InboxContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

const InboxTaskContainer = styled.div`
  height: 60vh;
  width: 43vh;
`;
