import React from "react";
import { Link } from "react-router-dom";
import { isAdmin } from "../api/roleService";

export default function TaskCard({ task, onComplete }) {
    return (
        <div className="bg-white shadow rounded-lg p-5 border hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>

            <p className="text-gray-600 text-sm mb-3">{task.description}</p>

            <p className="text-sm text-gray-700 mb-1">
                <strong>Status:</strong> {task.status}
            </p>

            <p className="text-sm text-gray-700 mb-3">
                <strong>Due Date:</strong> {task.dueDate}
            </p>

            <div className="flex justify-between items-center mt-4">
                {isAdmin() && task.status !== "Completed" && (
                    <button
                        onClick={() => onComplete(task.id)}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded 
                       hover:bg-green-700 transition"
                    >
                        Mark Complete
                    </button>
                )}

                {isAdmin() && task.status !== "Completed" ? (
                    <Link
                        to={`/edit/${task.id}`}
                        className="text-sm bg-yellow-500 text-white px-3 py-1 rounded 
                       hover:bg-yellow-600 transition"
                    >
                        Edit
                    </Link>
                ) : (
                    <span className="text-xs font-semibold text-green-700">
                        {task.status === "Completed" ? "✓ Completed" : ""}
                    </span>
                )}
            </div>
        </div>
    );
}
