import Axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeTaskStatus } from "store/reducers/popUpTaskState"

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

	return (
		<div
			className={`calendar__task_confirm button-green ${
				["onConfirmation", "inProcessing"].includes(taskStatus) &&
				"button-confirm"
			}`}
			style={{ textAlign: "center", marginBottom: "0px", marginTop: "auto" }}
			onClick={() =>
				dispatch(
					changeTaskStatus({
						taskId: taskId,
						taskStatus:
							taskStatus === "confirmed" ? taskStatus : "onConfirmation",
					})
				)
			}
		>
			{VARIABLES[taskStatus]}
		</div>
	)
}
