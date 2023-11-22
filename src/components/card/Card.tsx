import { styled } from "styled-components";

export type CardProps = {
  title?: string;
  subTitle?: string;
  primary?: boolean;
  label?: JSX.Element;
  children?: string | JSX.Element | JSX.Element[];
};

export const Card = ({
  title,
  subTitle,
  primary,
  label,
  children,
}: CardProps): JSX.Element => {
  return (
    <MyCard>
      <MyCardHeader textPrimary={primary} data-cy="Card-Header" >
        <MyTitleAndLabelContaner isCenter={primary}>
          <MyTitleContainer drawLine={!primary}>
            {title && <MyTitle data-cy="Card-title" >{title}</MyTitle>}
          </MyTitleContainer>
          {label}
        </MyTitleAndLabelContaner>
        {subTitle && <MySubTitle data-cy="Card-SubTitle"  >{subTitle}</MySubTitle>}
      </MyCardHeader>
      <MyCardContent data-cy="Card-Contents"  >{children}</MyCardContent>
    </MyCard>
  );
};

const MyCard = styled.div`
  background-color: #d9d9d9;
  border-radius: 10px;
  width: 90%;
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const MyCardHeader = styled.div<{ textPrimary?: boolean }>`
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: column;
  ${(props) => (props.textPrimary ? `text-align: center` : ``)};
  font-weight: bold;
  padding: 5px;
`;

const MyTitleContainer = styled.div<{ drawLine?: boolean }>`
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  ${(props) =>
    props.drawLine
      ? `
      margin-bottom: 4px;
      border-bottom-style: solid;
      border-bottom-color: black;
      border-bottom-width: 1px;`
      : `margin-bottom: 5px;`
    }
`;

const MyTitleAndLabelContaner = styled.div<{ isCenter?: boolean }>`
  display: flex;
  flex-direction: row;
  ${(props) => (props.isCenter ? `justify-content: center` : ``)};
  align-items: center;
`;

const MyTitle = styled.span`
  font-size: 24px;
`;

const MySubTitle = styled.span`
  font-size: 16px;
  margin: 5px;
`;

const MyCardContent = styled.div`
  padding: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
`;
