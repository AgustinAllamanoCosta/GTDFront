import { useContext } from 'react';
import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { StickyNote } from '../stickyNote/StickyNote';
import { TaskInformationContext } from '../../contexts/taskContext';
import { Task } from '../../types/types';

export const ActiveTask = (): JSX.Element => {
  const activeInformation = useContext(TaskInformationContext);

  const removeActiveTaks = (index: number) => {
    //TODO: improve this :D
    activeInformation.items.forEach((task: Task) => {
      if (task.id === activeInformation.activeTasks[index].id) {
        task.isComplete = true;
      }
    });
    activeInformation.setItems([...activeInformation.items]);
  };

  return (
    <ActiveTasksContainer>
      <CardTitle
        title="Active Task"
        label={`${activeInformation.activeTasks.length}/3`}
        data-cy="Active-task-title"
      >
        <ActiveTaskContent data-cy="Active-task-list">
          {activeInformation.activeTasks.map((item: Task, index: number) => {
            return (
              <StickyNote
                number={index.toString()}
                data-cy={`task-number-${index}`}
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

//TODO: PIXELS AND % TO REMOVE
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
