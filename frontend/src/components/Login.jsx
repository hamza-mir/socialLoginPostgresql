import React from "react";

function Login() {
	const baseUrl = "http://localhost:3000/";

	const handelLogin = (provider) => {
		try {
			window.location.href = `${baseUrl}auth/${provider}`;
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<button onClick={() => handelLogin("google")}>
				Login with Google
			</button>{" "}
			<br />
			<button onClick={() => handelLogin("facebook")}>
				Login with Facebook
			</button>{" "}
			<br />
			<button onClick={() => handelLogin("github")}>
				Login with Github
			</button>
		</div>
	);
}

export default Login;
