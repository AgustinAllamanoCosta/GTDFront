import { useState } from 'react';
import { styled } from 'styled-components';
import { Task } from '../../views/main/Main';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { StickyNote } from '../stickyNote/StickyNote';

export type ActiveTaskProps = {
  task_list: Array<Task>;
};

export const ActiveTask = ({ task_list }: ActiveTaskProps): JSX.Element => {
  const [activeTasks, setActiveTasks] = useState<Array<Task>>(task_list);

  return (
    <ActiveTasksContainer>
      <CardTitle
        title="Active Task"
        label={`${activeTasks.length}/3`}
      >
        <ActiveTaskContent data-cy="Active-task-container">
          {activeTasks[0] && <StickyNote text={activeTasks[0].title} />}
          {activeTasks[1] && <StickyNote text={activeTasks[1].title} />}
          {activeTasks[2] && <StickyNote text={activeTasks[2].title} />}
        </ActiveTaskContent>
      </CardTitle>
    </ActiveTasksContainer>
  );
};

const ActiveTasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 200px;
`;

const ActiveTaskContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
