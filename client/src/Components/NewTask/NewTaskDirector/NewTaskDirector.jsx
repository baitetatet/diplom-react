import Axios from "axios"
import { useEffect, useState } from "react"

export const NewTaskDirector = () => {
	const [directors, setDirectors] = useState(["Нет вариантов"])
	const VARIABLES = {
		title: "Руководитель:",
	}
	useEffect(() => {
		Axios.get("/get_directors").then(res => {
			console.log(res.data)
			setDirectors(res.data)
		})
	}, [])

	return (
		<div className="new-task__director">
			<label htmlFor="director">
				<h3 className="new-task__director_title">{VARIABLES.title}</h3>
				<select
					className="new-task__director_select"
					name="director"
					id="director"
				>
					{directors.map(director => (
						<option value={director.post} key={director.id + director.post}>
							{director.post}
						</option>
					))}
				</select>
			</label>
		</div>
	)
}
