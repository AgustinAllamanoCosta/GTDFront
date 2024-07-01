import { styled } from 'styled-components';
import { useRef, memo } from 'react';
import faPlus from '../../assets/icons/faPlus.svg';
import { THEME_ONE } from '../../constants/colors';
import { ENTER_KEY_COE } from '../../constants/keys';

type ItemAddButtonProps = {
  action: () => void;
  onChange: (event: any) => void;
  value: string;
  showCharacterLimit: boolean;
  dataTest?: string;
  disable?: boolean;
  characterLimit?: number;
};

export const ItemAddButton = memo(
  ({
    onChange,
    action,
    value,
    showCharacterLimit,
    dataTest,
    disable = false,
    characterLimit,
  }: ItemAddButtonProps): React.JSX.Element => {
    const newTaskInput = useRef<any>();

    const focusInput = () => {
      if (newTaskInput.current) {
        newTaskInput.current.focus();
      }
    };

    const onInputKeyDown = (event: any) => {
      const keyCode = event.keyCode;
      if (keyCode === ENTER_KEY_COE) {
        event.preventDefault();
        action();
      }
    };

    return (
      <ItemContent data-cy={`task-add-button-${dataTest}`}>
        <Icon
          data-cy={`task-add-button-icon`}
          onClick={focusInput}
          src={faPlus}
          alt={'Plus'}
        />
        <AddItemInput
          ref={newTaskInput}
          disabled={disable}
          data-cy={`task-add-button-input`}
          placeholder={'Add Task'}
          value={value}
          onChange={onChange}
          onKeyDown={onInputKeyDown}
        />
        {characterLimit && showCharacterLimit && (
          <CharacterCount data-cy={`task-add-button-character-counter`}>
            {characterLimit - value.length}
          </CharacterCount>
        )}
      </ItemContent>
    );
  },
);

const CharacterCount = styled.span`
  font-family: 'InerNormal';
  margin-left: 10px;
  font-weight: 550;
`;

const ItemContent = styled.div`
  border-bottom-style: solid;
  border-bottom-color: ${THEME_ONE.boder};
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
  font-family: 'InerNormal';
  font-weight: 600;
  background-color: ${THEME_ONE.cardBackGround};
  color: ${THEME_ONE.fontColor};
  width: 85%;
  border-radius: 2px;
  outline: none;
  padding: 3px;
  &::placeholder {
    color: ${THEME_ONE.fontColor};
  }
`;

const Icon = styled.img`
  filter: invert(100%);
  width: 14px;
  height: 14px;
`;
