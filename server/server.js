const express = require("express")
const app = express()
const cors = require("cors")
const server = require("http").createServer(app)
const mysql = require("mysql")
const cookieParser = require("cookie-parser")
const uuidv4 = require("uuid").v4

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "12345678",
	database: "mydb",
})

const URL = "http://localhost:3000"
app.use(
	cors({
		credentials: true,
		origin: URL,
	})
)
app.use(express.json())
app.use(cookieParser("82e4e438a0705fabf61f9854e3b575af"))

app.get("/", (req, res) => {
	console.log("Server!")
	res.sendStatus(200)
})

app.get("/check-logged", (req, res) => {
	db.query(
		"SELECT * FROM user WHERE cookie_password = ?",
		[req.signedCookies.logged],
		(err, result) => {
			if (err) console.log(err)
			result.length ? res.send(result) : res.send("false")
		}
	)
})
app.get("/log-out", (req, res) => {
	res.clearCookie("logged")
	res.send("set cookie")
})

app.post("/authorization", (req, res) => {
	const login = req.body.login
	const password = req.body.password

	db.query(
		"SELECT * FROM user WHERE login=? AND password=? ",
		[login, password],
		(err, result) => {
			if (err) console.log(err)
			if (result) {
				const id = uuidv4()

				db.query(
					"UPDATE user SET cookie_password = ? WHERE login = ?",
					[id, login],
					(err, res) => {
						if (err) console.log(err)
						console.log("DB update!")
					}
				)

				res
					.cookie("logged", id, {
						httpOnly: true,
						signed: true,
					})
					.send(result)
			}
		}
	)
})

server.listen(8000, err => {
	if (err) console.log(err)
	console.log("Server listening!")
})
