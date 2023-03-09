import Axios from "axios"
import { useEffect, useState, useContext } from "react"
import { UserData } from "UserDataContext"

export const NewTaskInvolved = () => {
	const { userData } = useContext(UserData)
	const [involved, setInvolved] = useState([userData])
	const VARIABLES = {
		title: "Кто привлекается: ",
	}

	useEffect(() => {
		Axios.get("/get_involved").then(res =>
			setInvolved(state => [...state, ...res.data])
		)
	}, [])

	return (
		<div className="new-task__involved">
			<label htmlFor="involved">
				<h3 className="new-task__involved_title">{VARIABLES.title}</h3>
				<select
					className="new-task__involved_select"
					name="involved"
					id="involved"
					multiple
				>
					{involved.map(user => (
						<option value={user.post} key={user.post}>
							{user.post}
						</option>
					))}
				</select>
			</label>
		</div>
	)
}
