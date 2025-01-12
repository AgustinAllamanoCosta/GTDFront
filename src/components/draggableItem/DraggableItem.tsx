import { useMemo } from 'react';
import { DraggableItemProps } from '../../types/types';
import { ItemWithActions } from '../itemWithActions/ItemWithActions';
import { Draggable } from '../primitives/Draggable';

export const DraggableItem = ({
  id,
  title,
  onSplit,
  onActive,
  onCancel,
}: DraggableItemProps) => {
  const itemIdentifier = useMemo(() => id, [id]);

  return (
    <Draggable
      id={itemIdentifier}
      type="item"
    >
      <ItemWithActions
        title={title}
        onSplit={onSplit}
        onActive={onActive}
        onCancel={onCancel}
      />
    </Draggable>
  );
};
