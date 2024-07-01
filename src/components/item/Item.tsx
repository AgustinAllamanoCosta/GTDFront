import { styled } from 'styled-components';
import faBoxes from '../../assets/icons/boxes.svg';
import { FONTS } from '../../constants/size';
import { memo } from 'react';
import { THEME_ONE } from '../../constants/colors';
import { ItemProps } from '../../types/types';

export const Item = memo(
  ({ title, onMouseOver, onClick }: ItemProps): React.JSX.Element => {
    return (
      <ItemContainer>
        <ItemContent
          data-cy={`task-${title}`}
          onMouseOver={onMouseOver}
          onClick={onClick}
        >
          <Icon
            src={faBoxes}
            alt={'Box'}
          />
          <ItemText>{title}</ItemText>
        </ItemContent>
      </ItemContainer>
    );
  },
);
const ItemContainer = styled.div``;

const ItemContent = styled.div`
  border-bottom-style: solid;
  border-bottom-color: ${THEME_ONE.boder};
  border-bottom-width: 1px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 9px;
  height: 20px;
`;

const ItemText = styled.span`
  font-family: 'InerNormal';
  font-size: ${FONTS.TEXT};
  font-weight: 550;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${THEME_ONE.background};
    border-radius: 10px;
  }
`;

const Icon = styled.img`
  filter: invert(100%);
  width: 14px;
  height: 14px;
  padding-right: 5px;
`;
