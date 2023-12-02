import { styled } from "styled-components";
import { Card } from "../card/Card";

export type CardProps = {
  title?: string;
  label?: string;
  children?: string | JSX.Element | JSX.Element[];
};

export const CardTitle = ({ title, children, label }: CardProps): JSX.Element => {

  return (
    <Card padding={false}>
      <MyTitleContainer>
        <TitleContent data-cy="Card-title">{title}</TitleContent>
        <TitleContent data-cy="Card-label">{label}</TitleContent>
      </MyTitleContainer>
      <>{children}</>
    </Card>
  );
};

const MyTitleContainer = styled.div`
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 9px;
  padding-bottom: 8px;
`;

const TitleContent = styled.span`
  font-weight: bold;
  font-size: 14px;
`;
