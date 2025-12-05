import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await loginUser(username, password);
            navigate("/tasks");
        } catch (e) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-8">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Task Manager Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-medium">
                            {error}
                        </p>
                    )}

                    <button
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold 
                       hover:bg-blue-700 transition duration-300 shadow-md"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
