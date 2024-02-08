import 'react';
import { styled } from 'styled-components';
import TaskList from '../../assets/icons/taskList.svg';
import { GREY } from '../../constants/colors';

export const Spiner = (): React.JSX.Element => {
  return (
    <ButtonAndNoteContainer data-cy={`spiner-container`}>
      <Icon
        src={TaskList}
        alt={'spiner'}
      />
    </ButtonAndNoteContainer>
  );
};

const ButtonAndNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${GREY};
  border-radius: 14px;
  width: 43vh;
  height: 25vh;
`;

const Icon = styled.img`
  @keyframes animating-multiple-properties {
    from {
      transform: translateX(-50px);
    }
    to {
      transform: translateX(70px);
    }
  }
  width: 35px;
  height: 40px;
  animation: 1s linear 1s infinite alternate animating-multiple-properties;
`;
