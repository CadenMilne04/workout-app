import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Topbar from "../components/Topbar";
import BottomNav from "../components/BottomNav";

function HomePage() {
	const [name, setName] = useState("");
	const [date, setDate] = useState();
	const [quote, setQuote] = useState("null");
	const [author, setAuthor] = useState("null");

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
		} else {
			alert(data.error);
			navigateTo("/login");
		}
	}

	async function getQuote() {
		const response = await fetch(
			"https://api.api-ninjas.com/v1/quotes?category=inspirational",
			{
				headers: {
					"X-Api-Key": "IGc23Ayxb1//cioRXwfZPA==WlULzOWIwVaJfo5f",
				},
			}
		);

		const quote = await response.json();
		console.log(quote);
		setQuote(quote[0].quote);
		setAuthor(quote[0].author);
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt_decode(token);
			if (!user) {
				localStorage.removeItem("token");
				navigateTo("/login", { replace: true });
			} else {
				populateUser();
				getQuote();
			}
		} else {
			navigateTo("/login");
		}
		setDate(Date().slice(0, 10));
	}, []);
	return (
		<div>
			<Topbar name={name} date={date} />
			<BottomNav />
			<hr />

			<div className="quote">
				<h5>"{quote}"</h5>
				<p>-{author}</p>
			</div>
		</div>
	);
}

export default HomePage;
