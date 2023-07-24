import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    //Stateful Variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Hooks
    const navigateTo = useNavigate();

    //Functions
    async function registerUser(e) {
        e.preventDefault();

        const response = await fetch("https://workout-app-api-oihn.onrender.com/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await response.json();

        if (data.status === "ok") {
            navigateTo("/login");
        }

        console.log(data);
    }
    return (
        <div>
            <div className="container w-50 mt-5">
                <h1>Register:</h1>
                <form onSubmit={registerUser}>
                    <div className="d-flex flex-column">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-3"
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-3"
                            type="text"
                            placeholder="Name"
                        />
                        <input
                            value={[password]}
                            onChange={(e) => setPassword(e.target.value)}
                            className="my-3"
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            className="w-50 btn btn-primary shadow"
                            type="submit"
                            value="Register"
                        />
                    </div>
                </form>
                <br />
                <p>OR</p>
                <Link className="btn btn-secondary shadow" to="/login">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Register;
