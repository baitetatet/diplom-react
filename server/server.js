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
	const loggedUser = req.signedCookies.logged
	res.clearCookie("logged")
	db.query("UPDATE user SET cookie_password = NULL WHERE cookie_password = ?", [
		loggedUser,
	])
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

app.get("/get-tasks", (req, res) => {
	const loggedUser = req.signedCookies.logged
	db.query(
		"SELECT * FROM task, user, involved_user inv_usr WHERE user.cookie_password = ? AND inv_usr.user_id = user.id",
		[loggedUser],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})

app.post("/new-task", async (req, res) => {
	const newTask = req.body.newTask
	const stages = req.body.stages
	db.query(
		"INSERT task (description,director,date_start,date_end,time_start,time_end) VALUES (?,?,?,?,?,?)",
		[
			newTask.description,
			newTask.director,
			newTask.dateStart,
			newTask.dateEnd,
			newTask.timeStart,
			newTask.timeEnd,
		],
		(err, result) => {
			if (err) console.log(err)
			const taskId = result.insertId

			newTask.involved.forEach(user => {
				db.query(
					"SELECT id FROM user WHERE post = ?",
					[user],
					(err, result) => {
						if (err) console.log(err)
						const userId = result[0].id
						db.query(
							"INSERT involved_user (task_id, user_id) VALUES (?,?)",
							[taskId, userId],
							(err, res) => {
								if (err) console.log(err)
								console.log(res)
							}
						)
					}
				)
			})

			stages.forEach(stage => {
				db.query(
					"INSERT stage (task_id, date_start, date_end, description) VALUES (?,?,?,?)",
					[taskId, stage.startDate, stage.endDate, stage.description],
					err => {
						if (err) console.log(err)
					}
				)
			})
		}
	)
	res.send({ data: "OK" })
})

app.get("/get_directors", (req, res) => {
	db.query(
		"SELECT user.id, user.post FROM user WHERE post NOT LIKE 'админ'",
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})

app.get("/get_involved", (req, res) => {
	const loggedUser = req.signedCookies.logged
	db.query(
		"SELECT * FROM user u WHERE u.id IN ( SELECT sub.id_subordinate FROM subordinated sub, user u WHERE u.cookie_password = ? AND u.id = sub.id_leader);",
		[loggedUser],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})
app.post("/insert_data", (req, res) => {
	const { count, target } = req.body
	db.query(
		"INSERT INTO subordinated VALUES (?,?)",
		[target, count],
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
