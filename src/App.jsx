import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserWorkouts from "./pages/UserWorkouts";
import WorkoutBuilder from "./pages/WorkoutBuilder";
import SavedWorkouts from "./pages/SavedWorkouts";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route
                        path="/userworkouts"
                        exact
                        element={<UserWorkouts />}
                    />
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
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
