import { styled } from "styled-components";
import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";
import { faAddressCard, faPlus } from "@fortawesome/free-solid-svg-icons";

const LoginView = () => {
    
  const login = () => {};
  const singUp = () => {};

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
