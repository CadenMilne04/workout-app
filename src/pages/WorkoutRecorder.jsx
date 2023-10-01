import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Topbar from "../components/Topbar";
import ExcersizeList from "../components/ExcersizeList";
import BottomNav from "../components/BottomNav";

function WorkoutRecorder() {
    //Stateful Variables
    const [name, setName] = useState("");
    const [date, setDate] = useState();
    const [workoutOn, setWorkoutOn] = useState(0);

    const [workouts, setWorkouts] = useState();

    //Hooks
    const navigateTo = useNavigate();

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
            setWorkoutOn(data.workoutOn);
            populateWorkouts();
        } else {
            alert(data.error);
            navigateTo("/login");
        }
    }

    async function handlePreviousWorkout(e) {
        e.preventDefault();

        localStorage.removeItem("data");

        let newWorkoutOn = workoutOn - 1;
        if (newWorkoutOn == -1) {
            newWorkoutOn = 8;
        }

        const response = await fetch(
            "https://workout-app-api-oihn.onrender.com/api/updateUserDay",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    newWorkoutOn,
                }),
            }
        );

        const data = await response.json();

        if (data.status === "ok") {
            window.location.reload();
        } else {
            alert("Unable to Sumbit Workout");
        }
    }

    async function handleNextWorkout(e) {
        e.preventDefault();

        localStorage.removeItem("data");

        let newWorkoutOn = workoutOn + 1;
        if (newWorkoutOn == 9) {
            newWorkoutOn = 0;
        }

        const response = await fetch(
            "https://workout-app-api-oihn.onrender.com/api/updateUserDay",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    newWorkoutOn,
                }),
            }
        );

        const data = await response.json();

        if (data.status === "ok") {
            window.location.reload();
        } else {
            alert("Unable to Sumbit Workout");
        }
    }

    async function populateWorkouts() {
        const req = await fetch(
            "https://workout-app-api-oihn.onrender.com/api/getWorkouts",
            {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            }
        );

        const data = await req.json();
        if (data.status === "ok") {
            const excersizesArray = data.workouts[workoutOn].excersizes;
            setWorkouts(data.workouts);
        } else {
            alert(data.error);
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
            />
            <BottomNav />
            <hr />

            {workouts ? (
                <div className="container">
                    <h3>
                        Workout 💪:{" "}
                        <span className="text-primary">
                            {workouts[workoutOn].excersizes[0].type}
                        </span>
                        {"  "}
                        Day: {workouts[workoutOn].workoutNumber}
                    </h3>
                    <ExcersizeList
                        date={date}
                        type={workouts[workoutOn].excersizes[0].type}
                        excersizeList={workouts[workoutOn].excersizes}
                    />
                </div>
            ) : (
                <h1>Loading...</h1>
            )}

            <div className="container d-flex w-100 mt-2 justify-content-center gap-2">
                <button
                    className="btn btn-primary"
                    onClick={handlePreviousWorkout}
                >
                    prev
                </button>
                <button className="btn btn-primary" onClick={handleNextWorkout}>
                    next
                </button>
            </div>
        </div>
    );
}

export default WorkoutRecorder;
