import { styled } from 'styled-components';
import { Button } from '../../components/button/Button';
import { Card } from '../../components/card/Card';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { FONTS } from '../../constants/size';
import { UserInformationContext } from '../../contexts/userContext';
import { UserData } from '../../types/types';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { REPO_URL } from '../../constants/routePaths';
import { BLACK } from '../../constants/colors';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
  const userInformation = useContext(UserInformationContext);
  const errorContext = useContext(ErrorHandlerContext);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      const newUser: UserData = {
        id: undefined,
        name: '',
        photoURL: '',
        accessToken: codeResponse.access_token,
      };
      userInformation.setUserData({ ...newUser });
    },
    onError: (error) => {
      console.group('Login Error');
      console.error('Login Failed:', error);
      console.groupEnd();
      userInformation.setUserData(undefined);
    },
  });

  const processLoginInfo = async () => {
    const userId: string | undefined = userInformation.userData?.id;
    if (!userId && userInformation.userData) {
      const googleResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userInformation.userData.accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${userInformation.userData.accessToken}`,
            Accept: 'application/json',
          },
        },
      );
      if (userInformation.userData) {
        const newUser: UserData = {
          id: googleResponse.data.id,
          name: googleResponse.data.name,
          photoURL: googleResponse.data.picture,
          accessToken: userInformation.userData?.accessToken,
        };
        userInformation.setUserData({ ...newUser });
      }
    } else if (userId) {
      navigate('task');
    }
  };

  useEffect(() => {
    processLoginInfo().catch((error: any) => {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    });
  }, [userInformation.userData]);

  return (
    <Container>
      <LoginCardContainer>
        <Card content_center={true}>
          <Title
            href={REPO_URL}
            target={'_blank'}
            data-cy="Login-Title"
          >
            Get Things Done
          </Title>
          <ButtonContent>
            <Button
              text="Login"
              icon={faAddressCard}
              onClick={login}
            />
          </ButtonContent>
        </Card>
      </LoginCardContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const LoginCardContainer = styled.div`
  width: 43vh;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
`;

const Title = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: ${BLACK};
  font-size: ${FONTS.TITLE};
`;

export default LoginView;
