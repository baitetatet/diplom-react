import { useState } from "react"
import { Calendar } from "Components/Calendar/Calendar"
import { Routes, Route } from "react-router-dom"
import { UserData } from "UserDataContext"
import { Layout } from "Components/Layout"
import { NewTask } from "Components/NewTask/NewTask"
import { ConfirmationTasks } from "Components/ConfirmationTasks/ConfirmationTasks"
import { Authorization } from "Components/Authorization/Authorization"
import Tasks from "Components/Tasks/Tasks"
import { PopUpTask } from "Components/Calendar/PopUpTask/PopUpTask"
import { useSelector } from "react-redux"

export const App = () => {
	const [isLogged, setLogged] = useState(false)
	const [userData, setUserData] = useState(null)
	const popUpTaskState = state => state.popUpTaskState
	const { popUpTaskActive, activeTask } = useSelector(popUpTaskState)
	console.log(userData)

	//Проверка событий и изменение статуса на 'overdue', если они истекли

	return (
		<div className="wrapper">
			<UserData.Provider value={{ userData, setUserData }}>
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
					<Authorization setLogged={setLogged} setUserData={setUserData} />
				)}
			</UserData.Provider>
			{popUpTaskActive && <PopUpTask task={activeTask} />}
		</div>
	)
}
