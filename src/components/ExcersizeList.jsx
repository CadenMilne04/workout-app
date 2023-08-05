import React, { useEffect, useState } from "react";
import ExcersizeListItem from "./ExcersizeListItem";

function ExcersizeList(props) {
    //Variables
    const excersizeList = props.excersizeList;
    const [textFields, setTextFields] = useState([]);

    const data = JSON.parse(localStorage.getItem("data"));
    //Functions
    function updateData() {
        localStorage.setItem("data", JSON.stringify(textFields));
    }

    async function handleSaveWorkout(e) {
        e.preventDefault();

        const weightFields = textFields;
        const date = props.date;
        const type = props.type;

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
                    type,
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

    //Run Once
    useEffect(() => {
        let abc = [];
        excersizeList.forEach((excersize, i) => {
            if (abc.length < excersizeList.length) {
                abc = [
                    ...abc,
                    { excersize: excersize.excersizeName, bodypart: excersize.bodyPart, sets: [] },
                ];
                for (let j = 1; j <= excersize.sets; j++) {
                    abc[i].sets = [...abc[i].sets, { weight: "", reps: "" }];
                }
            }
        });
        if (!localStorage.getItem("data")) {
            localStorage.setItem("data", JSON.stringify(abc));
            setTextFields(abc);
        } else {
            setTextFields(JSON.parse(localStorage.getItem("data")));
        }
    }, [excersizeList]);

    return (
        <div>
            {textFields ? (
                <>
                    {textFields.map((item, i) => {
                        return (
                            <ul key={i}>
                                <li>
                                    <ExcersizeListItem
                                        data={item}
                                        updateData={updateData}
                                        storedSetsValue={data[i].sets}
                                        setTextFields={setTextFields}
                                        textFields={textFields}
                                        index={i}
                                    />
                                </li>
                            </ul>
                        );
                    })}
                </>
            ) : (
                <h1>Loading...</h1>
            )}
            <div className="d-flex mt-0 justify-content-center">
                <button className="btn btn-success" onClick={handleSaveWorkout}>
                    Submit Workout
                </button>
            </div>
        </div>
    );
}

export default ExcersizeList;
