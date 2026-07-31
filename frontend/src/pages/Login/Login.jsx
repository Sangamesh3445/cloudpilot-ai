import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { loginUser } = useAuth();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await loginUser(username, password);

            navigate("/dashboard");

        } catch {

            setError("Invalid Username or Password");

        }

    }

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow w-96"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">
                    CloudPilot AI
                </h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border w-full p-3 rounded mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border w-full p-3 rounded mb-4"
                />

                {error && (
                    <p className="text-red-600 mb-4">
                        {error}
                    </p>
                )}

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded"
                >
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;