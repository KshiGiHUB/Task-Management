import React, { useState } from 'react'
import { loginUser } from '../api/authService';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await loginUser(email, password)
            window.location.href("/")
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder='enter email'
                    onChange={(e) => setEmail(e.target.value)} required />
                <input
                    type="password"
                    placeholder='enter password'
                    onChange={(e) => setPassword(e.target.value)} required />
                <button>Login</button>
                {error && <p>{error}</p>}
            </form>
        </>
    )
}

export default Login