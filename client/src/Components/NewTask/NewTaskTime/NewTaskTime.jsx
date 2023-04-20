import { useState } from "react"

export const NewTaskTime = () => {
	const [startTime, setStartTime] = useState("06:00")
	const [endTime, setEndTime] = useState("06:00")
	const VARIABLES = {
		title: "Время: ",
		labelTimeStart: "с",
		labelTimeEnd: "до",
	}

	const handlerInputEndTime = event => {
		const valueInput = event.target.value
		setEndTime(valueInput < startTime ? startTime : valueInput)
	}
	const handlerInputStartTime = event => {
		const valueInput = event.target.value
		valueInput > endTime && setEndTime(valueInput)
		setStartTime(valueInput)
	}

	return (
		<div className="new-task__time">
			<h3 className="new-task__time_title">{VARIABLES.title}</h3>
			<label htmlFor="timeStart">
				{VARIABLES.labelTimeStart}
				<input
					name="timeStart"
					id="timeStart"
					type="time"
					required
					value={startTime}
					min={"06:00"}
					max={"23:59"}
					onChange={event => handlerInputStartTime(event)}
				/>
			</label>
			<label htmlFor="timeEnd">
				{VARIABLES.labelTimeEnd}
				<input
					name="timeEnd"
					id="timeEnd"
					type="time"
					value={endTime}
					min={"06:00"}
					max={"23:59"}
					onChange={event => handlerInputEndTime(event)}
				/>
			</label>
		</div>
	)
}
