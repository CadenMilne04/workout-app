import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    //Stateful Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Hooks
    const navigateTo = useNavigate();

    //Functions
    async function loginUser(e) {
        e.preventDefault();

        const response = await fetch("https://workout-app-api-oihn.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (data.user) {
            localStorage.setItem("token", data.user);
            navigateTo("/homepage");
        } else {
            alert("Invalid Username or Password.");
        }

        console.log(data);
    }

    return (
        <div>
            <div className="container w-50 mt-5">
                <h1>Login:</h1>
                <form onSubmit={loginUser}>
                    <div className="d-flex flex-column">
                        <input
                            className="mt-3"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            className="my-3"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            className="w-50 btn btn-primary shadow"
                            type="submit"
                            value="Login"
                        />
                    </div>
                </form>
                <br />
                <p>OR</p>
                <Link className="btn btn-secondary shadow" to="/register">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;
