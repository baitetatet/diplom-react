import { useDispatch } from "react-redux"
import { confirmStageTask } from "store/reducers/popUpTaskState"

export const PopUpTaskContentButtons = ({ stage, VARIABLES }) => {
	const dispatch = useDispatch()
	const handlerClickPostFile = event => {
		const inputPostFile = event.target.previousSibling
		inputPostFile.click()
	}
	return (
		<>
			{stage.status === "isProcessing" && (
				<div className="category__content__buttons">
					<div className="category__content_post-file">
						<input className="category__content__post-file_input" type="file" />
						<button
							className="category__content__post-file_button button"
							onClick={event => handlerClickPostFile(event)}
						>
							{VARIABLES.postFile}
						</button>
					</div>
					<button
						className="category__content_confirm-task button"
						onClick={() => dispatch(confirmStageTask({ stage: stage }))}
					>
						{VARIABLES.confirmTask}
					</button>
				</div>
			)}
			{stage.status === "onConfirmation" && (
				<div className="category__content_confirm button">
					{VARIABLES.onConfirmationTask}
				</div>
			)}
		</>
	)
}
