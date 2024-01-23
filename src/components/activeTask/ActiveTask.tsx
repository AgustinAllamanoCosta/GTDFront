import { useContext } from 'react';
import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { StickyNote } from '../stickyNote/StickyNote';
import { TaskInformationContext } from '../../contexts/taskContext';
import { Task } from '../../types/types';
import { BLACK } from '../../constants/colors';
import { SIZE } from '../../constants/size';
import { UserInformationContext } from '../../contexts/userContext';

export const ActiveTask = (): JSX.Element => {
  const activeInformation = useContext(TaskInformationContext);
  const userInformation = useContext(UserInformationContext);

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
    <ActiveTasksContainer is_mobile={`${userInformation.isMobile}`}>
      <CardTitle
        title="Active Task"
        label={`${activeInformation.activeTasks.length}/3`}
        data-cy="Active-task-title"
      >
        <ActiveTaskContent
          data-cy="Active-task-list"
          is_mobile={`${userInformation.isMobile}`}
        >
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
      }
  `
      : `
      flex-direction: column;
      justify-content: center;
      align-items: center;
  `};
`;

const ActiveTasksContainer = styled.div<{ is_mobile?: string }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${(props) =>
    props.is_mobile === 'true'
      ? `
      width: ${SIZE.L};
      margin-bottom: 8px;
      min-width: 280px;
      max-width: 380px;
      max-height: 573px;
  `
      : `
      height: 580px;
      width: 210px;
  `};
`;
