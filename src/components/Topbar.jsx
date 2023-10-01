import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Topbar(props) {
    //Hooks
    const navigateTo = useNavigate();

    //Functions
    function handleLogout(props) {
        localStorage.removeItem("token");
        navigateTo("/login");
    }

    return (
        <div>
            <div className="container d-flex align-items-center justify-content-between my-3">
                <h2 className="m-0">Welcome {props.name}!</h2>
                <h2 className="m-0">{props.date}</h2>
            </div>
        </div>
    );
}

export default Topbar;
