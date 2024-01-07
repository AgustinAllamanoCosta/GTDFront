import { styled } from 'styled-components';

export type CardProps = {
  content_center?: boolean;
  padding?: boolean;
  children?: string | JSX.Element | JSX.Element[];
};

export const Card = ({
  children,
  content_center,
  padding = true,
}: CardProps): JSX.Element => {
  return (
    <MyCard
      is_center={`${content_center}`}
      padding={`${padding}`}
      data-cy="Card-Contents"
    >
      {children}
    </MyCard>
  );
};

const MyCard = styled.div<{ is_center?: string; padding?: string }>`
  background-color: #d9d9d9;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  ${(props) => (props.is_center === 'true' ? `align-items: center;` : ``)};
  ${(props) => (props.padding === 'true' ? `padding: 5px;` : ``)};
`;
