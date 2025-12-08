import React from "react";
import { Link } from "react-router-dom";
import { isAdmin } from "../api/roleService";

export default function TaskItem({ task, onComplete, provided }) {
    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="bg-white border rounded p-3 flex justify-between items-center hover:bg-gray-50 cursor-move"
        >
            <div>
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
            </div>

            <div className="flex gap-3">
                {isAdmin() && task.status !== "Completed" && (
                    <button
                        onClick={() => onComplete(task.id)}
                        className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition"
                    >
                        ✔ Mark as Completed
                    </button>
                )}

                {isAdmin() && task.status !== "Completed" && (
                    <Link
                        to={`/edit/${task.id}`}
                        className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                    >
                        Edit
                    </Link>
                )}
            </div>

        </div>
    );
}
