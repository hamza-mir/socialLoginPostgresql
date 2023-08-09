import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

function Dashboard() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token"); // Retrieve token from local storage
		if (token) {
			axiosInstance
				.get("/user", {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => {
					setUser(response.data[0]); // Assuming the backend returns an array of users
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token"); // Remove token from local storage
		// Add API call to invalidate token on the backend (if needed)
		window.location.href = "/login";
	};

	return (
		<div>
			<h1>Welcome to the Dashboard</h1>
			{user && (
				<div>
					<p>Name: {user.name}</p>
					<p>Email: {user.email}</p>
					<button onClick={handleLogout}>Logout</button>
				</div>
			)}
		</div>
	);
}

export default Dashboard;
