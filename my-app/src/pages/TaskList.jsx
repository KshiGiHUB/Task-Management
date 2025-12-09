import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskItem from "../components/TaskItem";
import TaskFilter from "../components/TaskFilter";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskSearch from "../components/TaskSearch";
import { useTasks } from "../context/TaskContext";
import { logout } from "../api/authService";
import { isAdmin } from "../api/roleService";
import { Link } from "react-router-dom";

export default function TaskList() {
  const { tasks, markCompleted, reorderTasks } = useTasks();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (statusFilter === "All" ? true : t.status === statusFilter))
    .filter((t) => (dateFilter ? t.dueDate === dateFilter : true));


  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    const draggedTask = filtered[sourceIndex];
    const targetTask = filtered[destIndex];

    const oldIndex = tasks.findIndex((t) => t.id === draggedTask.id);
    const newIndex = tasks.findIndex((t) => t.id === targetTask.id);

    const updated = Array.from(tasks);

    const [removed] = updated.splice(oldIndex, 1);

    updated.splice(newIndex, 0, removed);

    reorderTasks(updated);
  };




  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Task Management
        </h2>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="w-full md:w-1/2">
            <TaskSearch search={search} setSearch={setSearch} />
          </div>

          <div className="w-full md:w-1/3">
            <TaskFilter status={statusFilter} setStatus={setStatusFilter} />
          </div>

          <div className="w-full md:w-1/3">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-lg border border-gray-300 
                 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {isAdmin() && (
            <Link
              to="/add"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold 
                        hover:bg-blue-700 shadow transition"
            >
              Add
            </Link>
          )}
          <div className="flex justify-between items-center">
            {/* <h2 className="text-3xl font-bold text-gray-800">Task Management</h2> */}

            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow"
            >
              Logout
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                {filtered.map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(provided) => (
                      <TaskItem
                        task={task}
                        onComplete={markCompleted}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            No tasks match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
