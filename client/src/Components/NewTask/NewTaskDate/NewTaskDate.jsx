import { dateFormat } from "hooks/date"
import { useState } from "react"
export const NewTaskDate = () => {
	const VARIABLES = {
		title: "Период проведения: ",
		labelDateStart: "c",
		labelDateEnd: "до",
	}
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const currentDate = dateFormat(new Date())

	const handlerChangeStartInput = event => {
		const valueInput = new Date(event.target.value)
		valueInput > endDate && setEndDate(valueInput)
		setStartDate(valueInput)
	}
	const handlerChangeEndInput = event => {
		const valueInput = new Date(event.target.value)
		setEndDate(valueInput < startDate ? startDate : valueInput)
	}

	return (
		<div className="new-task__date">
			<h3 className="new-task__date_title">{VARIABLES.title}</h3>
			<label htmlFor="dateStart">
				{VARIABLES.labelDateStart}
				<input
					name="dateStart"
					id="dateStart"
					type="date"
					value={dateFormat(startDate)}
					min={currentDate}
					onChange={event => handlerChangeStartInput(event)}
					required
				/>
			</label>
			<label htmlFor="dateEnd">
				{VARIABLES.labelDateEnd}
				<input
					name="dateEnd"
					id="dateEnd"
					type="date"
					min={currentDate}
					value={dateFormat(endDate)}
					onChange={event => handlerChangeEndInput(event)}
				/>
			</label>
		</div>
	)
}
