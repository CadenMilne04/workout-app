import React from 'react'

function RepsInput(props) {
  return (
    <div className="w-50 m-0">
            <input
                className="w-100"
                type="text"
                placeholder="reps"
                onChange={(e) => {
                    const inputdata = [...props.weightFields];
                    if (props.set == 1) {
                        inputdata[props.i].set1Reps = e.target.value;
                    } else if (props.set == 2) {
                        inputdata[props.i].set2Reps = e.target.value;
                    }
                    props.setWeightFields(inputdata);
                }}
            ></input>
        </div>
  )
}

export default RepsInput