const express = require("express")
const app = express()
const cors = require("cors")
const server = require("http").createServer(app)
const mysql = require("mysql")

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "12345678",
	database: "mydb",
})

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
	console.log("Server!")
	res.sendStatus(200)
})

app.post("/authorization", (req, res) => {
	const login = req.body.login
	const password = req.body.password

	db.query(
		"SELECT * FROM user WHERE login=? AND password=? ",
		[login, password],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})

server.listen(8000, err => {
	if (err) console.log(err)
	console.log("Server listening!")
})
