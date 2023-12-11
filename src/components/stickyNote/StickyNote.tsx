import { useState } from 'react';
import { styled } from 'styled-components';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type StickyNoteProps = {
  text: string;
  onConfirm?: (event: any) => void;
};

export const StickyNote = ({
  text,
  onConfirm,
}: StickyNoteProps): JSX.Element => {
  return (
    <ButtonAndNoteContainer>
      <TextContainer>
        <TextNote data-cy="stick-note-text">{text.toUpperCase()}</TextNote>
      </TextContainer>
      <ButtonContainer
        onClick={onConfirm}
        data-cy="stick-note-button"
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
  font-size: 14px;
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
