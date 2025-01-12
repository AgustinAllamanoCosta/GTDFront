import { css, keyframes, styled } from 'styled-components';
import check from '../../assets/icons/check.svg';
import percent from '../../assets/icons/percent.svg';
import X from '../../assets/icons/x.svg';
import { useState, memo } from 'react';
import { Button } from '../button/Button';
import { ItemAddButton } from '../itemButton/ItemButton';
import { ItemWithActionsProps, ItemSplitProps } from '../../types/types';
import { Item } from '../item/Item';

const SplitForm = ({
  onCancel,
  onSplit,
}: ItemSplitProps): React.JSX.Element => {
  const [newTaskOne, setNewTaskOne] = useState('');
  const [newTaskTwo, setNewTaskTwo] = useState('');
  const [runAnimation, setRunAnimation] = useState<boolean>(false);

  const onChangeTaskOne = (event: any) => {
    setNewTaskOne(event.target.value);
  };

  const onChangeTaskTwo = (event: any) => {
    setNewTaskTwo(event.target.value);
  };

  return (
    <SplitFormContainer run_animation={`${runAnimation}`}>
      <SplitInputContainer data-cy={'split-form'}>
        <ItemAddButton
          dataTest="task1"
          action={() => {
            return;
          }}
          onChange={onChangeTaskOne}
          showCharacterLimit={true}
          value={newTaskOne}
        />
        <ItemAddButton
          dataTest="task2"
          action={() => {
            return;
          }}
          onChange={onChangeTaskTwo}
          showCharacterLimit={true}
          value={newTaskTwo}
        />
      </SplitInputContainer>
      <ButtonContainer>
        <Button
          onClick={() => {
            onSplit(newTaskOne, newTaskTwo);
          }}
          text="split"
          icon={check}
        />
        <Button
          icon={X}
          onClick={() => {
            setRunAnimation(true);
            setTimeout(onCancel, 100);
          }}
          text="cancel"
        />
      </ButtonContainer>
    </SplitFormContainer>
  );
};

export const ItemWithActions = memo(
  ({
    title = '',
    onCancel,
    onActive,
    onSplit,
  }: ItemWithActionsProps): React.JSX.Element => {
    const [showButton, setShowButton] = useState<boolean>(false);
    const [showSplit, setShowSplit] = useState<boolean>(false);
    const [runAnimation, setRunAnimation] = useState<boolean>(false);

    const canShowActionsButtons = (): boolean => {
      return showButton && !showSplit;
    };

    const onCreateNewTask = (newTaskOne: string, newTaskTwo: string) => {
      if (newTaskOne && newTaskTwo) {
        setRunAnimation(true);
        setTimeout(() => {
          onCancelSplit();
          onSplit(newTaskOne, newTaskTwo);
        }, 100);
      }
    };

    const onCancelSplit = () => {
      setShowButton(false);
      setShowSplit(false);
    };

    return (
      <ItemContainer run_animation={`${runAnimation}`}>
        <Item
          title={title}
          onClick={() => {
            setShowButton(!showButton);
          }}
        />
        {showSplit && (
          <SplitForm
            taskToSplit={title}
            onCancel={onCancelSplit}
            onSplit={onCreateNewTask}
            data-cy={`task-split-${title}`}
            key={`task-split-${title}`}
          />
        )}
        {canShowActionsButtons() && (
          <ButtonContainer data-cy={`task-${title}-actions-buttons`}>
            <Button
              onClick={() => {
                setShowButton(false);
                setRunAnimation(true);
                setTimeout(onActive, 100);
              }}
              text="active"
              icon={check}
            />
            <Button
              text="split"
              data-cy={`task-${title}-split`}
              icon={percent}
              onClick={() => {
                setShowButton(false);
                setShowSplit(true);
              }}
            />
            <Button
              data-cy={`task-${title}-cancel`}
              icon={X}
              onClick={() => {
                setShowButton(false);
                setRunAnimation(true);
                setTimeout(onCancel, 100);
              }}
              text="cancel"
            />
          </ButtonContainer>
        )}
      </ItemContainer>
    );
  },
);

const ActiveAnimation = keyframes`
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-50px);
    }
`;

const InSplitFormContainer = keyframes`
  0% {
      opacity: 0;
      transform: translateY(-250px);
    }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
`;

const OutSplitFormContainer = keyframes`
  0% {
      opacity: 1;
      transform: translateY(0);
  }
  100% {
      opacity: 0;
      transform: translateY(-250px);
  }
`;

const InButtonContainer = keyframes`
  0% {
      opacity: 0;
      transform: translateY(-250px);
    }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
`;

const SplitInputContainer = styled.div`
  padding-left: 20px;
`;

const ItemContainer = styled.div<{ run_animation: string }>`
  cursor: pointer;
  ${(props) => {
    if (props.run_animation === 'true') {
      return css`
        animation: ${ActiveAnimation} 500ms ease-out 0s 1 infinite forwards;
      `;
    }
    return null;
  }};
`;

const ButtonContainer = styled.div`
  animation: ${InButtonContainer} 500ms ease-out 0s 1 normal forwards;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
  padding-left: 9px;
`;

const SplitFormContainer = styled.div<{ run_animation: string }>`
  animation: ${(props) => {
    if (props.run_animation === 'true') {
      return css`
        ${OutSplitFormContainer} 500ms ease-out 0s 1 normal forwards;
      `;
    }
    return css`
      ${InSplitFormContainer} 500ms ease-out 0s 1 normal forwards;
    `;
  }};
`;
