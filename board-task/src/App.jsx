import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskProvider } from './context/TaskContext';
import Board from './components/Board';
import TaskModal from './components/TaskModal';

function KanbanApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleOpenNewTask = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="pt-6 md:pt-8 pb-4 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center gap-4 relative">
          <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight text-center leading-tight">
              Physical Kanban Board
            </h1>
            <div className="h-1 w-32 md:w-full max-w-sm bg-green-600 mt-2 md:mt-3 rounded-full"></div>
          </div>
          
          <div className="w-full sm:w-auto md:absolute md:right-6 md:top-0 md:bottom-0 flex items-center justify-center mt-2 md:mt-0">
            <button
              onClick={handleOpenNewTask}
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-6 py-3 md:py-2.5 rounded-lg font-medium transition-all shadow-md"
            >
              <Plus size={18} />
              <span>New Task</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Board Area */}
      <main className="flex-1 relative">
        <Board onEditTask={handleEditTask} />
      </main>

      {/* Modals */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <KanbanApp />
    </TaskProvider>
  );
}

export default App;
