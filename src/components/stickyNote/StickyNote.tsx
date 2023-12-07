import { useState } from 'react';
import { styled } from 'styled-components';

export type StickyNoteProps = {
  text: string;
  onConfirm?: (event: any) => void;
  onCancel?: (event: any) => void;
};

export const StickyNote = ({
  text,
  onConfirm,
  onCancel,
}: StickyNoteProps): JSX.Element => {
  const [showControls, setShowControls] = useState<boolean>(false);

  return (
    <ButtonAndNoteContainer
      onPointerEnter={(e) => setShowControls(true)}
      onPointerLeave={(e) => setShowControls(false)}
    >
      <MyNote>
        <TextContainer>
          <TextNote data-cy="stick-note-text">{text.toUpperCase()}</TextNote>
        </TextContainer>
        <ButtonContainer>
          {showControls && (
            <>
              <span>OK</span>
              <span>X</span>
            </>
          )}
        </ButtonContainer>
      </MyNote>
    </ButtonAndNoteContainer>
  );
};

const TextNote = styled.span`
  top: 30px;
  font-size: 14px;
  font-weight: 700;
`;

const TextContainer = styled.div`
  width: 100px;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const MyNote = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: #ffff99;
  width: 112px;
  height: 112px;
  border-radius: 10px;
  padding: 6px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: 124px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100px;
  z-index: 900;
`;

const ButtonAndNoteContainer = styled.div`
  width: 124px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 6px;
  padding-right: 6px;
`;
