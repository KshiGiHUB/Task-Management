import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, updateTask, getSingleTask } from "../api/taskService";
import { isAdmin } from "../api/roleService";


export default function TaskForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "Pending",
        dueDate: ""
    });

    const [isCompleted, setIsCompleted] = useState(false);

    // Load existing task when editing
    useEffect(() => {
        if (isEdit) {
            getSingleTask(id).then((data) => {
                if (data) {
                    setTask(data);
                    setIsCompleted(data.status === "Completed");
                }
            });
        }
    }, [id, isEdit]);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!task.title || !task.description || !task.dueDate) {
            alert("All fields are required!");
            return;
        }

        if (isEdit && isCompleted) {
            alert("Completed tasks cannot be edited!");
            return;
        }

        if (isEdit) {
            await updateTask(task);
        } else {
            await createTask(task);
        }

        navigate("/tasks");
    };

    if (!isAdmin()) {
        return (
            <p className="text-center text-red-600 font-bold mt-10">
                You are not allowed to access this page.
            </p>
        );
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">

                {/* Header */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    {isEdit ? "Edit Task" : "Add New Task"}
                </h2>

                {/* Completed Message */}
                {isCompleted && (
                    <p className="text-red-600 text-center font-semibold mb-4">
                        This task is completed and cannot be edited.
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Title */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={task.title}
                            disabled={isCompleted}
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                            placeholder="Enter task title"
                            className={`w-full px-4 py-2 rounded-lg border bg-gray-50 
              ${isCompleted ? "opacity-60 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-500"}`}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            value={task.description}
                            disabled={isCompleted}
                            onChange={(e) => setTask({ ...task, description: e.target.value })}
                            placeholder="Enter task description"
                            className={`w-full px-4 py-2 rounded-lg border bg-gray-50 h-28
              ${isCompleted ? "opacity-60 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-500"}`}
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Status</label>
                        <select
                            value={task.status}
                            disabled={isCompleted}
                            onChange={(e) => setTask({ ...task, status: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border bg-gray-50
              ${isCompleted ? "opacity-60 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-500"}`}
                        >
                            <option>Pending</option>
                            <option>In Progress</option>
                        </select>
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Due Date</label>
                        <input
                            type="date"
                            value={task.dueDate}
                            disabled={isCompleted}
                            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border bg-gray-50
              ${isCompleted ? "opacity-60 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-500"}`}
                        />
                    </div>

                    {/* Submit Button */}
                    {!isCompleted && (
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold 
              hover:bg-blue-700 transition duration-300 shadow-md"
                        >
                            {isEdit ? "Update Task" : "Create Task"}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
