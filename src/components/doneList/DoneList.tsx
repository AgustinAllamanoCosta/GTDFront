import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useContext } from 'react';
import { Item } from '../item/Item';
import { v4 as uuidv4 } from 'uuid';
import { TaskInformationContext } from '../../contexts/taskContext';
import { BLACK } from '../../constants/colors';
import { SIZE } from '../../constants/size';
import { UserInformationContext } from '../../contexts/userContext';
import { Task } from '../../types/types';

type DoneListProps = {
  id?: string;
};

const DoneList = ({ id }: DoneListProps): React.JSX.Element => {
  const itemsInformation = useContext(TaskInformationContext);
  const userInformation = useContext(UserInformationContext);

  const doneTasks = itemsInformation.getDoneTaskToMap();
  const doneComponentsList: React.JSX.Element[] = doneTasks.map(
    (item: Task) => (
      <Item
        key={`${uuidv4()}-${item.title}`}
        title={item.title}
      />
    ),
  );

  return (
    <InboxTaskContainer
      is_mobile={`${userInformation.isMobile}`}
      id={id}
    >
      <CardTitle
        title={'Done'}
        label={`total ${doneTasks.length}`}
      >
        <InboxContainer>{doneComponentsList}</InboxContainer>
      </CardTitle>
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

const InboxTaskContainer = styled.div<{ is_mobile?: string }>`
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
  `};
`;

export default DoneList;
