import { styled } from "styled-components";
import { useRef, memo, useState } from "react";
import faPlus from "../../assets/icons/faPlus.svg";
import { BLACK, GREY } from "../../constants/colors";
import { ENTER_KEY_COE } from "../../constants/keys";

type ItemAddButtonProps = {
  action: (event: any) => void;
  onChange: (event: any) => void;
  value: string;
  dataTest?: string;
  disable?: boolean;
  characterLimit?: number;
};

export const ItemAddButton = memo(
  ({
    onChange,
    action,
    value,
    dataTest,
    disable = false,
    characterLimit,
  }: ItemAddButtonProps): React.JSX.Element => {
    const newTaskInput = useRef<any>();
    const [showCharacterLimit, setShowCharacterLimit] = useState(false);

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

    const displayCharacterLimit = (): boolean => {
      return characterLimit != undefined && showCharacterLimit;
    };

    return (
      <ItemContent data-cy={`task-add-button-${dataTest}`}>
        <Icon
          data-cy={`task-add-button-icon`}
          onClick={focusInput}
          src={faPlus}
          alt={"Plus"}
        />
        <AddItemInput
          ref={newTaskInput}
          disabled={disable}
          data-cy={`task-add-button-input`}
          placeholder={"Add Task"}
          onBlur={(e) => {
            action(e);
            setShowCharacterLimit(false);
          }}
          onFocus={(e) => {
            setShowCharacterLimit(true);
          }}
          value={value}
          onChange={onChange}
          onKeyDown={onInputKeyDown}
        />
        {displayCharacterLimit() && (
          <CharacterCount>{characterLimit - value.length}</CharacterCount>
        )}
      </ItemContent>
    );
  }
);

const CharacterCount = styled.span`
  font-family: "Inner Normal";
  margin-left: 10px;
  font-weight: 550;
`;

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
