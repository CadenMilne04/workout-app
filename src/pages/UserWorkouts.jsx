import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Topbar from "../components/Topbar";
import WeightInput from "./WeightInput";
import RepsInput from "./RepsInput";

function UserWorkouts() {
    const [name, setName] = useState("");
    const [date, setDate] = useState();
    const [workouts, setWorkouts] = useState();
    const [excersizes, setExcersizes] = useState();
    const [workoutOn, setWorkoutOn] = useState(0);
    const [weightFields, setWeightFields] = useState([]);
    const [isChecked, setIsChecked] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);

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
            setName(data.name);
            setWorkoutOn(data.workoutOn);
        } else {
            alert(data.error);
            navigateTo("/login");
        }
    }

    async function handlePreviousWorkout(e) {
        e.preventDefault();

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

    async function handleSaveWorkout(e) {
        e.preventDefault();

        const response = await fetch(
            "https://workout-app-api-oihn.onrender.com/api/saveUserWorkout",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    date,
                    weightFields,
                }),
            }
        );

        const data = await response.json();

        if (data.status === "ok") {
            alert("successfully added!");
        } else {
            alert("error adding workout");
        }
    }

    async function populateWorkouts() {
        const req = await fetch("https://workout-app-api-oihn.onrender.com/api/getWorkouts", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        });

        const data = await req.json();
        if (data.status === "ok") {
            const excersizesArray = data.workouts[workoutOn].excersizes;
            setWorkouts(data.workouts);
            setExcersizes(data.workouts[workoutOn].excersizes);
        } else {
            alert(data.error);
        }
    }

    //PRINTER BUTTON
    function handlePrinterClick() {
        console.log(weightFields);
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
                populateWorkouts();
            }
        } else {
            navigateTo("/login");
        }
        setDate(Date().slice(0, 10));
    }, []);
    return (
        <div className="">
            <Topbar
                name={name}
                date={date}
                btnText={"Workout Builder"}
                btnTo={"workoutbuilder"}
                btn2Text={"Saved Workouts"}
                btn2To={"savedworkouts"}
            />
            <hr />

            <div className="container w-100">
                {excersizes ? (
                    <div>
                        <h3>
                            Workout Day {excersizes[0].type} Split day:{" "}
                            {workouts[workoutOn].workoutNumber}
                        </h3>
                        {workouts[workoutOn].excersizes.map((excersize, i) => {
                            return (
                                <div key={i}>
                                    {excersize.sets == 2 ? (
                                        <div className="d-flex flex-column align-items-start justify-content-around w-100">
                                            <label>
                                                <input
                                                    onChange={(e) => {
                                                        const tempIsChecked = [
                                                            ...isChecked,
                                                        ];
                                                        tempIsChecked[i] =
                                                            !isChecked[i];
                                                        setIsChecked(
                                                            tempIsChecked
                                                        );

                                                        const inputdata = [
                                                            ...weightFields,
                                                        ];
                                                        inputdata[i] = {
                                                            excersize:
                                                                excersize.excersizeName,
                                                            set1Weight: 0,
                                                            set2Weight: 0,
                                                            set1Reps: 0,
                                                            set2Reps: 0,
                                                        };
                                                        setWeightFields(
                                                            inputdata
                                                        );
                                                    }}
                                                    className="my-3"
                                                    type="checkbox"
                                                ></input>
                                                <b className="mx-2">
                                                    {excersize.excersizeName}
                                                </b>{" "}
                                                Sets: {excersize.sets}
                                                <i className="mx-2">
                                                    Bodypart:{" "}
                                                    {excersize.bodyPart}
                                                </i>
                                            </label>

                                            {isChecked[i] ? (
                                                <div className="w-100">
                                                    <p className="m-0">
                                                        Set 1:
                                                    </p>

                                                    <div
                                                        name="Set 1"
                                                        className="w-100 d-flex"
                                                    >
                                                        <WeightInput
                                                            weightFields={
                                                                weightFields
                                                            }
                                                            setWeightFields={
                                                                setWeightFields
                                                            }
                                                            i={i}
                                                            set={1}
                                                        />
                                                        <RepsInput
                                                            weightFields={
                                                                weightFields
                                                            }
                                                            setWeightFields={
                                                                setWeightFields
                                                            }
                                                            i={i}
                                                            set={1}
                                                        />
                                                    </div>
                                                    <p className="m-0">
                                                        Set 2:
                                                    </p>

                                                    <div
                                                        name="Set 2"
                                                        className="w-100 d-flex"
                                                    >
                                                        <WeightInput
                                                            weightFields={
                                                                weightFields
                                                            }
                                                            setWeightFields={
                                                                setWeightFields
                                                            }
                                                            i={i}
                                                            set={2}
                                                        ></WeightInput>
                                                        <RepsInput
                                                            weightFields={
                                                                weightFields
                                                            }
                                                            setWeightFields={
                                                                setWeightFields
                                                            }
                                                            i={i}
                                                            set={2}
                                                        />
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : (
                                        <div>
                                            <label>
                                                <input
                                                    className="my-3"
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        const tempIsChecked = [
                                                            ...isChecked,
                                                        ];
                                                        tempIsChecked[i] =
                                                            !isChecked[i];
                                                        setIsChecked(
                                                            tempIsChecked
                                                        );

                                                        const inputdata = [
                                                            ...weightFields,
                                                        ];
                                                        inputdata[i] = {
                                                            excersize:
                                                                excersize.excersizeName,
                                                            set1Weight: 0,
                                                            set2Weight: 0,
                                                            set1Reps: 0,
                                                            set2Reps: 0,
                                                        };
                                                        setWeightFields(
                                                            inputdata
                                                        );
                                                    }}
                                                ></input>
                                                <b className="mx-2">
                                                    {excersize.excersizeName}
                                                </b>{" "}
                                                Sets: {excersize.sets}
                                                <i className="mx-2">
                                                    Bodypart:{" "}
                                                    {excersize.bodyPart}
                                                </i>
                                            </label>
                                            {isChecked[i] ? (
                                                <div>
                                                    <div className="w-100 d-flex">
                                                        <WeightInput
                                                            weightFields={
                                                                weightFields
                                                            }
                                                            setWeightFields={
                                                                setWeightFields
                                                            }
                                                            i={i}
                                                            set={1}
                                                        />
                                                        <RepsInput
                                                            weightFields={
                                                                weightFields
                                                            }
                                                            setWeightFields={
                                                                setWeightFields
                                                            }
                                                            i={i}
                                                            set={1}
                                                        />
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )}

                <div className="d-flex">
                    <form onSubmit={handlePreviousWorkout}>
                        <input
                            className="my-3 btn btn-secondary"
                            type="submit"
                            value="Last Day"
                        />
                    </form>

                    <form onSubmit={handleSaveWorkout}>
                        <input
                            className="m-3 btn btn-primary"
                            type="submit"
                            value="Save Workout"
                        />
                    </form>

                    <form onSubmit={handleNextWorkout}>
                        <input
                            className="my-3 btn btn-secondary"
                            type="submit"
                            value="Next Day"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserWorkouts;
