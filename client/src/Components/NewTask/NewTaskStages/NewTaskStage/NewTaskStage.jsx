export const NewTaskStage = ({ stage, stages, setStages }) => {
	const VARIABLES = {
		deleteButton: "Удалить",
	}
	const { description, stageDateInterval } = stage

	const handlerDeleteClick = event => {
		const deletingTaskDescription =
			event.target.previousElementSibling.innerHTML
		const newStages = stages.filter(
			stage => stage.description !== deletingTaskDescription
		)
		setStages(newStages)
	}

	return (
		<div className="new-task__stages__stage">
			<div className="new-task__stages__stage__inner">
				<div className="new-task__stages__stage_date-interval">
					{stageDateInterval}
				</div>
				<div className="new-task__stages__stage_description">{description}</div>
				<div
					className="new-task__stages__stage_delete-button button-red"
					onClick={event => handlerDeleteClick(event)}
				>
					{VARIABLES.deleteButton}
				</div>
			</div>
		</div>
	)
}
