import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/taskContext";
import { isAdmin } from "../api/roleService";

export default function TaskForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const { createTask, updateTask, getSingleTask } = useTasks();

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
    });

    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (isEdit) {
            const found = getSingleTask(id);
            if (found) {
                setTask(found);
                setIsCompleted(found.status === "Completed");
            }
        }
    }, [id, isEdit, getSingleTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!task.title || !task.description || !task.dueDate) {
            alert("All fields are required!");
            return;
        }

        if (isEdit) {
            updateTask(task);
        } else {
            createTask(task);
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

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    {isEdit ? "Edit Task" : "Add New Task"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={task.title}
                            disabled={isCompleted}
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter task title"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            value={task.description}
                            disabled={isCompleted}
                            onChange={(e) => setTask({ ...task, description: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border bg-gray-50 h-28 focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter task details"
                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Status
                        </label>
                        <select
                            value={task.status}
                            disabled={isCompleted}
                            onChange={(e) => setTask({ ...task, status: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Due Date</label>
                        <input
                            type="date"
                            value={task.dueDate}
                            disabled={isCompleted}
                            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {!isCompleted && (
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            {isEdit ? "Update Task" : "Create Task"}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
