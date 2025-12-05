import React from "react";

export default function TaskSearch({ search, setSearch }) {
    return (
        <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}
