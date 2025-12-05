import axios from "axios"

const API = "https://dummyjson.com/auth/login";

export const loginUser = async (email, password) => {
    try {
        const res = await axios.post(API, { email, password }, { headers: { "Content-Type": "application/json" } });
        const token = res.data.token;
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(res.data))

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