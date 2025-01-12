import React, { useContext } from 'react';
import { styled } from 'styled-components';
import { CardWithTitle } from '../cardWithTile/CardWithTitle';
import { TaskInformationContext } from '../../contexts/taskContext';
import { Task } from '../../types/types';
import { BLACK } from '../../constants/colors';
import { SIZE } from '../../constants/size';
import { UserInformationContext } from '../../contexts/userContext';
import { useDroppable } from '@dnd-kit/core';
import { DRAGGING_IDS } from '../../views/tasks/Task';
import { DraggableStickNote } from '../draggableStickNote/DraggableStickNote';

const ActiveTask = (): React.JSX.Element => {
  const { isOver, setNodeRef } = useDroppable({ id: DRAGGING_IDS.ACTIVE_TASK });

  const activeInformation = useContext(TaskInformationContext);
  const userInformation = useContext(UserInformationContext);

  const removeActiveTask = (id: string) => {
    activeInformation.doneTask(id);
  };

  const generateTask = (item: Task, index: number): React.JSX.Element => {
    return (
      <DraggableStickNote
        id={item.id}
        number={index.toString()}
        data-cy={`task-number-${index}`}
        key={`${item.id}-${item.title}`}
        text={item.title}
        backgroundColor={item.backgroundColor}
        onConfirm={() => removeActiveTask(item.id)}
      />
    );
  };

  const activeTask: Array<Task> = activeInformation.getActiveTaskToMap();
  const activeTaskComponent: React.JSX.Element[] = activeTask.map(generateTask);

  return (
    <ActiveTasksContainer
      ref={setNodeRef}
      is_mobile={`${userInformation.isMobile}`}
      is_over={`${isOver}`}
    >
      <CardWithTitle
        title="Active Task"
        label={`${activeTaskComponent.length}/3`}
        data-cy="Active-task-title"
      >
        <ActiveTaskContent
          data-cy="Active-task-list"
          is_mobile={`${userInformation.isMobile}`}
        >
          {activeTaskComponent}
        </ActiveTaskContent>
      </CardWithTitle>
    </ActiveTasksContainer>
  );
};

const ActiveTaskContent = styled.div<{ is_mobile?: string }>`
  display: flex;
  min-height: 139px;
  ${(props) =>
    props.is_mobile === 'true'
      ? `
      flex-direction: row;
      justify-content: start;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        height: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background: ${BLACK};
        border-radius: 10px;
      }`
      : `
      flex-direction: column;
      justify-content: center;
      align-items: center;
  `};
`;

const ActiveTasksContainer = styled.div<{
  is_mobile?: string;
  is_over?: string;
}>`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${(props) =>
    props.is_over === 'true'
      ? `
      opacity:  0.5`
      : `
      opacity: 1
  `};
  ${(props) =>
    props.is_mobile === 'true'
      ? `
      width: ${SIZE.L};
      margin-bottom: 8px;
      min-width: 280px;
      max-width: 380px;
      max-height: 573px;`
      : `
      height: 600px;
      width: 300px;
      padding: 8px;
  `};
`;

export default ActiveTask;
