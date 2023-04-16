import { Task } from "Components/Calendar/Task/Task"
import { useSelector } from "react-redux"

const TaskVariant = ({
	tasksType,
	activeTaskVariant,
	setActiveTaskVariant,
}) => {
	const handlerClickTaskVariant = event => {
		if (
			event.target.classList.value.includes("task-variant__header") ||
			event.target.nodeName === "SPAN"
		) {
			console.log("taskType: ", tasksType)
			console.log("activeTaskVariant: ", activeTaskVariant)
			setActiveTaskVariant(
				activeTaskVariant === tasksType.type ? "" : tasksType.type
			)
		}
	}
	const tasks = useSelector(state => state.taskByType[tasksType.type])
	return (
		<article
			className={`tasks__task-variant${
				activeTaskVariant === tasksType.type ? " active" : ""
			}`}
			onClick={event => handlerClickTaskVariant(event)}
		>
			<div className="tasks__task-variant__inner">
				<div className="tasks__task-variant__header">
					<h3 className="tasks__task-variant__header_title">
						{tasksType.title}
						<span> ({tasks.length})</span>
					</h3>
					<span className="tasks__header_arrow arrow">
						<span />
						<span />
					</span>
				</div>
				<div className="tasks__task-variant__content">
					{tasks.map(task => (
						<Task table={"tasks"} task={task} key={task.id} />
					))}
				</div>
			</div>
		</article>
	)
}

export default TaskVariant
