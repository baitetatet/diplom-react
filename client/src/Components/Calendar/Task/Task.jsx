import { useDispatch } from "react-redux"
import { changePopUpTaskState } from "store/reducers/popUpTaskState"
import Axios from "axios"
import { dateFormat } from "hooks/date"

export const Task = props => {
	const taskType = {
		confirmed: "green",
		onConfirmation: "yellow",
		overdueTask: "red",
		inProcessing: "transparent",
	}
	const dispatch = useDispatch()
	const handlerClickTask = event => {
		if (event.target.classList.value.includes("task")) {
			Axios.post("/involved-in-task", {
				taskId: props.task.id,
			})
				.then(res => {
					dispatch(
						changePopUpTaskState({
							popUpTaskActive: true,
							activeTask: { ...props.task, involved: res.data },
							typePopUp: props.typePopUp,
						})
					)
				})
				.catch(err => console.log(err))
		}
	}
	const selectStatusTask = task => {
		if (
			task.date_end < dateFormat(new Date()) &&
			task.status === "inProcessing"
		) {
			return "overdueTask"
		}
		return task.status
	}

	return (
		<div
			className={
				props.typePopUp === "response"
					? "confirmation-task__content task yellow"
					: props.table +
					  "__list-time__item__content_task task " +
					  taskType[selectStatusTask(props.task)]
			}
			data-date={props.task.date_start}
			data-time={props.task.time_start}
			onClick={event => handlerClickTask(event)}
		>
			<p className="task__text">{props.task.description}</p>
			{props.children}
		</div>
	)
}
