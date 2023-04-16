import { dateInterval } from "hooks/converterTimeInterval"
import { useSelector } from "react-redux"
export const PopUpTaskDescriptionCategory = ({ category }) => {
	const { activeTask } = useSelector(state => state.popUpTaskState)
	const CATEGORY_PATTERN = {
		director: {
			title: "Руководитель:",
			content: activeTask.director,
		},
		involved: {
			title: "Кто привлекается:",
			content: activeTask.involved.map(user => user.post).join(", "),
		},
		time_start: {
			title: "Время:",
			content: activeTask.time_start,
		},
		place: {
			title: "Место:",
			content: activeTask.place,
		},
		date_interval: {
			title: "Период проведения:",
			content: dateInterval(
				new Date(activeTask.date_start),
				new Date(activeTask.date_end)
			),
		},
		reporter: {
			title: "Кто готов.:",
			content: activeTask.reporter,
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
