import Axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addTask, clearTypes } from "store/reducers/taskByType"
import { dateFormat } from "hooks/date"
import TaskVariant from "./TaskVariant/TaskVariant"
import { SelectFormatTable } from "Components/Calendar/SelectFormatTable/SelectFormatTable"
import { useContext } from "react"
import { UserData } from "UserDataContext"

const Tasks = () => {
	const { userData } = useContext(UserData)
	const [tasks, setTasks] = useState([])
	const [optionValues, setOptionValues] = useState([])
	const [activeTaskVariant, setActiveTaskVariant] = useState()
	const [activeUser, setActiveUser] = useState(userData.post)
	const VARIABLES = {
		title: "Задачи",
		taskVariants: [
			{
				type: "actualTask",
				title: "Актуальные",
			},
			{
				type: "onConfirmationTask",
				title: "На проверке",
			},
			{
				type: "confirmedTask",
				title: "Завершенные",
			},
			{
				type: "overdueTask",
				title: "Просроченные",
			},
		],
	}

	useEffect(() => {
		Axios.get("/get_involved")
			.then(res =>
				setOptionValues([{ id: userData.id, post: userData.post }, ...res.data])
			)
			.catch(err => console.log(err))
		Axios.post("/get-tasks", { userPost: activeUser })
			.then(res => {
				setTasks([...res.data])
			})
			.catch(err => console.log(err))
	}, [activeUser, userData.id, userData.post])

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(clearTypes())
		tasks.forEach(task => {
			if (task.status === "onConfirmation") {
				dispatch(
					addTask({
						type: "onConfirmationTask",
						onConfirmationTask: task,
					})
				)
			} else if (task.status === "confirmed") {
				dispatch(
					addTask({
						type: "confirmedTask",
						confirmedTask: task,
					})
				)
			} else if (
				task.date_end >= dateFormat(new Date()) &&
				task.status === "inProcessing"
			) {
				dispatch(addTask({ type: "actualTask", actualTask: task }))
			} else if (
				task.date_end < dateFormat(new Date()) &&
				task.status === "inProcessing"
			) {
				dispatch(addTask({ type: "overdueTask", overdueTask: task }))
			}
		})
	}, [tasks, dispatch])

	return (
		<section className="tasks">
			<SelectFormatTable
				activeTable={activeUser}
				setActiveTable={setActiveUser}
				classN={"tasks__select-format"}
				optionValues={optionValues}
			/>
			<div className="tasks__inner">
				<div className="tasks__header">
					<h2 className="tasks__header_title">{VARIABLES.title}</h2>
				</div>
				<div className="tasks__content">
					<ul className="tasks__variants">
						{VARIABLES.taskVariants.map(tasksType => (
							<TaskVariant
								tasksType={tasksType}
								key={tasksType.type}
								activeTaskVariant={activeTaskVariant}
								setActiveTaskVariant={setActiveTaskVariant}
								typePopUp={userData.post === activeUser ? "request" : "control"}
							/>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}

export default Tasks
