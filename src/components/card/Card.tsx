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
    <MyCard
      is_center={content_center}
      data-cy="Card-Contents"
      padding={padding}
    >
      {children}
    </MyCard>
  );
};

const MyCard = styled.div<{ is_center?: boolean; padding?: boolean }>`
  background-color: #d9d9d9;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  ${(props) => (props.is_center ? `align-items: center;` : ``)};
  ${(props) => (props.padding ? `padding: 5px;` : ``)};
`;
