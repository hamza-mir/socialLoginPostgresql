const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "PRODUCTION")
	require("dotenv").config({ path: "config/config.env" });

dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
	response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(process.env.PORT, () => {
	console.log(`App running on port ${process.env.PORT}.`);
});
