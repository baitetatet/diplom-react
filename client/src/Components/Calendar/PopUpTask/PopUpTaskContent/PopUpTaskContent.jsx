import Axios from "axios"
import { useEffect, useState } from "react"
import { dateInterval } from "hooks/converterTimeInterval"
import { PopUpTaskContentButtons } from "./PopUpTaskContentButtons/PopUpTaskContentButtons"
import { useSelector } from "react-redux"

export const PopUpTaskContent = () => {
	const taskId = useSelector(state => state.popUpTaskState.activeTask.id)
	const [stages, setStages] = useState([])
	const VARIABLES = {
		title: "Включает:",
		postFile: "Прикрепить файл",
		confirmTask: "Выполнить",
		onConfirmationTask: "Выполнено",
	}

	useEffect(() => {
		Axios.post("/get-stages", { taskId: taskId })
			.then(res => setStages(res.data))
			.catch(err => console.log(err))
	}, [taskId])

	return (
		<article className="calendar__task__description__category__content category__content">
			<h3 className="category__content_title">{VARIABLES.title}</h3>
			<div className="category__content_list">
				{stages.map(stage => (
					<div className="category__content_item" key={stage.description}>
						<div className="category__content_time">
							{dateInterval(
								new Date(stage.date_start),
								new Date(stage.date_end)
							)}
						</div>
						<p className="category__content_description">{stage.description}</p>
						<PopUpTaskContentButtons stage={stage} VARIABLES={VARIABLES} />
					</div>
				))}
			</div>
		</article>
	)
}
