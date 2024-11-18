import { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';

type DraggableElementProps = {
  id: string;
  children: ReactNode;
};

export const Draggable = ({ id, children }: DraggableElementProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};
