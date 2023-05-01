import Axios from "axios"
import { dateFormat, timeFormat } from "hooks/date"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	changeTaskStatus,
	sendOnConfirmation,
} from "store/reducers/popUpTaskState"

export const PopUpTaskConfirm = ({ typePopUp }) => {
	const { taskStatus, taskId, stages } = useSelector(state => ({
		taskStatus:
			typePopUp === "response" ? "confirmed" : state.popUpTaskState.taskStatus,
		taskId: state.popUpTaskState.activeTask.id,
		stages: state.popUpTaskState.stages,
	}))
	const VARIABLES = {
		inProcessing: "Выполните все этапы",
		readyForConfirmation: "Отправить на проверку",
		onConfirmation: "На проверке",
		confirmed: "Подтвердить",
	}

	const dispatch = useDispatch()
	useEffect(() => {
		taskStatus === "inProcessing" &&
			Axios.post("/check-status-all-stages", { taskId: taskId })
				.then(res => {
					dispatch(changeTaskStatus({ taskStatus: res.data }))
				})
				.catch(err => console.log(err))
	}, [taskId, taskStatus, dispatch, stages])

	const handlerClickButton = event => {
		if (taskStatus === "confirmed") {
			dispatch(
				changeTaskStatus({
					taskId: taskId,
					taskStatus: taskStatus,
				})
			)
		} else {
			dispatch(
				sendOnConfirmation({
					taskId: taskId,
					taskStatus: "onConfirmation",
					timeComplete: [dateFormat(new Date()), timeFormat(new Date())].join(
						" "
					),
				})
			)
		}
		window.location.reload()
	}

	return (
		<div
			className={`calendar__task_confirm button-green ${
				["onConfirmation", "inProcessing"].includes(taskStatus) &&
				"button-confirm"
			}`}
			style={{ textAlign: "center", marginBottom: "0px", marginTop: "auto" }}
			onClick={handlerClickButton}
		>
			{VARIABLES[taskStatus]}
		</div>
	)
}
