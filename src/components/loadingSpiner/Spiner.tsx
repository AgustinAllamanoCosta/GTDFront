import 'react';
import { styled } from 'styled-components';
import TaskList from '../../assets/icons/taskList.svg';
import { THEME_ONE } from '../../constants/colors';

export const Spinner = (): React.JSX.Element => {
  return (
    <SpinnerContainer data-cy={`spinner-container`}>
      <Icon
        src={TaskList}
        alt={'spinner'}
      />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${THEME_ONE.cardBackGround};
  border-radius: 14px;
  width: 43vh;
  height: 25vh;
`;

const Icon = styled.img`
  filter: invert(100%);

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
