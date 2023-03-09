export const PopUpTaskDescriptionCategory = ({ category, task }) => {
	const CATEGORY_PATTERN = {
		director: {
			title: "Руководитель:",
			content: "ЗНА по УНР",
		},
		// involved: {
		// 	title: "Кто привлекается:",
		// 	content: "НФ, НК, СПНУМО",
		// },
		time_start: {
			title: "Время:",
			content: "10.00-17.00",
		},
		place: {
			title: "Место:",
			content: "Комн. А-320",
		},
		reporter: {
			title: "Кто готов.:",
			content: "НУМО",
		},
	}

	return (
		<div className={`calendar__task__description__${category}`}>
			<h3 className={`calendar__task__description__${category}_title`}>
				{CATEGORY_PATTERN[category].title}
			</h3>
			<p className={`calendar__task__description__${category}_content`}>
				{task[category]}
			</p>
		</div>
	)
}
