export const NewTaskPlace = () => {
	const VARIABLES = {
		title: "Место проведения: ",
	}
	return (
		<div className="new-task__place">
			<label htmlFor="place">
				<h3 className="new-task__place_title">{VARIABLES.title}</h3>
				<input
					className="new-task__place_select"
					type="text"
					name="place"
					id="place"
					placeholder="Введите место проведения"
					required
				/>
			</label>
		</div>
	)
}
