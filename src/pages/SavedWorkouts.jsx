import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import WorkoutBuilder from "./WorkoutBuilder";
import jwt_decode from "jwt-decode";
import SavedWorkoutItem from "../components/SavedWorkoutItem";
import BottomNav from "../components/BottomNav";

function SavedWorkouts() {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [workouts, setWorkouts] = useState("");

    //Functions
    async function populateUser() {
        const req = await fetch(
            "https://workout-app-api-oihn.onrender.com/api/name",
            {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            }
        );

        const data = await req.json();

        if (data.status === "ok") {
            setName(data.name);
        } else {
            alert(data.error);
            navigateTo("/login");
        }
    }

    async function populateUserWorkouts() {
        const req = await fetch(
            "https://workout-app-api-oihn.onrender.com/api/getUserWorkouts",
            {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            }
        );

        const data = await req.json();

        if (data.status === "ok") {
            setWorkouts(data.workouts);
        } else {
            alert(data.error);
            navigateTo("/login");
        }
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
                populateUserWorkouts();
            }
        } else {
            navigateTo("/login");
        }
        setDate(Date().slice(0, 10));
    }, []);
    return (
        <div>
            <Topbar
                name={name}
                date={date}
                btn2Text={"New Workout"}
                btn2To={"workoutrecorder"}
            />

            <BottomNav />

            <hr />
            <div className="container">
                <h2>Saved Workouts 💾</h2>
                <ul className="reverse">
                    {workouts ? (
                        workouts.map((workout, i) => {
                            return (
                                <li key={i}>
                                    <SavedWorkoutItem workout={workout} />
                                </li>
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SavedWorkouts;
