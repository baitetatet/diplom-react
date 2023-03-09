// import { useContext } from "react"
// import { UserData } from "UserDataContext"
import { Task } from "Components/Calendar/Task/Task"
import { TIME_LAPSE } from "API/TIME_LAPSE_API"
import { dateFormat } from "hooks/date"
import { useEffect, useState } from "react"
import Axios from "axios"

export const Day = ({ selectedDate }) => {
	// const { userData } = useContext(UserData)
	const currentDate = dateFormat(selectedDate)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		Axios.post("/day-tasks", { currentDate: currentDate })
			.then(res => setTasks(res.data))
			.catch(err => console.log(err))
	}, [currentDate])
	console.log(tasks)
	return (
		<section className="day-table" data-date={currentDate}>
			<div className="day-table__inner">
				<ul className="day-table__list-time">
					{TIME_LAPSE.map(time => (
						<li className="day-table__list-time__item" key={time.id}>
							<span className="day-table__list-time__item_time">
								{time.timeValue}
							</span>
							<div className="day-table__list-time__item__content">
								{tasks.map(task => {
									const contentDiv = []
									if (
										task.date_start === currentDate &&
										task.time_start === time.timeValue
									) {
										contentDiv.push(
											<Task
												task={task}
												table={"day-table"}
												key={task.description + task.date_start}
											/>
										)
									}
									return contentDiv
								})}
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
