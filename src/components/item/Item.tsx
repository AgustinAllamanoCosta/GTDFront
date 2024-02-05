import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faBoxes,
  faX,
  faPercent,
} from '@fortawesome/free-solid-svg-icons';
import { FONTS } from '../../constants/size';
import { useState, memo } from 'react';
import { BLACK } from '../../constants/colors';
import { Button } from '../button/Button';
import { ItemAddButton } from '../itemButton/ItemButton';

export type ItemProps = {
  title: string;
  onCancel: () => void;
  onAcive: () => void;
  onSplit: (taskOne: string, taskTwo: string) => void;
};

type ItemSplitProps = {
  onCancel: () => void;
  onSplit: (taskOne: string, taskTwo: string) => void;
};

const SplitForm = ({ onCancel, onSplit }: ItemSplitProps) => {
  const [newTaskOne, setNewTaskOne] = useState('');
  const [newTaskTwo, setNewTaskTwo] = useState('');

  const onChangeTaskOne = (event: any) => {
    setNewTaskOne(event.target.value);
  };

  const onChangeTaskTwo = (event: any) => {
    setNewTaskTwo(event.target.value);
  };

  return (
    <>
      <SplitInputContainer data-cy={'split-form'}>
        <ItemAddButton
          dataTest="task1"
          action={() => {
            return;
          }}
          onChange={onChangeTaskOne}
          value={newTaskOne}
        />
        <ItemAddButton
          dataTest="task2"
          action={() => {
            return;
          }}
          onChange={onChangeTaskTwo}
          value={newTaskTwo}
        />
      </SplitInputContainer>
      <ButtonContainer>
        <Button
          onClick={() => {
            onSplit(newTaskOne, newTaskTwo);
          }}
          text="split"
          icon={faCheck}
        />
        <Button
          icon={faX}
          onClick={onCancel}
          text="cancel"
        />
      </ButtonContainer>
    </>
  );
};

export const Item = memo(
  ({ title, onCancel, onAcive, onSplit }: ItemProps): JSX.Element => {
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
      <ItemContainer onMouseLeave={() => setShowButton(false)}>
        <ItemContent
          data-cy={`task-${title}`}
          onMouseOver={() => setShowButton(true)}
          onClick={() => setShowButton(!showButton)}
        >
          <Icon icon={faBoxes} />
          <ItemText>{title}</ItemText>
        </ItemContent>
        {showSplit && (
          <SplitForm
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
                onAcive();
              }}
              text="active"
              icon={faCheck}
            />
            <Button
              text="split"
              data-cy={`task-${title}-split`}
              icon={faPercent}
              onClick={() => {
                setShowButton(false);
                setShowSplit(true);
              }}
            />
            <Button
              data-cy={`task-${title}-cancel`}
              icon={faX}
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

const ItemContainer = styled.div``;

const ItemContent = styled.div`
  border-bottom-style: solid;
  border-bottom-color: ${BLACK};
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  padding-left: 9px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
  padding-left: 9px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ItemText = styled.span`
  font-weight: bold;
  font-size: ${FONTS.TEXT};
  height: 20px;
`;

const Icon = styled(FontAwesomeIcon)`
  padding-left: 5px;
  padding-right: 5px;
`;
