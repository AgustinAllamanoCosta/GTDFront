import { styled } from 'styled-components';
import { Card } from '../card/Card';
import { FONTS } from '../../constants /size';
import { Button } from '../button/Button';

export type UserCardProps = {
  userName: string;
  userPhoto: string;
  logout: () => void;
};

export const UserCard = ({
  userName,
  userPhoto,
  logout,
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
          <Button
            onClick={logout}
            text="LogOut"
          />
        </MyCardHeader>
      </Card>
    </UserCardContainer>
  );
};

const AvatarImage = styled.div<{ imageurl: string }>`
  ${(props) => `background-image: url(${props.imageurl})`};
  background-size: cover;
  background-position: top center;
  border-radius: 100px;
  width: 110px;
  height: 90px;
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
  font-size: ${FONTS.TITLE};
`;

const MySubTitle = styled.span`
  font-size: ${FONTS.TEXT};
  margin: 5px;
`;

const UserCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-bottom: 16px;
  width: 43vh;
  height: 10vh;
`;
