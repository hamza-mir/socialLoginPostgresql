import React, { useEffect } from "react";

export default function Callback() {
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get("token");

		if (token) {
			// Save the token in local storage
			localStorage.setItem("token", token);

			// Redirect the user to a different page or perform other actions as needed
			// For example:
			window.location.href = "/dashboard"; // Redirect to dashboard
		}
	}, []);

	return (
		<div>
			<h1>Loading...</h1>
			{/* You can add a loading spinner or other content here */}
		</div>
	);
}
