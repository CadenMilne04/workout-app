import React, { useState } from "react";

function SavedWorkoutItem(props) {
    const [hidden, setHidden] = useState(true);

    async function handleDeleteWorkout(dateToDelete) {
        const req = await fetch(
            "https://workout-app-api-oihn.onrender.com/api/deleteUserWorkout",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    dateToDelete,
                }),
            }
        );

        const data = await req.json();

        if (data.status === "ok") {
            alert("deleted successfully!");
            window.location.reload();
        } else {
            alert(data.error);
        }
    }

    return (
        <div className="p-2">
            <div className="d-flex w-100 align-items-center">
                <div className="m-0 p-0 w-75">
                    <h3 className="m-0 p-0">{props.workout.type}</h3>
                    <p className="m-0 p-0 text-secondary">
                        On: {props.workout.date}
                    </p>
                </div>
                <div className="d-flex w-25 gap-1 justify-content-end">
                    <button
                        className="btn btn-outline-danger"
                        onClick={()=>handleDeleteWorkout(props.workout.date)}

                    >
                        ❌
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setHidden(!hidden)}
                    >
                        {hidden ? <>👇</> : <>👆</>}
                    </button>
                </div>
            </div>

            {!hidden &&
                props.workout.workouts.map((excersize, i) => {
                    return (
                        <div key={i}>
                            <h4>{excersize.excersize}</h4>
                            {excersize.sets.map((set, i) => {
                                if (set.weight && set.reps) {
                                    return (
                                        <p key={i}>
                                            Set {i + 1}: Weight: {set.weight}{" "}
                                            Reps: {set.reps}
                                        </p>
                                    );
                                } else {
                                    return (
                                        <h6 key={i}>
                                            Set {i + 1}: No set recorded
                                        </h6>
                                    );
                                }
                            })}
                        </div>
                    );
                })}
        </div>
    );
}

export default SavedWorkoutItem;
