import { styled } from 'styled-components';
import check from '../../assets/icons/check.svg';
import percent from '../../assets/icons/percent.svg';
import X from '../../assets/icons/x.svg';
import { useState, memo, useEffect } from 'react';
import { Button } from '../button/Button';
import { ItemAddButton } from '../itemButton/ItemButton';
import { ItemProps, ItemSplitProps } from '../../types/types';
import { Item } from '../item/Item';

const SplitForm = ({
  onCancel,
  onSplit,
}: ItemSplitProps): React.JSX.Element => {
  const [newTaskOne, setNewTaskOne] = useState('');
  const [newTaskTwo, setNewTaskTwo] = useState('');

  const onChangeTaskOne = (event: any) => {
    setNewTaskOne(event.target.value);
  };

  const onChangeTaskTwo = (event: any) => {
    setNewTaskTwo(event.target.value);
  };

  const getSugesstionFromAssistance = async () => {
    console.log('message from assistance: Implement');
  };

  useEffect(() => {
    getSugesstionFromAssistance();
  }, []);

  return (
    <>
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
          onClick={onCancel}
          text="cancel"
        />
      </ButtonContainer>
    </>
  );
};

export const ItemWithActions = memo(
  ({
    title = '',
    onCancel,
    onActive,
    onSplit,
  }: ItemProps): React.JSX.Element => {
    const [showButton, setShowButton] = useState<boolean>(false);
    const [showSplit, setShowSplit] = useState<boolean>(false);

    const canShowActionsButtons = (): boolean => {
      return showButton && !showSplit;
    };

    const onCreateNewTaks = (newTaskOne: string, newTaskTwo: string) => {
      onCancelSplit();
      if (newTaskOne && newTaskTwo) onSplit(newTaskOne, newTaskTwo);
    };

    const onCancelSplit = () => {
      setShowButton(false);
      setShowSplit(false);
    };

    return (
      <ItemContainer
        onMouseLeave={() => {
          setShowButton(false);
        }}
      >
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
            onSplit={onCreateNewTaks}
            data-cy={`task-split-${title}`}
            key={`task-split-${title}`}
          />
        )}
        {canShowActionsButtons() && (
          <ButtonContainer data-cy={`task-${title}-actions-butons`}>
            <Button
              onClick={() => {
                setShowButton(false);
                onActive();
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
                onCancel();
              }}
              text="cancel"
            />
          </ButtonContainer>
        )}
      </ItemContainer>
    );
  },
);

const SplitInputContainer = styled.div`
  padding-left: 20px;
`;

const ItemContainer = styled.div`
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
  padding-left: 9px;
`;
