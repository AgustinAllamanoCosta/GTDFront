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
      <Card>
        <MyCardHeader data-cy="User-Card-Header">
          <MyTitleAndLabelContaner>
            <MyTitleContainer>
              <MyTitle data-cy="Card-title">Getting Things Done</MyTitle>
            </MyTitleContainer>
          </MyTitleAndLabelContaner>
          <MySubTitle data-cy="Card-SubTitle">{`Hi ${userName} !`}</MySubTitle>
        </MyCardHeader>
      </Card>
    </UserCardContainer>
  );
};

const UserCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 8px;
  max-width: 500px;
  width: 95%;
  height: 100px;
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

const MyCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  padding: 5px;
`;

const MyTitleContainer = styled.div`
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

const MyTitleAndLabelContaner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MyTitle = styled.span`
  font-size: 24px;
`;

const MySubTitle = styled.span`
  font-size: 16px;
  margin: 5px;
`;
