import { ConfirmationTask } from "Components/ConfirmationTasks/ConfirmationTask/ConfirmationTask"
import { useContext, useEffect, useState } from "react"
import { UserData } from "UserDataContext"
import Axios from "axios"

export const ConfirmationTasks = () => {
	const VARIABLES = {
		componentTitle: "Задачи для подтверждения",
		confirmationTasksEmpty: "На данный момент задач для подтверждения нет.",
	}
	const { userData } = useContext(UserData)
	const [confirmationTasks, setConfirmationTasks] = useState([])

	useEffect(() => {
		Axios.post("/confirmation-tasks", { userId: userData.id })
			.then(res => setConfirmationTasks(res.data))
			.catch(err => console.log(err))
	}, [userData.id])

	return (
		<section className="confirmation-tasks">
			<div className="confirmation-tasks__inner">
				<div className="confirmation-tasks__header">
					<h2 className="confirmation-tasks__header_title">
						{VARIABLES.componentTitle}
					</h2>
				</div>
				<div className="confirmation-tasks__content">
					{confirmationTasks.length ? (
						confirmationTasks.map(task => (
							<ConfirmationTask taskData={task} key={task.id} />
						))
					) : (
						<div className="confirmation-tasks__content_empty">
							{VARIABLES.confirmationTasksEmpty}
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
