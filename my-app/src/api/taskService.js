import axios from "axios"
import { generateDescription, generateRandomDate } from "../utils/generateDummy"

export const fetchTasks = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos")

    return res.data.slice(0, 20).map((task) => ({
        id: task.id,
        title: task.title,
        completed: task.completed,
        description: generateDescription(),
        dueDate: generateRandomDate(),
        status: task.completed ? "Completed" : "Pending"
    }))
}


export const createTask = async (task) => {
    return axios.post("https://jsonplaceholder.typicode.com/todos", task)
}


export const updateTask = aynsc(task) => {
    return axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task)
}
