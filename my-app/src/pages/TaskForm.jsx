import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, updateTask } from "../api/taskService";

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
    // useEffect(() => {
    //     if (isEdit) {
    //         getSingleTask(id).then((data) => {
    //             if (data) {
    //                 setTask(data);
    //                 setIsCompleted(data.status === "Completed");
    //             }
    //         });
    //     }
    // }, [id, isEdit]);

    // Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!task.title || !task.description || !task.dueDate) {
            alert("All fields are required");
            return;
        }

        if (isEdit && isCompleted) {
            alert("Completed tasks cannot be edited.");
            return;
        }

        if (isEdit) {
            await updateTask(task);
        } else {
            await createTask(task);
        }

        navigate("/tasks");
    };

    return (
        <div className="task-form-container">
            <h2>{isEdit ? "Edit Task" : "Add Task"}</h2>

            {isCompleted && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                    This task is completed and cannot be edited.
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Title"
                    value={task.title}
                    disabled={isCompleted}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                />

                <textarea
                    placeholder="Description"
                    value={task.description}
                    disabled={isCompleted}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                />

                <select
                    value={task.status}
                    disabled={isCompleted}
                    onChange={(e) => setTask({ ...task, status: e.target.value })}
                >
                    <option>Pending</option>
                    <option>In Progress</option>
                </select>

                <input
                    type="date"
                    value={task.dueDate}
                    disabled={isCompleted}
                    onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                />

                {!isCompleted && (
                    <button type="submit">
                        {isEdit ? "Update Task" : "Create Task"}
                    </button>
                )}
            </form>
        </div>
    );
}
