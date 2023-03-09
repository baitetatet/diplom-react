import Axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { confirmStageTask } from "store/reducers/popUpTaskState"
import { dateInterval } from "hooks/converterTimeInterval"

export const PopUpTaskContent = ({ task }) => {
	const dispatch = useDispatch()
	const [stages, setStages] = useState([])
	const VARIABLES = {
		title: "Включает:",
		postFile: "Прикрепить файл",
		confirmTask: "Выполнить",
	}
	const handlerClickPostFile = event => {
		const inputPostFile = event.target.previousSibling
		inputPostFile.click()
	}
	useEffect(() => {
		Axios.post("/get-stages", { taskId: task.id })
			.then(res => setStages(res.data))
			.catch(err => console.log(err))
	}, [task.id])

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
						<div className="category__content__buttons">
							<div className="category__content_post-file">
								<input
									className="category__content__post-file_input"
									type="file"
								/>
								<button
									className="category__content__post-file_button button"
									onClick={event => handlerClickPostFile(event)}
								>
									{VARIABLES.postFile}
								</button>
							</div>
							<button
								className="category__content_confirm-task button"
								onClick={event => dispatch(confirmStageTask({ stage: stage }))}
							>
								{VARIABLES.confirmTask}
							</button>
						</div>
					</div>
				))}
			</div>
		</article>
	)
}
