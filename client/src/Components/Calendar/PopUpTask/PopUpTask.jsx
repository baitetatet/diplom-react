import { PopUpTaskDescription } from "./PopUpTasksDescription/PopUpTaskDescription"
import { useDispatch, useSelector } from "react-redux"
import { changePopUpTaskState } from "store/reducers/popUpTaskState"
import { PopUpTaskConfirm } from "./PopUpTaskConfirm/PopUpTaskConfirm"
import { PopUpTaskHeader } from "./PopUpTaskHeader/PopUpTaskHeader"

export const PopUpTask = () => {
	const dispatch = useDispatch()
	const description = useSelector(
		state => state.popUpTaskState.activeTask.description
	)

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
				<PopUpTaskHeader description={description} />
				<PopUpTaskDescription />
				<PopUpTaskConfirm />
			</div>
		</section>
	)
}
