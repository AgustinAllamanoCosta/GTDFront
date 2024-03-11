import { useState, memo, useContext } from 'react';
import { styled } from 'styled-components';
import faCheck from '../../assets/icons/check.svg';
import { FONTS } from '../../constants/size';
import { BLACK, GREEN, YELLOW } from '../../constants/colors';
import { UserInformationContext } from '../../contexts/userContext';

export type StickyNoteProps = {
  number: string;
  text: string;
  onConfirm?: (event: any) => void;
};

export const StickyNote = memo(
  ({ number, text, onConfirm }: StickyNoteProps): React.JSX.Element => {
    const userInformation = useContext(UserInformationContext);

    const [textNoteValue, setTextNoteValue] = useState<string>(
      text.toUpperCase(),
    );

    const onChange = (event: any) => {
      setTextNoteValue(event.target.value);
    };

    return (
      <ButtonAndNoteContainer
        data-cy={`stick-note-container-${number}`}
        is_mobile={`${userInformation.isMobile}`}
      >
        <TextContainer data-cy={`stick-note-text-container-${number}`}>
          <TextNote
            data-cy={`stick-note-text-${number}`}
            value={textNoteValue}
            onChange={onChange}
          />
        </TextContainer>
        <ButtonContainer
          onClick={onConfirm}
          data-cy={`stick-note-button-${number}`}
        >
          <Icon
            src={faCheck}
            onClick={onConfirm}
            alt={'Check'}
          />
        </ButtonContainer>
      </ButtonAndNoteContainer>
    );
  },
);

const TextNote = styled.textarea`
  font-size: ${FONTS.TEXT};
  font-weight: 700;
  background-color: unset;
  border: unset;
  outline: unset;
  height: 100%;
  overflow-y: scroll;
  resize: none;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${BLACK};
    border-radius: 10px;
  }
`;

const TextContainer = styled.div`
  width: 100px;
  height: 100%;
  padding: 6px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: 1px solid;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 16px;
  padding: 3px;
  &:hover {
    background-color: ${GREEN};
  }
`;

const ButtonAndNoteContainer = styled.div<{ is_mobile?: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${YELLOW};
  ${(props) =>
    props.is_mobile === 'true'
      ? `
      width: 112px;
      height: 112px;
  `
      : `
      width: 250px;
      height: 150px; 
  `};
  border-radius: 10px;
  margin: 6px;
`;

const Icon = styled.img`
  width: 14px;
  height: 15px;
`;
