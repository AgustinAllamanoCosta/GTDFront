import { styled } from 'styled-components';
import { CardWithTitle } from '../cardWithTile/CardWithTitle';
import { useContext } from 'react';
import { Item } from '../item/Item';
import { TaskInformationContext } from '../../contexts/taskContext';
import { SIZE } from '../../constants/size';
import { BLACK } from '../../constants/colors';
import { UserInformationContext } from '../../contexts/userContext';
import { Task } from '../../types/types';
import { useDroppable } from '@dnd-kit/core';
import { DRAGGING_IDS } from '../../views/tasks/Task';

type CancelListProps = {
  id?: string;
};

const CancelList = ({ id }: CancelListProps): React.JSX.Element => {
  const { isOver, setNodeRef } = useDroppable({ id: DRAGGING_IDS.CANCEL_TASK });
  const itemsInformation = useContext(TaskInformationContext);
  const userInformation = useContext(UserInformationContext);

  const cancelTask = itemsInformation.getCancelTaskToMap();
  const cancelComponentsLis: React.JSX.Element[] = cancelTask.map(
    (item: Task) => (
      <Item
        key={`${item.id}-${item.title}`}
        title={item.title}
      />
    ),
  );

  return (
    <InboxTaskContainer
      ref={setNodeRef}
      is_mobile={`${userInformation.isMobile}`}
      id={id}
      is_over={`${isOver}`}
      data-cy="Cancel-task-list"
    >
      <CardWithTitle
        title={'Cancel'}
        label={`total ${cancelTask.length}`}
      >
        <InboxContainer>{cancelComponentsLis}</InboxContainer>
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

const InboxTaskContainer = styled.div<{ is_mobile?: string; is_over?: string }>`
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
  ${(props) =>
    props.is_over === 'true'
      ? `
      opacity:  0.5`
      : `
      opacity: 1
  `};
`;

export default CancelList;
