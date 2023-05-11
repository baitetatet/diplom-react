export const NewTaskDescription = () => {
	const VARIABLES = {
		title: "Описание:",
	}

	return (
		<div className="new-task__description">
			<label htmlFor="description">
				<h3 className="new-task__description_title">{VARIABLES.title}</h3>
				<textarea
					name="description"
					id="description"
					placeholder="Введите описание задачи"
					required
				/>
			</label>
		</div>
	)
}
