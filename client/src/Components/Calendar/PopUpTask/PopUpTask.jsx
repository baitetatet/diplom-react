import { PopUpTaskDescription } from "./PopUpTasksDescription/PopUpTaskDescription"
import { useDispatch } from "react-redux"
import { changePopUpTaskState } from "store/reducers/popUpTaskState"

export const PopUpTask = ({ task }) => {
	const dispatch = useDispatch()

	const closePopUp = e => {
		if (
			e.target.classList.value.includes("close") ||
			e.target.classList.value.includes("active")
		) {
			dispatch(changePopUpTaskState({ popUpTaskActive: false }))
		}
	}

	return (
		<section
			className="calendar__task calendar__popup active"
			onClick={e => closePopUp(e)}
		>
			<div className="calendar__task__inner calendar__popup__inner">
				<div className="calendar__task__close calendar__popup__header__close" />
				<h3 className="calendar__task__title">{task.description}</h3>
				<PopUpTaskDescription task={task} />
			</div>
		</section>
	)
}
