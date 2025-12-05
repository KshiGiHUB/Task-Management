import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskFilter from "../components/TaskFilter";
import TaskSearch from "../components/TaskSearch";
import { fetchTasks } from "../api/taskService";
import { isAdmin } from "../api/roleService";
import { Link } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchTasks().then((data) => setTasks(data));
  }, []);

  const handleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: "Completed", completed: true }
          : task
      )
    );
  };

  const filtered = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (statusFilter === "All" ? true : t.status === statusFilter))
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Task Management
        </h2>

        {/* Search + Filter + Add Task */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">

          {/* Search Input */}
          <div className="w-full md:w-1/2">
            <TaskSearch search={search} setSearch={setSearch} />
          </div>

          {/* Filter Dropdown */}
          <div className="w-full md:w-1/3">
            <TaskFilter status={statusFilter} setStatus={setStatusFilter} />
          </div>

          {/* Add Task Button */}
          {isAdmin() && (
            <Link
              to="/add"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold 
                      hover:bg-blue-700 shadow transition"
            >
              + Add Task
            </Link>
          )}

        </div>

        {/* Task Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
            />
          ))}
        </div>

        {/* No tasks found */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            No tasks match your search or filter.
          </p>
        )}
      </div>
    </div>
  );
}
