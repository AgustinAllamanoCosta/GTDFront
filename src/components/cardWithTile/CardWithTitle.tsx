import { styled } from 'styled-components';
import { Card } from '../card/Card';
import { FONTS } from '../../constants/size';
import { THEME_ONE } from '../../constants/colors';
import { memo } from 'react';

export type CardProps = {
  title?: string;
  label?: string;
  joinTag?: boolean;
  children?: string | React.JSX.Element | React.JSX.Element[];
};

export const CardTitle = memo(
  ({ title, children, joinTag, label }: CardProps): React.JSX.Element => {
    return (
      <Card padding={false}>
        <MyTitleContainer join_tag={joinTag}>
          <TitleContent data-cy="Card-title">{title}</TitleContent>
          <TitleContent data-cy="Card-label">{label}</TitleContent>
        </MyTitleContainer>
        <>{children}</>
      </Card>
    );
  },
);

const MyTitleContainer = styled.div<{ join_tag?: boolean }>`
  border-bottom-style: solid;
  border-bottom-color: ${THEME_ONE.boder};
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  ${(prop) => {
    return prop.join_tag ? '' : `justify-content: space-between;`;
  }}
  padding-left:   8px;
  padding-right: 8px;
  padding-top: 9px;
  padding-bottom: 8px;
`;

const TitleContent = styled.span`
  font-weight: bold;
  font-size: ${FONTS.SUB_TITLE};
`;
