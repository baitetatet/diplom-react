import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { confirmStageTask } from "store/reducers/popUpTaskState"
import Axios from "axios"

export const PopUpTaskContentButtons = ({ stage, VARIABLES }) => {
	const fileInput = useRef(null)
	const [stageStatus, setStageStatus] = useState(stage.status)
	const [uploadFile, setUploadFile] = useState("")
	const [selectedFile, setSelectedFile] = useState(null)
	const dispatch = useDispatch()

	const handlerChangeInputFile = event => {
		const file = event.target.files[0]
		setSelectedFile(file)
		setUploadFile(file.name)
	}

	const handlerClickConfirmStage = () => {
		dispatch(confirmStageTask({ stage: stage }))
		setStageStatus("onConfirmation")

		if (selectedFile) {
			const formData = new FormData()
			formData.append("file", selectedFile)
			formData.append("stageId", stage.id)
			formData.append("taskId", stage.task_id)

			Axios.post("/post-file", formData)
				.then(res => console.log(res))
				.catch(err => console.log(err))
		}
	}

	return (
		<>
			{stageStatus === "isProcessing" ? (
				<form>
					<div className="category__content__buttons">
						<div className="category__content_post-file">
							{uploadFile ? (
								<p className="category__content__post-file_name-file">
									{uploadFile}
								</p>
							) : (
								<>
									<input
										className="category__content__post-file_input"
										type="file"
										name="file"
										accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
										onChange={event => handlerChangeInputFile(event)}
										ref={fileInput}
									/>
									<button
										className="category__content__post-file_button button"
										onClick={event => {
											event.preventDefault()
											fileInput.current.click()
										}}
									>
										{VARIABLES.postFile}
									</button>
								</>
							)}
						</div>
						<button
							className="category__content_confirm-stage button"
							onClick={handlerClickConfirmStage}
						>
							{VARIABLES.confirmTask}
						</button>
					</div>
				</form>
			) : (
				<div className="category__content_confirm button">
					{VARIABLES.onConfirmationTask}
				</div>
			)}
		</>
	)
}
