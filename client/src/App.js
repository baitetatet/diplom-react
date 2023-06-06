import { useEffect, useState } from "react"
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
import Axios from "axios"
import { Loader } from "Components/Loader/Loader"

export const App = () => {
	const [isLogged, setLogged] = useState(false)
	const [isLoading, setLoading] = useState(true)
	const [userData, setUserData] = useState(null)
	const popUpTaskState = state => state.popUpTaskState
	const { popUpTaskActive } = useSelector(popUpTaskState)

	useEffect(() => {
		Axios.get("/check-logged")
			.then(res => {
				if (res.data === false) {
					setLoading(false)
					setLogged(false)
				} else {
					setUserData(...res.data)
					setLogged(true)
				}
				setLoading(false)
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<div className="wrapper">
			<UserData.Provider value={{ userData, setUserData }}>
				{isLoading && <Loader />}
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
			{popUpTaskActive && <PopUpTask />}
		</div>
	)
}
