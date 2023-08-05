import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WorkoutBuilder from "./pages/WorkoutBuilder";
import SavedWorkouts from "./pages/SavedWorkouts";
import WorkoutRecorder from "./pages/WorkoutRecorder";
import "./App.css"


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route
                        path="/workoutbuilder"
                        exact
                        element={<WorkoutBuilder />}
                    />
                    <Route
                        path="/savedworkouts"
                        exact
                        element={<SavedWorkouts />}
                    />
                    <Route
                        path="/workoutrecorder"
                        exact
                        element={<WorkoutRecorder />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
