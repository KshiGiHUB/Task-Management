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

            <div className="flex gap-2">
                {isAdmin() && task.status !== "Completed" && (
                    <button
                        onClick={() => onComplete(task.id)}
                        className="text-green-600 text-xs font-semibold"
                    >
                        ✔ Done
                    </button>
                )}

                {isAdmin() && (
                    <Link
                        to={`/edit/${task.id}`}
                        className="text-blue-600 text-xs font-semibold"
                    >
                        Edit
                    </Link>
                )}
            </div>
        </div>
    );
}
