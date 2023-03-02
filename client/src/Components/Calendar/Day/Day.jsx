import { useContext, useEffect } from "react"
import { Database } from "DatabaseContext"
import { Task } from "Components/Calendar/Task/Task"
import { TIME_LAPSE } from "API/TIME_LAPSE_API"
import { checkAndChangeDateFormat } from "hooks/checkAndChangeDateFormat"
import axios from "axios"

export const Day = ({ selectedDate }) => {
	const { database } = useContext(Database)
	const currentDate = [
		checkAndChangeDateFormat(selectedDate.getDate()),
		checkAndChangeDateFormat(selectedDate.getMonth() + 1),
		selectedDate.getFullYear(),
	].join(".")

	useEffect(() => {
		axios
			.get("http://localhost:8000/db")
			.then(response => console.log(response))
	}, [])

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
								{database.tasks.map(task => {
									const contentDiv = []
									if (
										task.date.start === currentDate &&
										task.time.start === time.timeValue
									) {
										contentDiv.push(
											<Task
												task={task}
												table={"day-table"}
												key={task.description + task.date.start}
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
