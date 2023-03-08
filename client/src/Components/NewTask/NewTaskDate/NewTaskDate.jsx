export const NewTaskDate = () => {
	const VARIABLES = {
		title: "Период проведения: ",
		labelDateStart: "c",
		labelDateEnd: "до",
	}
	return (
		<div className="new-task__date">
			<h3 className="new-task__date_title">{VARIABLES.title}</h3>
			<label htmlFor="dateStart">
				{VARIABLES.labelDateStart}
				<input name="dateStart" id="dateStart" type="date" required />
			</label>
			<label htmlFor="dateEnd">
				{VARIABLES.labelDateEnd}
				<input name="dateEnd" id="dateEnd" type="date" />
			</label>
		</div>
	)
}
