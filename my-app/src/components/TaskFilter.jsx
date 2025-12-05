import React from "react";

export default function TaskFilter({ status, setStatus }) {
    return (
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
    );
}
