import { useState } from 'react';
import { styled } from 'styled-components';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FONTS } from '../../constants /size';

export type StickyNoteProps = {
  number: string;
  text: string;
  onConfirm?: (event: any) => void;
};

export const StickyNote = ({
  number,
  text,
  onConfirm,
}: StickyNoteProps): JSX.Element => {
  const [textNoteValue, setTextNoteValue] = useState<string>(
    text.toUpperCase(),
  );

  return (
    <ButtonAndNoteContainer data-cy={`stick-note-container-${number}`}>
      <TextContainer data-cy={`stick-note-text-container-${number}`}>
        <TextNote
          data-cy={`stick-note-text-${number}`}
          value={textNoteValue}
          onChange={(e) => {
            setTextNoteValue(e.target.value);
          }}
        />
      </TextContainer>
      <ButtonContainer
        onClick={onConfirm}
        data-cy={`stick-note-button-${number}`}
      >
        <Icon
          icon={faCheck}
          onClick={onConfirm}
        />
      </ButtonContainer>
    </ButtonAndNoteContainer>
  );
};

const TextNote = styled.textarea`
  font-size: ${FONTS.TEXT};
  font-weight: 700;
  background-color: unset;
  border: unset;
  width: 100px;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
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
    background-color: #5fff5f;
  }
`;

const ButtonAndNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffff99;
  width: 112px;
  height: 112px;
  border-radius: 10px;
  margin: 6px;
`;

const Icon = styled(FontAwesomeIcon)`
  padding-left: 5px;
  padding-right: 5px;
`;
