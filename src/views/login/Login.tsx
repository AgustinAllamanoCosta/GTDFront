import { styled } from "styled-components";
import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";
import { faAddressCard, faPlus } from "@fortawesome/free-solid-svg-icons";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";

const LoginView = () => {

  const singUp = () => {
    console.group('SingUp');
    console.info('SignUp executing');
    console.groupEnd();
  };

  const [user, setUser] = useState<any>();
  const [profile, setProfile] = useState<any>();

  const login = useGoogleLogin({
    onSuccess: (codeResponse:any) => {setUser(codeResponse)},
    onError: (error) => {
      console.group("Login Error");
      console.error("Login Failed:", error);
      console.groupEnd()
    },
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <Card title="Get Things Done" primary={true}>
      <ButtonsContainer>
        <Button text="Login" icon={faAddressCard} onClick={login} />
        <Button text="SingUp" icon={faPlus} onClick={singUp} />
      </ButtonsContainer>
    </Card>
  );
};

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;

export default LoginView;
