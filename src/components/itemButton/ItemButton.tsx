import { styled } from 'styled-components';
import { useRef, memo } from 'react';
import faPlus from '../../assets/icons/faPlus.svg';
import { BLACK, GREY } from '../../constants/colors';
import { ENTER_KEY_COE } from '../../constants/keys';

type ItemAddButtonProps = {
  action: (event: any) => void;
  onChange: (event: any) => void;
  value: string;
  dataTest?: string;
};

export const ItemAddButton = memo(
  ({
    onChange,
    action,
    value,
    dataTest,
  }: ItemAddButtonProps): React.JSX.Element => {
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
      <ItemContent data-cy={`task-add-button-${dataTest}`}>
        <Icon
          data-cy={`task-add-button-icon`}
          onClick={focusInput}
          src={faPlus}
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
      </ItemContent>
    );
  },
);

const ItemContent = styled.div`
  border-bottom-style: solid;
  border-bottom-color: ${BLACK};
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 9px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const AddItemInput = styled.input`
  border: 0px;
  background-color: ${GREY};
  width: 85%;
  outline-width: 1px;
  border-radius: 2px;
  padding: 3px;
  &::placeholder {
    color: ${BLACK};
    font-weight: bold;
  }
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
`;
