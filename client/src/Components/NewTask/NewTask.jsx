import { NewTaskDirector } from "./NewTaskDirector/NewTaskDirector"
import { NewTaskDescription } from "./NewTaskDescription/NewTaskDescription"
import { NewTaskInvolved } from "./NewTaskInvolved/NewTaskInvolved"
import { NewTaskReporter } from "./NewTaskReporter/NewTaskReporter"
import { NewTaskTime } from "./NewTaskTime/NewTaskTime"
import { NewTaskStages } from "./NewTaskStages/NewTaskStages"
import { NewTaskDate } from "./NewTaskDate/NewTaskDate"
import { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { addNewTask } from "../../store/reducers/newTask"
import { NewTaskPlace } from "./NewTaskPlace/NewTaskPlace"
import { UserData } from "UserDataContext"

export const NewTask = () => {
	const VARIABLES = {
		title: "Новая задача",
		placeTitle: "Место:",
		timeTitle: "Время:",
	}
	const { userData } = useContext(UserData)
	const dispatch = useDispatch()
	const [stages, setStages] = useState([])

	const filterInvolved = involved => {
		const involvedUsers = []
		for (let i = 0; i < involved.options.length; i++) {
			involved.options[i].selected &&
				involvedUsers.push(involved.options[i].value)
		}
		return involvedUsers
	}

	const submitNewTask = event => {
		event.preventDefault()
		const {
			description,
			director,
			dateStart,
			dateEnd,
			timeStart,
			timeEnd,
			involved,
			reporter,
			place,
		} = event.target

		dispatch(
			addNewTask({
				newTask: {
					description: description.value,
					director: director.value,
					place: place.value,
					dateStart: dateStart.value,
					dateEnd: dateEnd.value ? dateEnd.value : dateStart.value,
					timeStart: timeStart.value,
					timeEnd: timeEnd.value ? timeEnd.value : timeEnd.value,
					involved: filterInvolved(involved),
					reporter: reporter.value,
					commander: userData.id,
				},
				stages: stages,
			})
		)
		resetForm(event)
	}

	const resetForm = event => {
		event.target.reset()
		setStages([])
	}

	return (
		<section className="new-task">
			<div className="new-task__inner">
				<div className="new-task__header">
					<h2 className="new-task__header_title">{VARIABLES.title}</h2>
				</div>
				<form
					className="new-task__form"
					onSubmit={event => submitNewTask(event)}
				>
					<div className="new-task__content">
						<NewTaskDescription />
						<NewTaskDirector />
						<NewTaskPlace />
						<NewTaskDate />
						<NewTaskTime />
						<NewTaskInvolved />
						<NewTaskReporter />
						<NewTaskStages stages={stages} setStages={setStages} />
					</div>
					<div className="new-task__buttons">
						<div
							className="new-task__buttons_reset button-red"
							onClick={event => resetForm(event)}
						>
							Сброс
						</div>
						<input
							className="new-task__buttons_submit button-green"
							type="submit"
							value={"Отправить"}
						/>
					</div>
				</form>
			</div>
		</section>
	)
}
