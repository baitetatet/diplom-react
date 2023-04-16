import { PopUpTaskContent } from "../PopUpTaskContent/PopUpTaskContent"
import { PopUpTaskDescriptionCategory } from "./PopUpTaskDescriptionCategory"

export const PopUpTaskDescription = () => {
	const CATEGORY = [
		"director",
		"involved",
		"time_start",
		"place",
		"reporter",
		"date_interval",
	]

	return (
		<div className="calendar__task__description">
			{CATEGORY.map(category => (
				<PopUpTaskDescriptionCategory category={category} key={category} />
			))}
			<PopUpTaskContent />
		</div>
	)
}
