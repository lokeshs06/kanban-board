import React, { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const Column = ({ title, status, tasks, onEditTask }) => {
  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      type: 'Column',
      status,
    },
  });

  return (
    <div className="flex flex-col flex-1 min-w-full lg:min-w-[250px] shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-400 last:border-b-0 lg:last:border-r-0">
      <div className="mb-2 lg:mb-4 px-4 py-3 border-b-2 border-gray-400 text-center bg-gray-50/30">
        <h2 className="font-hand text-2xl lg:text-3xl text-gray-700 tracking-wide">{title}</h2>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 flex flex-col items-center gap-4 p-3 lg:p-4 min-h-[150px] lg:min-h-[500px] transition-colors ${
          isOver ? 'bg-black/5' : ''
        }`}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <div key={task.id} className="w-full max-w-[220px]">
              <TaskCard task={task} onEdit={onEditTask} />
            </div>
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-gray-300 font-hand text-2xl opacity-50">
            Empty
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
