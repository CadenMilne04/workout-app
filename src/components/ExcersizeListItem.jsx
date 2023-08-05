import React, { useEffect, useState } from "react";

function ExcersizeListItem(props) {
    const [hidden, setHidden] = useState(true);
    return (
        <>
            <div className="d-flex w-100 p-2 align-items-center">
                <div className="m-0 p-0 w-75">
                    <h3 className="m-0 p-0">{props.data.excersize}</h3>
                    <p className="m-0 p-0 text-secondary">
                        Bodypart: {props.data.bodypart}
                    </p>
                </div>
                <div className="d-flex w-25 justify-content-end">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setHidden(!hidden)}
                    >
                        {hidden ? <>👇</> : <>👆</>}
                    </button>
                </div>
            </div>
            {!hidden ? (
                <>
                    {props.data.sets.map((set, i) => {
                        return (
                            <form className="p-2" key={i}>
                                <h5>Set {i + 1}:</h5>
                                <div className="d-flex w-100">
                                    <input
                                        className="w-50"
                                        type="text"
                                        placeholder="Weight"
                                        onChange={(e) => {
                                            const temp = [...props.textFields];
                                            temp[props.index].sets[i].weight =
                                                e.target.value;
                                            props.setTextFields(temp);
                                            props.updateData();
                                        }}
                                        value={props.storedSetsValue[i].weight}
                                    />
                                    <input
                                        className="w-50"
                                        type="text"
                                        placeholder="Reps"
                                        onChange={(e) => {
                                            const temp = [...props.textFields];
                                            temp[props.index].sets[i].reps =
                                                e.target.value;
                                            props.setTextFields(temp);
                                            props.updateData();
                                        }}
                                        value={props.storedSetsValue[i].reps}
                                    />
                                </div>
                            </form>
                        );
                    })}
                </>
            ) : null}
        </>
    );
}

export default ExcersizeListItem;
