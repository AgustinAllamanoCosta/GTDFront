import { useState, memo, useContext } from 'react';
import { styled } from 'styled-components';
import faCheck from '../../assets/icons/check.svg';
import { FONTS } from '../../constants/size';
import { THEME_ONE } from '../../constants/colors';
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
            is_mobile={`${userInformation.isMobile}`}
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

const TextNote = styled.textarea<{ is_mobile?: string }>`
  font-size: ${FONTS.TEXT};
  font-weight: 700;
  color: ${THEME_ONE.fontColor};
  background-color: unset;
  border: unset;
  outline: unset;
  height: 100%;
  ${(props) =>
    props.is_mobile === 'true'
      ? `
      width: 100px;
  `
      : `
      width: 250px;
  `};
  resize: none;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${THEME_ONE.backgorund};
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
  border-top-color: ${THEME_ONE.boder};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 16px;
  padding: 3px;
  &:hover {
    background-color: ${THEME_ONE.stickButton};
  }
`;

const ButtonAndNoteContainer = styled.div<{ is_mobile?: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${THEME_ONE.stickBackGround};
  -webkit-box-shadow: 5px 5px 0px 0px rgba(7, 15, 43, 1);
  -moz-box-shadow: 5px 5px 0px 0px rgba(7, 15, 43, 1);
  box-shadow: 5px 5px 0px 0px rgba(7, 15, 43, 1);
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
  filter: invert(100%);
  width: 14px;
  height: 15px;
`;
