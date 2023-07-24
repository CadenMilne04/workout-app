import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import WorkoutBuilder from "./WorkoutBuilder";
import jwt_decode from "jwt-decode";

function SavedWorkouts() {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [workouts, setWorkouts] = useState("");

    //Functions
    async function populateUser() {
        const req = await fetch("https://workout-app-api-oihn.onrender.com/api/name", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        });

        const data = await req.json();

        if (data.status === "ok") {
            setName(data.name);
        } else {
            alert(data.error);
            navigateTo("/login");
        }
    }

    async function handleDeleteWorkout(dateToDelete) {
        const req = await fetch("https://workout-app-api-oihn.onrender.com/api/deleteUserWorkout", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                dateToDelete,
            }),
        });

        const data = await req.json();

        if (data.status === "ok") {
            alert("deleted successfully!");
            window.location.reload();
        } else {
            alert(data.error);
        }
    }

    async function populateUserWorkouts() {
        const req = await fetch("https://workout-app-api-oihn.onrender.com/api/getUserWorkouts", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        });

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
        <div className="container">
            <Topbar
                name={name}
                date={date}
                btn2Text={"New Workout"}
                btn2To={"userworkouts"}
            />
            <hr />
            <h2>View Workouts</h2>
            {workouts ? (
                workouts.map((workout, i) => {
                    return (
                        <div
                            key={i}
                            className="p-2 m-2"
                            style={{
                                borderRadius: "15px",
                                backgroundColor: "rgb(0,0,0,.15)",
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <h3 className="m-0 w-75">
                                    Date: {workout.date}
                                </h3>
                                <div className="d-flex w-25 justify-content-end">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            handleDeleteWorkout(workout.date);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            {workout.workouts.map((item, k) => {
                                return (
                                    <div key={k}>
                                    {item ? <div><h4 style={{color: "white"}}>{item.excersize}</h4>
                                        <p>
                                            <b>Set1:</b> Weight{" "}
                                            {item.set1Weight} Reps{" "}
                                            {item.set1Reps}{" "}
                                        </p>
                                        <p>
                                            <b>Set2:</b> Weight{" "}
                                            {item.set2Weight} Reps{" "}
                                            {item.set2Reps}
                                        </p></div>: null}
                                    
                                        
                                    </div>
                                );
                            })}
                        </div>
                    );
                })
            ) : (
                <p>none</p>
            )}
        </div>
    );
}

export default SavedWorkouts;
