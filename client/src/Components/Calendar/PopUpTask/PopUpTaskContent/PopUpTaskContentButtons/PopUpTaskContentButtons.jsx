import { useState } from "react"
import { useDispatch } from "react-redux"
import { confirmStageTask } from "store/reducers/popUpTaskState"
import Axios from "axios"

export const PopUpTaskContentButtons = ({ stage, VARIABLES }) => {
	const [stageStatus, setStageStatus] = useState(stage.status)
	const dispatch = useDispatch()
	const handlerClickPostFile = event => {
		const inputPostFile = event.target.previousSibling
		inputPostFile.click()
	}
	const handlerChangeInputFile = event => {
		const submitForm = event.target.previousSibling
		console.log(event.target.files)
		event.target.files.length && submitForm.click()
	}
	const handlerClickConfirmStage = () => {
		dispatch(confirmStageTask({ stage: stage }))
		setStageStatus("onConfirmation")
	}

	const handlerSubmitFile = event => {
		event.preventDefault()
		const inputPostFile = event.target[1]
		if (inputPostFile.files.length) {
			const formData = new FormData()
			formData.append("file", inputPostFile.files[0])
			console.log("formData: ", formData)
			Axios.post("/post-file", {
				file: formData,
				taskId: stage.task_id,
				stageId: stage.id,
			})
				.then(res => console.log(res))
				.catch(err => console.log(err))
		}
	}
	return (
		<>
			{stageStatus === "isProcessing" ? (
				<div className="category__content__buttons">
					<div className="category__content_post-file">
						<form onSubmit={event => handlerSubmitFile(event)}>
							<input type="submit" style={{ display: "none" }} />
							<input
								className="category__content__post-file_input"
								type="file"
								accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
								onChange={event => handlerChangeInputFile(event)}
							/>
							<button
								className="category__content__post-file_button button"
								onClick={event => handlerClickPostFile(event)}
							>
								{VARIABLES.postFile}
							</button>
						</form>
					</div>
					<button
						className="category__content_confirm-stage button"
						onClick={handlerClickConfirmStage}
					>
						{VARIABLES.confirmTask}
					</button>
				</div>
			) : (
				<div className="category__content_confirm button">
					{VARIABLES.onConfirmationTask}
				</div>
			)}
		</>
	)
}
