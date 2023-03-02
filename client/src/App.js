import { useState } from "react"
import { Calendar } from "Components/Calendar/Calendar"
import { Routes, Route } from "react-router-dom"
import { Database } from "DatabaseContext"
import { Layout } from "Components/Layout"
import { NewTask } from "Components/NewTask/NewTask"
import { ConfirmationTasks } from "Components/ConfirmationTasks/ConfirmationTasks"
import { Authorization } from "Components/Authorization/Authorization"
import Tasks from "Components/Tasks/Tasks"
import { PopUpTask } from "Components/Calendar/PopUpTask/PopUpTask"
import { useSelector } from "react-redux"

export const App = () => {
	const [isLogged, setLogged] = useState(false)
	const [database, setDatabase] = useState(null)
	const popUpTaskState = state => state.popUpTaskState
	const { popUpTaskActive, activeTask } = useSelector(popUpTaskState)

	//Проверка событий и изменение статуса на 'overdue', если они истекли

	return (
		<div className="wrapper">
			<Database.Provider value={{ database, setDatabase }}>
				{isLogged ? (
					<Routes>
						<Route path="/" element={<Layout setLogged={setLogged} />}>
							<Route index element={<Calendar />} />
							<Route path="new-task" element={<NewTask />} />
							<Route
								path="confirmation-tasks"
								element={<ConfirmationTasks />}
							/>
							<Route path="tasks" element={<Tasks />} />
						</Route>
					</Routes>
				) : (
					<Authorization setLogged={setLogged} setDatabase={setDatabase} />
				)}
			</Database.Provider>
			{popUpTaskActive && <PopUpTask task={activeTask} />}
		</div>
	)
}
