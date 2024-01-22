import { styled } from 'styled-components';
import { Card } from '../card/Card';
import { FONTS } from '../../constants/size';
import { Button } from '../button/Button';
import { BLACK } from '../../constants/colors';
import { SIZE } from '../../constants/size';
import { REPO_URL } from '../../constants/routePaths';

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
      <Card padding={false}>
        <MyCardHeader data-cy="User-Card-Header">
          <MyTitle
            href={REPO_URL}
            target={'_blank'}
            data-cy="Card-title"
          >
            Getting Things Done
          </MyTitle>
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
  min-width: 100px;
  min-height: 100px;
  width: 15vh;
  height: 11vh;
  margin: 8px;
`;
const MyCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const MyTitle = styled.a`
  font-size: 24px;
  text-decoration: none;
  color: ${BLACK};
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
  margin-top: 10px;
  min-height: 90px;
  min-width: 280px;
  max-width: 380px;
  width: ${SIZE.L};
  height: ${SIZE.XS};
`;
