const express = require("express")
const app = express()
const cors = require("cors")
const server = require("http").createServer(app)
const mysql = require("mysql")

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "password",
	database: "mydb",
})

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
	console.log("Server!")
	db.query('INSERT INTO user VALUES (3,"i", "I", "i", "I", "I", "I")', err => {
		if (err) console.log("FAILED!!!!!!!!")
		console.log("success")
	})
	res.json({})
})

app.get("/db", (req, res) => {
	db.query("SELECT * FROM user", (err, result) => {
		if (err) console.log(err)
		res.send(result)
	})
})

app.get("/hello", (req, res) => {
	res.send({ message: "Hello" })
})

server.listen(8000, err => {
	if (err) console.log(err)
	console.log("Server listening!")
})
