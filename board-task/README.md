# 🧩 Kanban Board – Task Management App

A modern **Kanban-style task management application** built using **React JS**. This app allows users to create, organize, and manage tasks across different stages like **To Do**, **In Progress**, and **Done** with smooth drag-and-drop functionality.

---

## 🚀 Features

### 📌 Task Board Layout
- Three columns:
  - 📝 To Do  
  - ⚙️ In Progress  
  - ✅ Done  
- Each column displays task cards with:
  - Title  
  - Description  
  - Optional tags / priority  
- Fully responsive UI using TailwindCSS  

---

### ✏️ Task Management
- ➕ Create new tasks  
- 📝 Edit existing tasks  
- ❌ Delete tasks  
- Tasks include:
  - Title  
  - Description  
  - Status  
- Data is stored in **localStorage** (persists after refresh)

---

### 🔄 Drag and Drop
- Smooth drag-and-drop functionality  
- Move tasks between columns easily  
- Automatically updates state and saves changes  

---

### 🔍 Task Details Modal
- Click on a task to view full details  
- Inline editing for:
  - Description  
  - Status  
  - Other fields  

---

### 👤 User Features
- Visual organization of tasks  
- Seamless drag-and-drop experience  
- Full CRUD (Create, Read, Update, Delete) operations  
- Persistent data storage (no backend required)  

---

## 🛠️ Tech Stack

- **React JS**
- **TailwindCSS**
- **React Hooks** (`useState`, `useEffect`, `useContext`)
- **Context API** for global state management
- **react-beautiful-dnd** or **dnd-kit** for drag-and-drop
- **localStorage** for persistence

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/lokeshs06/kanban-board.git

# Navigate to project folder
cd kanban-board

# Install dependencies
npm install

# Start development server
npm run dev