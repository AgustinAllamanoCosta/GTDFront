import { memo } from 'react';
import { styled } from 'styled-components';
import { THEME_ONE } from '../../constants/colors';
import { CardProps } from '../../types/types';

export const Card = memo(
  ({
    children,
    content_center,
    padding = true,
  }: CardProps): React.JSX.Element => {
    return (
      <MyCard
        is_center={`${content_center}`}
        padding={`${padding}`}
        data-cy="Card-Contents"
      >
        {children}
      </MyCard>
    );
  },
);

const MyCard = styled.div<{ is_center?: string; padding?: string }>`
  background-color: ${THEME_ONE.cardBackGround};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  ${(props) => (props.is_center === 'true' ? `align-items: center;` : ``)};
  ${(props) => (props.is_center === 'true' ? `justify-content: center;` : ``)};
  ${(props) => (props.padding === 'true' ? `padding: 5px;` : ``)};
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
`;
