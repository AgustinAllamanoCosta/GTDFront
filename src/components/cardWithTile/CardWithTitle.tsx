import { styled } from "styled-components";
import { Card } from "../card/Card";

export type CardProps = {
  title?: string;
  label?: string;
  joinTag?: boolean;
  children?: string | JSX.Element | JSX.Element[];
};

export const CardTitle = ({
  title,
  children,
  joinTag,
  label,
}: CardProps): JSX.Element => {
  return (
    <Card padding={false}>
      <MyTitleContainer join_tag={joinTag}>
        <TitleContent data-cy="Card-title">{title}</TitleContent>
        <TitleContent data-cy="Card-label">{label}</TitleContent>
      </MyTitleContainer>
      <>{children}</>
    </Card>
  );
};

const MyTitleContainer = styled.div<{ join_tag?: boolean }>`
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  ${(prop) => {
    return prop.join_tag ? '' : `justify-content: space-between;`;
  }}
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 9px;
  padding-bottom: 8px;
`;

const TitleContent = styled.span`
  font-weight: bold;
  font-size: 14px;
`;
