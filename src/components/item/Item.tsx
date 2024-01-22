import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBoxes, faX } from '@fortawesome/free-solid-svg-icons';
import { FONTS } from '../../constants/size';
import { useState } from 'react';
import { BLACK } from '../../constants/colors';

export type ItemProps = {
  title: String;
  onCancel: () => void;
  onAcive: () => void;
};

export const Item = ({ title, onCancel, onAcive }: ItemProps): JSX.Element => {
  const [showButton, setShowButton] = useState<boolean>(false);

  return (
    <ItemContainer onMouseLeave={() => setShowButton(false)}>
      <ItemContent
        data-cy={`task-${title}`}
        onMouseOver={() => setShowButton(true)}
        onClick={() => setShowButton(!showButton)}
      >
        <Icon icon={faBoxes} />
        <ItemText>{title}</ItemText>
      </ItemContent>
      {showButton && (
        <ButtonContainer>
          <Icon
            data-cy={`task-${title}-active`}
            icon={faCheck}
            onClick={() => {
              setShowButton(false);
              onAcive();
            }}
          />
          <Icon
            data-cy={`task-${title}-cancel`}
            icon={faX}
            onClick={() => {
              setShowButton(false);
              onCancel();
            }}
          />
        </ButtonContainer>
      )}
    </ItemContainer>
  );
};

const ItemContainer = styled.div``;

const ItemContent = styled.div`
  border-bottom-style: solid;
  border-bottom-color: ${BLACK};
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  padding-left: 9px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 9px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ItemText = styled.span`
  font-weight: bold;
  font-size: ${FONTS.TEXT};
  height: 20px;
`;

const Icon = styled(FontAwesomeIcon)`
  padding-left: 5px;
  padding-right: 5px;
`;
