import axios from "axios"

const API = "https://fakestoreapi.com/auth/login";

export const loginUser = async (username, password) => {
    try {
        const res = await axios.post(
            API,
            { username, password }, // 83r5^_ , mor_2314
            {
                headers: { "Content-Type": "application/json" }
            });
        const token = res.data.token;
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(res.data))

        const role = username === "mor_2314" ? "admin" : "user";
        localStorage.setItem("role", role);


        return token
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const isAuthenticated = () => {
    return !!localStorage.getItem("token")
}

export const isLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
}