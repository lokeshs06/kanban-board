import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useTasks } from '../context/TaskContext';
import Column from './Column';
import TaskCard from './TaskCard';

const COLUMNS = [
  { id: 'todo', title: 'To do' },
  { id: 'inProgress', title: 'In progress' },
  { id: 'done', title: 'Done' },
];

const Board = ({ onEditTask }) => {
  const { tasks, moveTask } = useTasks();
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isActiveTask) return;

    // Dropping a task over another task
    if (isOverTask) {
      const activeTaskIndex = tasks.findIndex((t) => t.id === activeId);
      const overTaskIndex = tasks.findIndex((t) => t.id === overId);
      const activeTaskStatus = tasks[activeTaskIndex].status;
      const overTaskStatus = tasks[overTaskIndex].status;

      if (activeTaskStatus !== overTaskStatus) {
        // Find index relative to the new column
        const overTask = tasks[overTaskIndex];
        const tasksInNewStatus = tasks.filter(t => t.status === overTaskStatus);
        const overIndexInNewStatus = tasksInNewStatus.findIndex(t => t.id === overId);
        
        let newIndex;
        // Determine whether to place before or after based on mouse position relative to card
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
          
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndexInNewStatus >= 0 ? overIndexInNewStatus + modifier : tasksInNewStatus.length;
        
        moveTask(activeId, overTaskStatus, newIndex);
      }
    }

    // Dropping a task over an empty column
    if (isOverColumn) {
      const activeTaskIndex = tasks.findIndex((t) => t.id === activeId);
      const activeTaskStatus = tasks[activeTaskIndex].status;
      const overColumnStatus = over.data.current?.status;

      if (activeTaskStatus !== overColumnStatus) {
        // Appending to the bottom of the new column
        moveTask(activeId, overColumnStatus);
      }
    }
  };

  const handleDragEnd = (event) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';

    if (isActiveTask && isOverTask) {
      const activeTaskIndex = tasks.findIndex((t) => t.id === activeId);
      const overTaskIndex = tasks.findIndex((t) => t.id === overId);
      const activeTaskStatus = tasks[activeTaskIndex].status;
      const overTaskStatus = tasks[overTaskIndex].status;

      if (activeTaskStatus === overTaskStatus) {
        // Reordering within the same column
        const tasksInSameStatus = tasks.filter(t => t.status === activeTaskStatus);
        const oldIndex = tasksInSameStatus.findIndex(t => t.id === activeId);
        const newIndex = tasksInSameStatus.findIndex(t => t.id === overId);
        
        if (oldIndex !== newIndex) {
            moveTask(activeId, activeTaskStatus, newIndex);
        }
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-center w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 relative z-10 pt-6 md:pt-10 pb-10 md:pb-20">
        {/* Whiteboard Frame */}
        <div className="flex flex-col lg:flex-row w-full bg-white rounded-xl border-[8px] md:border-[12px] lg:border-[16px] border-gray-400 shadow-2xl overflow-hidden min-h-[400px] lg:min-h-[600px] relative">
          {/* Top bezel shadow for realism */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
          
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              status={col.id}
              title={col.title}
              tasks={tasks.filter((t) => t.status === col.id)}
              onEditTask={onEditTask}
            />
          ))}
        </div>
      </div>
      
      <DragOverlay dropAnimation={null}>
        {activeTask ? (
            <div className="scale-105 shadow-2xl" style={{ transform: `rotate(${activeTask.rotation || 0}deg)` }}>
                <TaskCard task={activeTask} onEdit={() => {}} />
            </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
