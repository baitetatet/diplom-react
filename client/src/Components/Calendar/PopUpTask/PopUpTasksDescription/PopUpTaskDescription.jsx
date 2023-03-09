import { PopUpTaskContent } from "../PopUpTaskContent/PopUpTaskContent"
import { PopUpTaskDescriptionCategory } from "./PopUpTaskDescriptionCategory"

export const PopUpTaskDescription = ({ task }) => {
	const CATEGORY = [
		"director",
		// "involved",
		"time_start",
		"place",
		"reporter",
		"content",
	]

	return (
		<div className="calendar__task__description">
			{CATEGORY.map(category =>
				category === "content" ? (
					<PopUpTaskContent task={task} key={category} />
				) : (
					<PopUpTaskDescriptionCategory
						category={category}
						task={task}
						key={category}
					/>
				)
			)}
		</div>
	)
}
