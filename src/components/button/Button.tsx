import { memo } from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FONTS } from '../../constants/size';
import { BLACK } from '../../constants/colors';

export type ButtonProps = {
  text: string;
  icon?: IconDefinition;
  onClick: (e: any) => void;
};

export const Button = memo(
  ({ text, icon, onClick }: ButtonProps): JSX.Element => {
    return (
      <ButtonContainer
        data-cy={`button-${text}`}
        onClick={onClick}
      >
        <ButtonText data-cy="button-text">{text}</ButtonText>
        {icon && (
          <Icon
            data-cy="button-icon"
            icon={icon}
          />
        )}
      </ButtonContainer>
    );
  },
);

const ButtonContainer = styled.div`
  display: inline-flex;
  width: min-content;
  flex-direction: row;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-bottom-style: solid;
  border-bottom-color: ${BLACK};
  border-bottom-width: 1px;
  cursor: pointer;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.span`
  font-size: ${FONTS.TEXT};
`;

const Icon = styled(FontAwesomeIcon)`
  padding-left: 5px;
  padding-right: 5px;
`;
