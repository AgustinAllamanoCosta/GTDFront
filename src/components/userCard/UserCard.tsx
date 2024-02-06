import { styled } from 'styled-components';
import { FONTS, SIZE } from '../../constants/size';
import { Button } from '../button/Button';
import { BLACK, GREY } from '../../constants/colors';
import { REPO_URL } from '../../constants/routePaths';
import { useContext } from 'react';
import { UserInformationContext } from '../../contexts/userContext';

export type UserCardProps = {
  userName: string;
  userPhoto: string;
  logout: () => void;
};

export const UserCard = ({
  userName,
  userPhoto,
  logout,
}: UserCardProps): React.JSX.Element => {
  const userInformation = useContext(UserInformationContext);

  return (
    <UserCardContainer is_mobile={`${userInformation.isMobile}`}>
      {userInformation.isMobile && (
        <>
          <AvatarImage
            data-cy="Avatar-photo"
            imageurl={userPhoto}
          />
          <Bar>
            <MyAvatarDataHeader data-cy="User-Card-Header">
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
            </MyAvatarDataHeader>
          </Bar>
        </>
      )}
      {!userInformation.isMobile && (
        <BarDesk data-cy="User-Card-Header">
          <MyTitle
            href={REPO_URL}
            target={'_blank'}
            data-cy="Card-title"
          >
            Getting Things Done
          </MyTitle>
          <MyAvatarDataHeaderDesk>
            <Button
              onClick={logout}
              text="LogOut"
            />
            <MySubTitle data-cy="Card-SubTitle">{`Hi ${userName} !`}</MySubTitle>
            <AvatarImageDesk
              data-cy="Avatar-photo"
              imageurl={userPhoto}
            />
          </MyAvatarDataHeaderDesk>
        </BarDesk>
      )}
    </UserCardContainer>
  );
};

const Bar = styled.div`
  background-color: ${GREY};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
`;

const BarDesk = styled.div`
  background-color: ${GREY};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-direction: row;
  padding-left: 8px;
`;

const AvatarImageDesk = styled.div<{ imageurl: string }>`
  ${(props) => `background-image: url(${props.imageurl})`};
  background-size: cover;
  background-position: top center;
  border-radius: 100px;
  width: 34px;
  height: 34px;
  margin: 8px;
`;

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

const MyAvatarDataHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyAvatarDataHeaderDesk = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-direction: row;
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

const UserCardContainer = styled.div<{ is_mobile?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-bottom: 16px;
  ${(props) =>
    props.is_mobile === 'true'
      ? `
  margin-top: 10px;
  min-height: 90px;
  min-width: 280px;
  max-width: 380px;
  width: ${SIZE.L};
  height: ${SIZE.XS};
  `
      : `
  height: 50px;
  width: 100%;
  `};
`;
