import { styled } from 'styled-components';

export type StickyNoteProps = {
  text: string;
};

export const StickyNote = ({ text }: StickyNoteProps): JSX.Element => {
  return (
    <MyNote>
      <TextContainer data-cy="stick-note-text">
        {text.toUpperCase()}
      </TextContainer>
    </MyNote>
  );
};

const TextContainer = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

const MyNote = styled.div`
  background-color: #ffff99;
  width: 100px;
  height: 100px;
  padding: 12px;
  border-radius: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 30px;
  }
  margin: 12px;
`;
