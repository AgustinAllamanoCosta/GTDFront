import { ReactNode, useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';

type DroppableElementProps = {
  id: string;
  children: ReactNode;
};

export const Droppable = ({ id, children }: DroppableElementProps) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = useMemo(
    () => ({
      opacity: isOver ? 0.5 : 1,
    }),
    [isOver],
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
    >
      {children}
    </div>
  );
};
