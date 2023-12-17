import { useContext } from 'react';
import { styled } from 'styled-components';
import { Task, TaskInformationContext } from '../../views/main/Main';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { StickyNote } from '../stickyNote/StickyNote';

export type ActiveTaskProps = {
  task_list: Array<Task>;
};

export const ActiveTask = (): JSX.Element => {
  const activeInformation = useContext(TaskInformationContext);

  const removeActiveTaks = (index: number) => {
    const array = [...activeInformation.activeTasks];
    array.splice(index, 1);
    activeInformation.setActiveTask(array);
  };

  return (
    <ActiveTasksContainer>
      <CardTitle
        title="Active Task"
        label={`${activeInformation.activeTasks.length}/3`}
      >
        <ActiveTaskContent data-cy="Active-task-container">
          {activeInformation.activeTasks.map((item, index) => {
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
  min-height: 139px;
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
