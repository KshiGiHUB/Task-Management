import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { generateDescription, generateRandomDate } from "../utils/generateDummy";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
            const formatted = res.data.slice(0, 20).map((t) => ({
                id: t.id,
                title: t.title,
                completed: t.completed,
                description: generateDescription(),
                dueDate: generateRandomDate(),
                status: t.completed ? "Completed" : "Pending",
            }));
            setTasks(formatted);
        });
    }, []);


    const createTask = (task) => {
        const newTask = {
            ...task,
            id: Date.now(),
            completed: false,
        };
        setTasks((prev) => [...prev, newTask]);
    };


    const updateTask = (updatedTask) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
    };

    const getSingleTask = (id) => tasks.find((t) => t.id === Number(id));

    const markCompleted = (id) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, status: "Completed", completed: true } : t
            )
        );
    };
    const reorderTasks = (newOrder) => {
        setTasks(newOrder);
    };


    return (
        <TaskContext.Provider
            value={{ tasks, createTask, updateTask, getSingleTask, markCompleted, reorderTasks }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
