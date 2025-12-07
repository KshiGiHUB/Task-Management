// import axios from "axios"
// import { generateDescription, generateRandomDate } from "../utils/generateDummy"

// export const fetchTasks = async () => {
//     const res = await axios.get("https://jsonplaceholder.typicode.com/todos")

//     return res.data.map((task) => ({
//         id: task.id,
//         title: task.title,
//         completed: task.completed,
//         description: generateDescription(),
//         dueDate: generateRandomDate(),
//         status: task.completed ? "Completed" : "Pending"
//     }))
// }

// export const getSingleTask = async (id) => {
//     const tasks = await fetchTasks();
//     return tasks.find((task) => task.id === Number(id));
// };

// export const createTask = async (task) => {
//     return axios.post("https://jsonplaceholder.typicode.com/todos", task)
// }


// export const updateTask = async (task) => {
//     return axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task)
// }
