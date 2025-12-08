📝 Project Overview

A fully functional Task Management Application built using React, Context API, React Router, and Drag & Drop.
The app allows authenticated users to manage tasks with features like search, filtering, sorting, editing, and role-based access.


📥 Setup Instructions

Follow the steps below to run this project locally:

1️⃣ Clone the Repository
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm run dev

🔐 Login Credentials

 Admin User
  Username: mor_2314
  Password: 83r5^_

  Permissions:
  1.Add tasks
  2.Edit tasks
  3. Mark tasks completed
  4. View tasks
  5. Search & filter tasks

  Normal User
  Username: donero
  Password: ewedon
  Permissions:
  1. View tasks
  2. Search & filter tasks
  3. Cannot add or edit tasks

🧩 Features Implemented
  ✔ Task Functionalities
      Add new tasks
      Edit existing tasks
      Mark tasks as completed
      Search tasks dynamically
      Filter by task status
      Sort tasks by due date
      Drag & drop task reordering

  ✔ Role-Based Access Control
      Admins can create & edit tasks
      Normal users get view-only access

  ✔ Authentication
     Token and user role stored in localStorage
     Protected routes using <ProtectedRoute />

  ✔ State Management
     All task operations handled via Context API
     Reordering, updates, creation all stored in state

🧠 Approach Taken
✅ 1. Component-Based Architecture
       UI was broken into reusable components:
       TaskItem
       TaskFilter
       TaskSearch
       ProtectedRoute

✅ 2. Context API for Centralized Task State
       All tasks are managed inside TaskContext.jsx, supporting:
       createTask
       updateTask
       markCompleted
       reorderTasks
       This avoids prop drilling.

✅ 3. Role-Based Route Protection
       Used ProtectedRoute to prevent non-authenticated users from accessing task pages.
       Used isAdmin() to protect Add/Edit routes.

✅ 4. Mock Authentication
      Simple login system: 
      Stores token in localStorage
      Stores user role in localStorage

✅ 5. Drag & Drop Handling
      Implemented with onDragEnd() and updated context state with reorder logic.

✅ 6. User-Friendly UI
      Used TailwindCSS to create clean inputs, buttons, layout, and responsive design.
Search & filter tasks

Cannot add or edit tasks
