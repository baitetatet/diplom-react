import { dateInterval } from "hooks/converterTimeInterval"
export const PopUpTaskDescriptionCategory = ({ category, task }) => {
	const CATEGORY_PATTERN = {
		director: {
			title: "Руководитель:",
			content: task.director,
		},
		involved: {
			title: "Кто привлекается:",
			content: task.involved.map(user => user.post).join(", "),
		},
		time_start: {
			title: "Время:",
			content: task.time_start,
		},
		place: {
			title: "Место:",
			content: task.place,
		},
		date_interval: {
			title: "Период проведения:",
			content: dateInterval(new Date(task.date_start), new Date(task.date_end)),
		},
		reporter: {
			title: "Кто готов.:",
			content: task.reporter,
		},
	}

	return (
		<div className={`calendar__task__description__${category}`}>
			<h3 className={`calendar__task__description__${category}_title`}>
				{CATEGORY_PATTERN[category].title}
			</h3>
			<p className={`calendar__task__description__${category}_content`}>
				{CATEGORY_PATTERN[category].content}
			</p>
		</div>
	)
}
