const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const dotenv = require("dotenv");
const Pool = require("pg").Pool;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

if (process.env.NODE_ENV !== "PRODUCTION")
	require("dotenv").config({ path: "config/config.env" });

dotenv.config({ path: "config/config.env" });

const jwtSecret = process.env.JWT_SECRET;

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

const createUser = (user) => {
	try {
		pool.query(
			"SELECT * FROM users WHERE userId = $1",
			[user.userid],
			(error, results) => {
				console.log(results);
				if (error || !results.rowCount) {
					console.error(error);
					pool.query(
						"INSERT INTO users (name, email, userid, accesstoken, refreshtoken, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
						[
							user.name,
							user.email,
							user.userid,
							user.accesstoken,
							user.refreshtoken,
							user.type,
						],
						(error) => {
							if (error) {
								throw error;
							}
							return user;
						}
					);
				} else return user;
			}
		);
	} catch (error) {
		console.error(error);
	}
};

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			const user = {
				userid: profile.id,
				name: profile.displayName,
				email: profile.emails[0].value,
				accesstoken: accessToken,
				refreshtoken: refreshToken,
				type: "google",
			};
			user = createUser(user);
			const token = jwt.sign(user, jwtSecret);
			done(null, token);
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_APP_ID,
			clientSecret: process.env.FACEBOOK_APP_SECRET,
			callbackURL: "/auth/facebook/callback",
			profileFields: ["id", "displayName", "email"],
		},
		(accessToken, refreshToken, profile, done) => {
			const user = {
				userid: profile.id,
				name: profile.displayName,
				email: profile.emails[0].value,
				accesstoken: accessToken,
				refreshtoken: refreshToken,
				type: "facebook",
			};
			user = createUser(user);
			const token = jwt.sign(user, jwtSecret);
			done(null, token);
		}
	)
);

// GitHub OAuth
passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: "/auth/github/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			const user = {
				userid: profile.id,
				name: profile.displayName,
				email: profile.emails ? profile.emails[0].value : null,
				accesstoken: accessToken,
				refreshtoken: refreshToken,
				type: "github",
			};
			user = createUser(user);
			const token = jwt.sign(user, jwtSecret);
			done(null, token);
		}
	)
);

app.get("/", (request, response) => {
	response.json({ info: "App is runiing" });
});

// Google OAuth Routes
app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
	"/auth/google/callback",
	passport.authenticate("google", { session: false }),
	(req, res) => {
		// Redirect the user with the JWT token as a query parameter
		res.redirect(`http://localhost:5173/login?token=${req.user}`);
	}
);

// Facebook OAuth Routes
app.get(
	"/auth/facebook",
	passport.authenticate("facebook", { scope: ["email"] })
);
app.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", { session: false }),
	(req, res) => {
		// Redirect the user with the JWT token as a query parameter
		res.redirect(`http://localhost:5173/login?token=${req.user}`);
	}
);

// GitHub OAuth Routes
app.get("/auth/github", passport.authenticate("github"));
app.get(
	"/auth/github/callback",
	passport.authenticate("github", { session: false }),
	(req, res) => {
		// Redirect the user with the JWT token as a query parameter
		res.redirect(`http://localhost:5173/login?token=${req.user}`);
	}
);

//Get Users
app.get("/users", (request, response) => {
	pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
});

// Get Single User by Id
app.get("/users/:id", (request, response) => {
	const id = parseInt(request.params.id);

	pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
