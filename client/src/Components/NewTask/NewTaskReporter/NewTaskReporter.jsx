import { useEffect, useState } from "react"
import Axios from "axios"

export const NewTaskReporter = () => {
	const [reported, setReported] = useState([])
	const VARIABLES = {
		title: "Кто готов.: ",
	}
	useEffect(() => {
		Axios.get("/get_involved").then(res => setReported(res.data))
	}, [])

	return (
		<div className="new-task__reporter">
			<label htmlFor="reporter">
				<h3 className="new-task__reporter_title">{VARIABLES.title}</h3>
				<select
					className="new-task__involved_select"
					name="reporter"
					id="reporter"
				>
					{reported.map(user => (
						<option value={user.post} key={user.id + user.post}>
							{user.post}
						</option>
					))}
				</select>
			</label>
		</div>
	)
}
