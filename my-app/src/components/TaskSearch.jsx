export default function TaskSearch({ search, setSearch }) {
    return (
        <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-white rounded-lg border border-gray-300 
                 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}
