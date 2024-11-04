import { memo } from 'react';
import { styled } from 'styled-components';
import { FONTS } from '../../constants/size';
import { THEME_ONE } from '../../constants/colors';
import { ButtonProps } from '../../types/types';

export const Button = memo(
  ({ text, icon, onClick }: ButtonProps): React.JSX.Element => {
    return (
      <ButtonContainer
        data-cy={`button-${text}`}
        data-testid={`button-${text}`}
        onClick={onClick}
      >
        <ButtonText data-cy="button-text">{text}</ButtonText>
        {icon && (
          <Icon
            data-cy="button-icon"
            alt={'Button Icon'}
            src={icon}
          />
        )}
      </ButtonContainer>
    );
  },
);

const ButtonContainer = styled.div`
  display: inline-flex;
  width: auto;
  flex-direction: row;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-bottom-style: solid;
  border-bottom-color: ${THEME_ONE.boder};
  border-bottom-width: 1px;
  cursor: pointer;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.span`
  font-size: ${FONTS.TEXT};
`;

const Icon = styled.img`
  filter: invert(100%);
  width: 14px;
  height: 14px;
  padding-left: 5px;
`;
