import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Login />} />

      </Routes>
    </Router>
  );
}
