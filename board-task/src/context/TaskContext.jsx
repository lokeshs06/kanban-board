import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const stickyColors = ['bg-sticky-pink', 'bg-sticky-orange', 'bg-sticky-yellow', 'bg-sticky-green', 'bg-sticky-blue'];

const getRandomStickyProps = () => {
  const color = stickyColors[Math.floor(Math.random() * stickyColors.length)];
  const rotation = Math.floor(Math.random() * 10) - 5; // -5 to +5 degrees
  return { color, rotation };
};

const initialTasks = [
  {
    id: uuidv4(),
    title: 'Research Competitors',
    description: 'Analyze top 3 competitors in the market',
    status: 'todo',
    tags: ['Research'],
    priority: 'high',
    ...getRandomStickyProps()
  },
  {
    id: uuidv4(),
    title: 'Design UI Mockups',
    description: 'Create mockups for the new landing page',
    status: 'inProgress',
    tags: ['Design'],
    priority: 'medium',
    ...getRandomStickyProps()
  },
  {
    id: uuidv4(),
    title: 'Setup Project Repository',
    description: 'Initialize Git repo and add initial configuration',
    status: 'done',
    tags: ['Engineering'],
    priority: 'high',
    ...getRandomStickyProps()
  },
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        // Ensure old tasks have color/rotation
        return parsed.map(t => ({
            ...t,
            color: t.color || stickyColors[Math.floor(Math.random() * stickyColors.length)],
            rotation: t.rotation !== undefined ? t.rotation : Math.floor(Math.random() * 10) - 5
        }));
      } catch (error) {
        console.error('Failed to parse tasks from localStorage:', error);
      }
    }
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const defaultProps = getRandomStickyProps();
    const newTask = {
      id: uuidv4(),
      rotation: defaultProps.rotation,
      color: defaultProps.color,
      ...taskData,
    };
    setTasks([...tasks, newTask]);
  };


  const editTask = (id, updatedData) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedData } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (taskId, newStatus, newIndex) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prevTasks;

      const task = prevTasks[taskIndex];
      const updatedTasks = [...prevTasks];

      // Remove task from old position
      updatedTasks.splice(taskIndex, 1);

      // Insert task at new position
      const tasksInNewStatus = updatedTasks.filter((t) => t.status === newStatus);
      if (newIndex !== undefined && newIndex >= 0) {
        // Find absolute index to insert
        let insertIndex = 0;
        let count = 0;
        for (let i = 0; i < updatedTasks.length; i++) {
          if (updatedTasks[i].status === newStatus) {
            if (count === newIndex) break;
            count++;
          }
          insertIndex++;
        }
        updatedTasks.splice(insertIndex, 0, { ...task, status: newStatus });
      } else {
        // Just append to the new status
        updatedTasks.push({ ...task, status: newStatus });
      }

      return updatedTasks;
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};
