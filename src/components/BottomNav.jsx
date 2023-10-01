import React from "react";
import { useNavigate } from "react-router-dom";

function BottomNav() {
	const navigate = useNavigate();

    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/login");
    }
	return (
		<nav>
			<ul className="nav_list">
				<li className="active">
					<a
						onClick={() => {
							navigate("/homepage");
						}}
					>
						<img src="home.svg" />
					</a>
				</li>
				<li>
					<a
						onClick={() => {
							navigate("/workoutrecorder");
						}}
					>
						<img src="new.svg" />
					</a>
				</li>
				<li>
					<a
						onClick={() => {
							navigate("/savedworkouts");
						}}
					>
						<img src="saved.svg" />
					</a>
				</li>
				<li>
					<a
						onClick={() => {
							navigate("/workoutbuilder");
						}}
					>
						<img src="build.svg" />
					</a>
				</li>
				<li>
					<a
                        onClick={handleLogout}
                    >
                    <img src="logout.svg" />
                    </a>
				</li>
			</ul>
		</nav>
	);
}

export default BottomNav;
