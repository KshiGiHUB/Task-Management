import React from "react";
import { Link } from "react-router-dom";

export default function TaskCard({ task, onComplete }) {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>

            <p>{task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>

            {task.status !== "Completed" && (
                <>
                    <button onClick={() => onComplete(task.id)}>Mark Completed</button>
                    <Link to={`/edit/${task.id}`}>Edit</Link>
                </>
            )}
        </div>
    );
}
