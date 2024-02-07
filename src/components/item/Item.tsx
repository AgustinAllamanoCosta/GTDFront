import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes } from '@fortawesome/free-solid-svg-icons';
import { FONTS } from '../../constants/size';
import { memo } from 'react';
import { BLACK } from '../../constants/colors';

export type ItemProps = {
  title: string;
  onMouseOver?: (e: any) => void;
  onClick?: (e: any) => void;
};

export const Item = memo(
  ({ title, onMouseOver, onClick }: ItemProps): React.JSX.Element => {
    return (
      <ItemContainer>
        <ItemContent
          data-cy={`task-${title}`}
          onMouseOver={onMouseOver}
          onClick={onClick}
        >
          <Icon icon={faBoxes} />
          <ItemText>{title}</ItemText>
        </ItemContent>
      </ItemContainer>
    );
  },
);
const ItemContainer = styled.div``;

const ItemContent = styled.div`
  border-bottom-style: solid;
  border-bottom-color: ${BLACK};
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  padding-left: 9px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ItemText = styled.span`
  font-weight: bold;
  font-size: ${FONTS.TEXT};
  height: 20px;
`;

const Icon = styled(FontAwesomeIcon)`
  padding-left: 5px;
  padding-right: 5px;
`;
