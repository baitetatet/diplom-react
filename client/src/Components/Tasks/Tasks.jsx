import Axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "store/reducers/taskByType"
import TaskVariant from "./TaskVariant/TaskVariant"

const Tasks = () => {
	const [tasks, setTasks] = useState([])
	const [activeTaskVariant, setActiveTaskVariant] = useState()
	const VARIABLES = {
		title: "Задачи",
		taskVariants: [
			{
				type: "actualTask",
				title: "Актуальные",
			},
			{
				type: "overdueTask",
				title: "Просроченные",
			},
			{
				type: "onConfirmationTask",
				title: "На проверке",
			},
		],
	}

	useEffect(() => {
		Axios.get("/get-tasks")
			.then(res => {
				setTasks(res.data)
			})
			.catch(err => console.log(err))
	}, [])

	const dispatch = useDispatch()
	useEffect(() => {
		tasks.forEach(task => {
			if (task.status === "onConfirmation") {
				dispatch(
					addTask({
						type: "onConfirmationTask",
						onConfirmationTask: task,
					})
				)
			} else if (
				new Date(task.date_end) >= new Date() &&
				task.status === "inProcessing"
			) {
				dispatch(addTask({ type: "actualTask", actualTask: task }))
			} else if (
				new Date(task.date_end) < new Date() &&
				task.status === "inProcessing"
			) {
				dispatch(addTask({ type: "overdueTask", overdueTask: task }))
			}
		})
	}, [tasks, dispatch])

	return (
		<section className="tasks">
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
							/>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}

export default Tasks
