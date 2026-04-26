import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil, Trash2 } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask } = useTasks();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: 'Task', task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Add the specific rotation to the existing transform if it exists, or just rotate
    rotate: `${task.rotation || 0}deg`,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${task.color || 'bg-sticky-yellow'} p-3 sm:p-4 rounded-sm shadow-md cursor-grab active:cursor-grabbing hover:shadow-lg hover:scale-105 transition-all duration-200 group relative flex flex-col w-full aspect-square max-h-40 sm:max-h-48 overflow-hidden font-hand text-gray-800 border-b-2 border-r-2 border-black/10`}
    >
      <div className="flex justify-between items-start mb-1 sm:mb-2">
        <h3 className="text-lg sm:text-xl font-bold leading-tight pr-8 drop-shadow-sm">{task.title}</h3>
        
        {/* Actions - always visible on touch/mobile, hover on desktop */}
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-10">
          <button
            onClick={handleEdit}
            className="p-1.5 sm:p-1 text-black/60 sm:text-black/40 hover:text-black/80 rounded transition-colors bg-white/30 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none"
            title="Edit task"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 sm:p-1 text-black/60 sm:text-black/40 hover:text-red-700 rounded transition-colors bg-white/30 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none"
            title="Delete task"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-lg leading-snug opacity-90 line-clamp-3">{task.description}</p>
      
      {/* Optional faint markers for tags/priority at the bottom if needed, to keep it looking like a note */}
      <div className="mt-auto flex flex-wrap gap-1 opacity-60">
        {task.tags && task.tags.slice(0, 2).map((tag, index) => (
          <span key={index} className="text-sm underline decoration-wavy">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
