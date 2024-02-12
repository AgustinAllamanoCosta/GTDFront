import { styled } from 'styled-components';
import { CardTitle } from '../cardWithTile/CardWithTitle';
import { useContext } from 'react';
import { Item } from '../item/Item';
import { TaskInformationContext } from '../../contexts/taskContext';
import { BLACK } from '../../constants/colors';
import { SIZE } from '../../constants/size';
import { UserInformationContext } from '../../contexts/userContext';
import { Task } from '../../types/types';

type CancelListProps = {
  id?: string;
};

const CancelList = ({ id }: CancelListProps): React.JSX.Element => {
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
      is_mobile={`${userInformation.isMobile}`}
      id={id}
    >
      <CardTitle
        title={'Cancel'}
        label={`total ${cancelTask.length}`}
      >
        <InboxContainer>{cancelComponentsLis}</InboxContainer>
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
      width: 360px;
  `};
`;

export default CancelList;
