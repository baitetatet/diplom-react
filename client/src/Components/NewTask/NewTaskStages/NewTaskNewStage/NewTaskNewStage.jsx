import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { dateInterval } from "hooks/converterTimeInterval"
import { dateFormat } from "hooks/date"

export const NewTaskNewStage = ({ setCreatingStage, stages, setStages }) => {
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [newTaskDescription, setNewTaskDescription] = useState("")

	const VARIABLES = {
		descriptionTitle: "Описание:",
		startDateTitle: "Начало:",
		endDateTitle: "Окончание:",
		cancelButton: "Отменить",
		addButton: "Добавить",
	}

	const handlerChangeDescription = event => {
		setNewTaskDescription(event.target.value)
	}
	const handlerCancelButton = () => {
		setCreatingStage(false)
	}
	const handlerChangeStartInput = event => {
		const valueInput = new Date(event.target.value)
		valueInput > endDate && setEndDate(valueInput)
		setStartDate(valueInput)
	}
	const handlerChangeEndInput = event => {
		const valueInput = new Date(event.target.value)
		setEndDate(valueInput < startDate ? startDate : valueInput)
	}

	const handlerAddButton = () => {
		const stageDateInterval = dateInterval(
			startDate,
			endDate ? endDate : startDate
		)

		setStages([
			...stages,
			{
				id: uuidv4(),
				description: newTaskDescription,
				startDate: dateFormat(startDate),
				endDate: dateFormat(endDate ? endDate : startDate),
				stageDateInterval: stageDateInterval,
			},
		])
		setCreatingStage(false)
	}
	const currentDate = dateFormat(new Date())
	return (
		<div className="new-task__stages__new-stage">
			<div className="new-task__stages__new-stage__inner">
				<div className="new-task__stages__new-stage__description">
					<h3 className="new-task__stages__new-stage__description_title">
						{VARIABLES.descriptionTitle}
					</h3>
					<textarea
						className="new-task__stages__new-stage__description_textarea"
						onChange={event => handlerChangeDescription(event)}
						required
					/>
				</div>
				<div className="new-task__stages__new-stage__start-date">
					<h3 className="new-task__stages__new-stage__start-date_title">
						{VARIABLES.startDateTitle}
					</h3>
					<input
						className="new-task__stages__new-stage__start-date_input"
						type="date"
						onChange={event => handlerChangeStartInput(event)}
						required
						min={currentDate}
						value={dateFormat(startDate)}
					/>
				</div>
				<div className="new-task__stages__new-stage__end-date">
					<h3 className="new-task__stages__new-stage__end-date_title">
						{VARIABLES.endDateTitle}
					</h3>
					<input
						className="new-task__stages__new-stage__end-date_input"
						type="date"
						onChange={event => handlerChangeEndInput(event)}
						min={currentDate}
						value={dateFormat(endDate)}
					/>
				</div>
			</div>
			<div className="new-task__stages__new-stage__buttons">
				<div
					className="new-task__stages__buttons_cancel button-red"
					onClick={handlerCancelButton}
				>
					{VARIABLES.cancelButton}
				</div>
				<div
					className="new-task__stages__buttons_add button-green"
					onClick={() => handlerAddButton()}
				>
					{VARIABLES.addButton}
				</div>
			</div>
		</div>
	)
}
