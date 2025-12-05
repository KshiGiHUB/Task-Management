import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskFilter from "../components/TaskFilter";
import TaskSearch from "../components/TaskSearch";
import { fetchTasks } from "../api/taskService";
import { Link } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchTasks().then((data) => setTasks(data));
  }, []);

  const handleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, status: "Completed", completed: true }
          : task
      )
    );
  };

  const filtered = tasks
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter(t => statusFilter === "All" ? true : t.status === statusFilter)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div>
      <h2>Task List</h2>

      <TaskSearch search={search} setSearch={setSearch} />
      <TaskFilter status={statusFilter} setStatus={setStatusFilter} />

      <Link to="/add">Add Task</Link>

      {filtered.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={handleComplete}
        />
      ))}
    </div>
  );
}
