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
	const handlerChangeInputs = (event, setDate) => {
		const inputDate = event.target.value
		setDate(new Date(inputDate))
	}

	const converterDateForDataBase = date => {
		return dateFormat(date)
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
				startDate: converterDateForDataBase(startDate),
				endDate: converterDateForDataBase(endDate ? endDate : startDate),
				stageDateInterval: stageDateInterval,
			},
		])
		setCreatingStage(false)
	}
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
						onChange={event => handlerChangeInputs(event, setStartDate)}
						required
						min={converterDateForDataBase(new Date())}
					/>
				</div>
				<div className="new-task__stages__new-stage__end-date">
					<h3 className="new-task__stages__new-stage__end-date_title">
						{VARIABLES.endDateTitle}
					</h3>
					<input
						className="new-task__stages__new-stage__end-date_input"
						type="date"
						onChange={event => handlerChangeInputs(event, setEndDate)}
						value={converterDateForDataBase(new Date())}
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
