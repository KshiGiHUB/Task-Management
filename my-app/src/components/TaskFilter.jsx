export default function TaskFilter({ status, setStatus }) {
    return (
        <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 bg-white rounded-lg border border-gray-300 
                 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            {/* <option value="In Progress">In Progress</option> */}
            <option value="Completed">Completed</option>
        </select>
    );
}
