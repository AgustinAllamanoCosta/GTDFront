import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Task } from '../../views/main/Main';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { StickyNote } from '../stickyNote/StickyNote';

export type ActiveTaskProps = {
  task_list: Array<Task>;
};

export const ActiveTask = ({ task_list }: ActiveTaskProps): JSX.Element => {
  const [activeTasks, setActiveTasks] = useState<Array<Task>>([
    {
      title: 'Some task 1',
      isComplete: false,
    },
    {
      title: 'Some task 2',
      isComplete: false,
    },
    {
      title: 'Some task 3',
      isComplete: false,
    },
  ]);

  const removeActiveTaks = (index: number) => {
    const array = [...activeTasks];
    array.splice(index, 1);
    setActiveTasks(array);
  };

  useEffect(() => {
    console.log(activeTasks);
  }, [activeTasks]);

  return (
    <ActiveTasksContainer>
      <CardTitle
        title="Active Task"
        label={`${activeTasks.length}/3`}
      >
        <ActiveTaskContent data-cy="Active-task-container">
          {activeTasks.map((item, index) => {
            console.log(item.title);
            return (
              <StickyNote
                key={`${index}-${item.title}`}
                text={item.title}
                onConfirm={(e) => removeActiveTaks(index)}
              />
            );
          })}
        </ActiveTaskContent>
      </CardTitle>
    </ActiveTasksContainer>
  );
};

const ActiveTaskContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  overflow-x: scroll;
`;

const ActiveTasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 43vh;
  margin-bottom: 8px;
`;
