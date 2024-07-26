import { styled } from 'styled-components';
import { Button } from '../../components/button/Button';
import { Card } from '../../components/card/Card';
import faAddressCard from '../../assets/icons/addressCard.svg';
import { FONTS } from '../../constants/size';
import { REPO_URL } from '../../constants/routePaths';
import { THEME_ONE } from '../../constants/colors';
import { useGoogleLoginActions } from '../../hooks/useGoogleLogin';
import { TASK } from '../../constants/routePaths';
import { configuration } from '../../config/appConfig';
import { IS_END_TO_END, IS_LOCAL_TESTING } from '../../constants/environment';
import { useState } from 'react';

const LoginView = () => {
  const { loginGoogle, loginWithEmailAndPass } = useGoogleLoginActions(TASK);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const isLocalOrEndToEnd = (): Boolean => {
    return (
      configuration.environment === IS_LOCAL_TESTING ||
      configuration.environment === IS_END_TO_END
    );
  };

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
            {isLocalOrEndToEnd() ? (
              <>
                <InputContent>
                  <LoginInput
                    data-cy="input-email"
                    type="email"
                    placeholder={'Email'}
                    onChange={(event) => {
                      setUserEmail(event.target.value);
                    }}
                  />
                </InputContent>
                <InputContent>
                  <LoginInput
                    data-cy="input-pass"
                    type="password"
                    placeholder={'Password'}
                    onChange={(event) => {
                      setUserPassword(event.target.value);
                    }}
                  />
                </InputContent>

                <Button
                  text="Login"
                  icon={faAddressCard}
                  onClick={() => {
                    loginWithEmailAndPass(userEmail, userPassword);
                  }}
                />
              </>
            ) : (
              <Button
                text="Login With Google"
                icon={faAddressCard}
                onClick={loginGoogle}
              />
            )}
          </ButtonContent>
        </Card>
      </LoginCardContainer>
    </Container>
  );
};

const InputContent = styled.div`
  border-bottom-style: solid;
  border-bottom-color: ${THEME_ONE.boder};
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 5px;
  margin: 5px;
`;

const LoginInput = styled.input`
  border: 0px;
  font-family: 'InerNormal';
  font-weight: 600;
  background-color: ${THEME_ONE.cardBackGround};
  color: ${THEME_ONE.fontColor};
  border-radius: 2px;
  outline: none;
  padding: 3px;
  &::placeholder {
    color: ${THEME_ONE.fontColor};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const LoginCardContainer = styled.div`
  width: 43vh;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Title = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: ${THEME_ONE.fontColor};
  font-size: ${FONTS.TITLE};
`;

export default LoginView;
