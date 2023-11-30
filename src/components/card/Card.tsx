import { styled } from 'styled-components';

export type CardProps = {
  title?: string;
  sub_title?: string;
  primary?: boolean;
  label?: JSX.Element;
  content_center?: boolean;
  children?: string | JSX.Element | JSX.Element[];
};

export const Card = ({
  title,
  sub_title,
  primary,
  label,
  content_center,
  children,
}: CardProps): JSX.Element => {
  return (
    <MyCard>
      <MyCardHeader
        text_primary={primary}
        data-cy="Card-Header"
      >
        <MyTitleAndLabelContaner is_center={primary}>
          <MyTitleContainer draw_line={!primary}>
            {title && <MyTitle data-cy="Card-title">{title}</MyTitle>}
          </MyTitleContainer>
          {label}
        </MyTitleAndLabelContaner>
        {sub_title && (
          <MySubTitle data-cy="Card-SubTitle">{sub_title}</MySubTitle>
        )}
      </MyCardHeader>
      <MyCardContent
        is_center={content_center}
        data-cy="Card-Contents"
      >
        {children}
      </MyCardContent>
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
  margin-bottom: 16px;
`;

const MyCardHeader = styled.div<{ text_primary?: boolean }>`
  display: flex;
  flex-direction: column;
  ${(props) => (props.text_primary ? `align-items: center` : ``)};
  font-weight: bold;
  padding: 5px;
`;

const MyTitleContainer = styled.div<{ draw_line?: boolean }>`
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  ${(props) =>
    props.draw_line
      ? `
      margin-bottom: 4px;
      border-bottom-style: solid;
      border-bottom-color: black;
      border-bottom-width: 1px;`
      : `margin-bottom: 5px;`}
`;

const MyTitleAndLabelContaner = styled.div<{ is_center?: boolean }>`
  display: flex;
  flex-direction: row;
  ${(props) => (props.is_center ? `justify-content: center;` : ``)};
  align-items: center;
`;

const MyTitle = styled.span`
  font-size: 24px;
`;

const MySubTitle = styled.span`
  font-size: 16px;
  margin: 5px;
`;

const MyCardContent = styled.div<{ is_center?: boolean }>`
  padding: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  ${(props) => (props.is_center ? `align-items: center;` : ``)};
`;
