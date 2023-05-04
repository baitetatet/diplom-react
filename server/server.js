const express = require("express")
const app = express()
const cors = require("cors")
const server = require("http").createServer(app)
const mysql = require("mysql")
const cookieParser = require("cookie-parser")
const uuidv4 = require("uuid").v4
const fileUpload = require("express-fileupload")

const db = mysql.createConnection({
	user: "root",
	host: "127.0.0.1",
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
app.use(fileUpload())

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
			res.send(result ? result : "false")
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

app.post("/day-tasks", (req, res) => {
	const loggedUser = req.signedCookies.logged
	const currentDate = req.body.currentDate

	db.query(
		'SELECT DISTINCT t.id, t.description, t.director, t.place, DATE_FORMAT(t.date_start, "%Y-%m-%d") AS date_start, DATE_FORMAT(t.date_end, "%Y-%m-%d") AS date_end, TIME_FORMAT(t.time_start, "%H:%i") AS time_start, TIME_FORMAT(t.time_end, "%H:%i") AS time_end, t.place, t.reporter, t.status FROM task t, user, involved_user inv_usr WHERE user.cookie_password = ? AND t.confirmer = user.post AND date_start = ? AND t.status != "confirmed"',
		[loggedUser, currentDate],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})

app.post("/week-tasks", (req, res) => {
	const loggedUser = req.signedCookies.logged
	const startWeek = req.body.startWeek
	const endWeek = req.body.endWeek

	db.query(
		'SELECT DISTINCT t.id, t.description, t.director, t.place, DATE_FORMAT(t.date_start, "%Y-%m-%d") AS date_start, DATE_FORMAT(t.date_end, "%Y-%m-%d") AS date_end, TIME_FORMAT(t.time_start, "%H:%i") AS time_start, TIME_FORMAT(t.time_end, "%H:%i") AS time_end, t.place, t.reporter, t.status FROM task t, user, involved_user inv_usr WHERE user.cookie_password = ? AND t.confirmer = user.post AND date_start >= ? AND date_start <= ?',
		[loggedUser, startWeek, endWeek],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})

app.get("/get-tasks", (req, res) => {
	const loggedUser = req.signedCookies.logged
	db.query(
		'SELECT DISTINCT t.id, t.description, t.director, t.place, DATE_FORMAT(t.date_start, "%Y-%m-%d") AS date_start, DATE_FORMAT(t.date_end, "%Y-%m-%d") AS date_end, TIME_FORMAT(t.time_start, "%H:%i") AS time_start, TIME_FORMAT(t.time_end, "%H:%i") AS time_end, t.place, t.reporter, t.status FROM task t, user, involved_user inv_usr WHERE user.cookie_password = ? AND t.confirmer = user.post',
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
		"INSERT task (description,director,date_start,date_end,time_start,time_end, place, reporter, confirmer, commander) VALUES (?,?,?,?,?,?,?,?,?,?)",
		[
			newTask.description,
			newTask.director,
			newTask.dateStart,
			newTask.dateEnd,
			newTask.timeStart,
			newTask.timeEnd,
			newTask.place,
			newTask.reporter,
			newTask.confirmer,
			newTask.commander,
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
					"INSERT stage (task_id, date_start, date_end, description, status) VALUES (?,?,?,?,?)",
					[
						taskId,
						stage.startDate,
						stage.endDate,
						stage.description,
						"isProcessing",
					],
					err => {
						if (err) console.log(err)
					}
				)
			})
		}
	)
	res.send({ data: "OK" })
})

app.post("/get-stages", (req, res) => {
	const taskId = req.body.taskId
	db.query(
		'SELECT id, task_id, DATE_FORMAT(date_start, "%Y-%m-%d") AS date_start, DATE_FORMAT(date_end, "%Y-%m-%d") AS date_end, description, status FROM stage WHERE task_id = ?',
		[taskId],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
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

app.post("/involved-in-task", (req, res) => {
	const taskId = req.body.taskId
	db.query(
		"SELECT u.name,u.surname,u.post, u.rank FROM user u, involved_user inv_usr WHERE u.id = inv_usr.user_id AND inv_usr.task_id = ?",
		[taskId],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})

app.post("/change-stage-status", (req, res) => {
	const stageId = req.body.stageId
	const stageStatus = req.body.status
	db.query(
		"UPDATE stage SET status = ? WHERE id = ?",
		[stageStatus, stageId],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})
app.post("/change-task-status", (req, res) => {
	const taskId = req.body.taskId
	const taskStatus = req.body.taskStatus
	db.query(
		"UPDATE task SET status = ? WHERE id = ?",
		[taskStatus, taskId],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})
app.post("/send-on-confirmation", (req, res) => {
	const taskId = req.body.taskId
	const taskStatus = req.body.taskStatus
	const timeComplete = req.body.timeComplete
	db.query("UPDATE task SET time_complete = ?, status = ? WHERE id = ?", [
		timeComplete,
		taskStatus,
		taskId,
	])
})
app.post("/confirmation-tasks", (req, res) => {
	const userId = req.body.userId
	db.query(
		"SELECT * FROM task WHERE status = 'onConfirmation' AND commander = ?",
		[userId],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})
app.post("/check-status-all-stages", (req, res) => {
	const taskId = req.body.taskId
	db.query(
		"SELECT status FROM stage WHERE task_id = ?",
		[taskId],
		(err, result) => {
			if (err) console.log(err)
			const response = result.every(
				stageStatus => stageStatus.status === "onConfirmation"
			)
				? "readyForConfirmation"
				: "inProcessing"
			res.send(response)
		}
	)
})
app.post("/status-all-stages", (req, res) => {
	const taskId = req.body.taskId

	db.query(
		"SELECT id FROM stage WHERE task_id = ?",
		[taskId],
		(err, result) => {
			if (err) console.log(err)
			console.log(result)
			res.send(result)
		}
	)
})
app.post("/get-name", (req, res) => {
	const userPost = req.body.userPost
	db.query("SELECT * FROM user WHERE post = ?", [userPost], (err, result) => {
		if (err) console.log(err)
		res.send(result)
	})
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

app.post("/post-file", (req, res) => {
	const { taskId, stageId } = req.body
	const uploadedFile = req.files.file
	console.log("POST_FILE!@!!!")
	const uploadPath = __dirname + "/uploads/" + uploadedFile.name

	uploadedFile.mv(uploadPath, err => {
		if (err) {
			console.log(err)
			console.log("Failed!")
		} else console.log("Successfully upload!")
	})
	console.log(typeof uploadPath)

	db.query(
		"UPDATE stage SET file = ? WHERE id = ? AND task_id = ?",
		[uploadedFile.name, stageId, taskId],
		(err, result) => {
			if (err) console.log(err)
			res.send(result)
		}
	)
})
app.post("/set-active-stage-for-download", (req, res) => {
	const stageId = req.body.stageId
	res
		.cookie("stageId", stageId, {
			httpOnly: true,
			signed: true,
		})
		.send("STAGE SET!")
})

app.get("/stage-file", (req, res) => {
	const stageId = req.signedCookies.stageId
	const filePath = __dirname + "/uploads/"
	db.query("SELECT file FROM stage WHERE id = ?", [stageId], (err, result) => {
		if (err) console.log(err)
		res.clearCookie("stageId")
		res.download(filePath + result[0].file, result[0].file)
	})
})

server.listen(8000, err => {
	if (err) console.log(err)
	console.log("Server listening!")
})
