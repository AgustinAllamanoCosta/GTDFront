import { styled } from 'styled-components';
import { Card } from '../card/Card';

export type UserCardProps = {
  userName: string;
  userPhoto: any;
};

export const UserCard = ({
  userName,
  userPhoto,
}: UserCardProps): JSX.Element => {
  return (
    <UserCardContainer>
      <AvatarImage
        data-cy="Avatar-photo"
        imageurl={userPhoto}
      />
      <Card
        title="Getting Things Done"
        primary={true}
        sub_title={userName}
      />
    </UserCardContainer>
  );
};

const UserCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px;
`;

const AvatarImage = styled.div<{ imageurl: string }>`
  ${(props) => `background-image: url(${props.imageurl})`};
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 8px;
`;
