import { styled } from 'styled-components';

export type CardProps = {
  content_center?: boolean;
  padding?: boolean;
  children?: string | JSX.Element | JSX.Element[];
};

export const Card = ({
  content_center,
  children,
  padding = true,
}: CardProps): JSX.Element => {
  return (
    <MyCard>
      <MyCardContent
        is_center={content_center}
        data-cy="Card-Contents"
        padding={padding}
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
  height: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 16px;
`;

const MyCardContent = styled.div<{ is_center?: boolean; padding?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  ${(props) => (props.is_center ? `align-items: center;` : ``)};
  ${(props) => (props.padding ? `padding: 5px;` : ``)};
`;
