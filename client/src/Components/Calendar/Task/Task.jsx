import { useDispatch } from "react-redux"
import { changePopUpTaskState } from "store/reducers/popUpTaskState"

export const Task = props => {
	const dispatch = useDispatch()
	const handlerClickTask = event => {
		event.target.classList.value.includes("task") &&
			dispatch(
				changePopUpTaskState({ popUpTaskActive: true, activeTask: props.task })
			)
	}

	return (
		<div
			className={props.table + "__list-time__item__content_task task green"}
			data-date={props.task.date_start}
			data-time={props.task.time_start}
			onClick={event => handlerClickTask(event)}
		>
			{/* <p className="task__text"> */}
			{props.task.description}
			{/* </p> */}
			{props.children}
		</div>
	)
}
