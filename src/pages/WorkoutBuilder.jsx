import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Topbar from "../components/Topbar";

function WorkoutBuilder() {
    const [name, setName] = useState("");
    const [date, setDate] = useState();

    const [type, setType] = useState("Chest and Back");
    const [bodyPart, setBodyPart] = useState("Chest");
    const [excersizeName, setExcersizeName] = useState("");
    const [description, setDescription] = useState("");
    const [workoutNumber, setWorkoutNumber] = useState("");
    const workoutNumberAsNumber = Number(workoutNumber);
    const [sets, setSets] = useState("");
    const setsAsNumber = Number(sets);

    //Hooks
    const navigateTo = useNavigate();
    //Functions
    async function populateUser() {
        const req = await fetch("https://workout-app-api-oihn.onrender.com/api/name", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        });

        const data = await req.json();
        if (data.status === "ok") {
            if (data.name === "admin") {
                setName(data.name);
            } else {
                navigateTo("/userworkouts");
            }
        } else {
            alert(data.error);
        }
    }

    async function addExcersize(e) {
        e.preventDefault();

        const response = await fetch("https://workout-app-api-oihn.onrender.com/api/addWorkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                workoutNumberAsNumber,
                type,
                bodyPart,
                excersizeName,
                setsAsNumber,
                description,
            }),
        });

        const data = await response.json();

        if (data.status === "ok") {
            alert("successfully added!");
        } else {
            alert("error adding workout");
        }
        setBodyPart("Chest");
        setDescription("");
        setType("Chest and Back");
        setExcersizeName("");
        setWorkoutNumber("");
        setSets("");
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigateTo("/login");
    }

    //Run Once
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwt_decode(token);
            if (!user) {
                localStorage.removeItem("token");
                navigateTo("/login", { replace: true });
            } else {
                populateUser();
            }
        } else {
            navigateTo("/login");
        }
        setDate(Date().slice(0, 10));
    }, []);
    return (
        <div className="container">
            <div className="container d-flex align-items-center justify-content-between my-3">
                <h2 className="m-0">Welcome {name}!</h2>
                <h2 className="m-0">{date}</h2>
                <div>
                    <Link
                        className="btn btn-primary mx-2 my-0"
                        to={"/userworkouts"}
                    >
                        User Workouts
                    </Link>

                    <button
                        className="btn btn-danger m-0"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>
            <hr />
            <h1>Build a New Workout 🔨</h1>
            <form onSubmit={addExcersize}>
                <div className="container d-flex flex-column">
                    <h3>Workout Number:</h3>
                    <input
                        className="my-2"
                        onChange={(e) => setWorkoutNumber(e.target.value)}
                        value={workoutNumber}
                        type="number"
                        placeholder="Number (1-9)"
                    />
                    <h3>Workout Information:</h3>
                    <select
                        className="my-2"
                        name="type"
                        id="types"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="Chest/Back">Chest/Back</option>
                        <option value="Legs/Abs">Legs/Abs</option>
                        <option value="Bi/Tri/Shoulder">Bi/Tri/Shoulder</option>
                    </select>
                    <label htmlFor="bodyParts">Select Body Part:</label>
                    <select
                        className="my-2"
                        name="bodyPart"
                        id="bodyParts"
                        value={bodyPart}
                        onChange={(e) => setBodyPart(e.target.value)}
                    >
                        <option value="Chest">Chest</option>
                        <option value="Back">Back</option>
                        <option value="Legs">Legs</option>
                        <option value="Abs">Abs</option>
                        <option value="Biceps">Biceps</option>
                        <option value="Triceps">Triceps</option>
                        <option value="Shoulders">Shoulders</option>
                    </select>

                    <label htmlFor="excersize">Excersize:</label>
                    <input
                        onChange={(e) => setExcersizeName(e.target.value)}
                        value={excersizeName}
                        className="my-2"
                        type="text"
                        placeholder="Name"
                        id="excersize"
                    />

                    <label>Sets:</label>
                    <input
                        className="my-2"
                        onChange={(e) => setSets(e.target.value)}
                        value={sets}
                        type="number"
                        placeholder="Number of sets"
                    />

                    <label>Description:</label>
                    <input
                        className="my-2"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        type="text"
                        placeholder="Description"
                    />

                    <input
                        className="my-3 btn btn-primary w-50"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
}

export default WorkoutBuilder;
