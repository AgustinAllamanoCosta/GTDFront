import { useMemo } from 'react';
import { THEME_ONE } from '../../constants/colors';
import { DraggableStickyNoteProps } from '../../types/types';
import { Draggable } from '../primitives/Draggable';
import { StickyNote } from '../stickyNote/StickyNote';

export const DraggableStickNote = ({
  id,
  number,
  text,
  backgroundColor = THEME_ONE.stickBackGround,
  onConfirm,
}: DraggableStickyNoteProps
) => {
  const stickNoteIdentifier = useMemo(() => id, [id]);
  return (
    <Draggable id={stickNoteIdentifier} type="active">
      <StickyNote
        number={number}
        text={text}
        backgroundColor={backgroundColor}
        onConfirm={onConfirm}
      />
    </Draggable>
  );
};
