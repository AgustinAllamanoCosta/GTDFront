import { styled } from 'styled-components';
import { CardWithTitle } from '../cardWithTile/CardWithTitle';
import { useContext } from 'react';
import { Item } from '../item/Item';
import { TaskInformationContext } from '../../contexts/taskContext';
import { BLACK } from '../../constants/colors';
import { SIZE } from '../../constants/size';
import { UserInformationContext } from '../../contexts/userContext';
import { Task } from '../../types/types';
import { useDroppable } from '@dnd-kit/core';
import { DRAGGING_IDS } from '../../views/tasks/Task';

type DoneListProps = {
  id?: string;
};

const DoneList = ({ id }: DoneListProps): React.JSX.Element => {
  const { isOver, setNodeRef } = useDroppable({ id: DRAGGING_IDS.DONE_TASK });
  const itemsInformation = useContext(TaskInformationContext);
  const userInformation = useContext(UserInformationContext);

  const doneTasks = itemsInformation.getDoneTaskToMap();
  const doneComponentsList: React.JSX.Element[] = doneTasks.map(
    (item: Task) => (
      <Item
        key={`${item.id}-${item.title}`}
        title={item.title}
      />
    ),
  );

  return (
    <InboxTaskContainer
      is_mobile={`${userInformation.isMobile}`}
      id={id}
      ref={setNodeRef}
      is_over={`${isOver}`}
      data-cy={'Done-task-list'}
    >
      <CardWithTitle
        title={'Done'}
        label={`total ${doneTasks.length}`}
      >
        <InboxContainer >{doneComponentsList}</InboxContainer>
      </CardWithTitle>
    </InboxTaskContainer>
  );
};

const InboxContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${BLACK};
    border-radius: 10px;
  }
`;

const InboxTaskContainer = styled.div<{ is_mobile?: string, is_over?:string }>`
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
      height: ${SIZE.L};
      width: ${SIZE.L};
      min-width: 280px;
      max-width: 380px;
      min-height: 400px;
  `
      : `
      height: 600px;
      width: 430px;
      padding: 8px;
  `};
`;

export default DoneList;
