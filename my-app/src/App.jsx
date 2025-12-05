import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAdmin } from "./api/roleService";


export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
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
            isAdmin() ? (
              <ProtectedRoute><TaskForm /></ProtectedRoute>
            ) : (
              <Navigate to="/tasks" />
            )
          }
        />

        <Route
          path="/edit/:id"
          element={
            isAdmin() ? (
              <ProtectedRoute><TaskForm /></ProtectedRoute>
            ) : (
              <Navigate to="/tasks" />
            )
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Login />} />

      </Routes>
    </Router>
  );
}
