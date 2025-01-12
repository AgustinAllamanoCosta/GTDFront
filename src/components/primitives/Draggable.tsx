import { ReactNode } from 'react';
import { Active, useDraggable } from '@dnd-kit/core';

type DraggableElementProps = {
  id: string;
  type: 'item' | 'active';
  children: ReactNode;
};

export const Draggable = (data: DraggableElementProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: data.id,
    data: { type: data.type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {data.children}
    </div>
  );
};
