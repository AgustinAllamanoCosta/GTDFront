import { useContext } from 'react';
import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { StickyNote } from '../stickyNote/StickyNote';
import { TaskInformationContext } from '../../contexts/taskContext';
import { Task } from '../../types/types';
import { BLACK } from '../../constants /colors';

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

const ActiveTaskContent = styled.div`
  display: flex;
  min-height: 139px;
  flex-direction: row;
  justify-content: start;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${BLACK};
    border-radius: 10px;
  }
`;

const ActiveTasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 43vh;
  margin-bottom: 8px;
`;
