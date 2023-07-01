import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type ButtonProps = {
  text: string;
  icon?: IconDefinition;
  onClick: (e: any) => void;
};

export const Button = ({ text, icon, onClick }: ButtonProps): JSX.Element => {
  return (
    <ButtonContainer onClick={onClick}>
      <ButtonText>{text}</ButtonText>
      <span>  </span>
      {icon && <Icon icon={icon} />}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  cursor: pointer;
  font-weight: bold;
`;

const ButtonText = styled.span`
  font-size: 14px;
`;

const Icon = styled(FontAwesomeIcon)`
  padding-left: 5px;
  padding-right: 5px;
`;