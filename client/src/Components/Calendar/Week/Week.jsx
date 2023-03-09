import { Task } from "Components/Calendar/Task/Task"
import { WEEK_DAYS } from "API/WEEK_DAYS_API"
import { TIME_LAPSE } from "API/TIME_LAPSE_API"
import { converterTimeInterval } from "hooks/converterTimeInterval"
import { useEffect, useState } from "react"
import Axios from "axios"
import { dateFormat } from "hooks/date"

export const Week = ({ selectedDate }) => {
	const [weekTasks, setWeekTasks] = useState([])
	const WEEK_TITLE = [
		{
			id: "0",
			title: "",
		},
		...WEEK_DAYS,
	]
	const { datesWeek } = converterTimeInterval(selectedDate, 7)
	useEffect(() => {
		Axios.post("/week-tasks", {
			startWeek: datesWeek[1],
			endWeek: datesWeek[datesWeek.length - 1],
		})
			.then(res => setWeekTasks(res.data))
			.catch(err => console.log(err))
	}, [])
	console.log(datesWeek[1], datesWeek[datesWeek.length - 1])
	return (
		<section className="week-table">
			<div className="week-table__inner">
				{WEEK_TITLE.map(title => (
					<div
						className="week-table__day"
						data-date={datesWeek[title.id]}
						key={title.id}
					>
						<h3 className="week-table__day_title">{title.title}</h3>
						<ul className="week-table__day__list-time">
							{TIME_LAPSE.map(time => (
								<li
									className={
										title.id === "0"
											? "week-table__day__list-time__time"
											: "week-table__day__list-time__item"
									}
									key={time.id}
								>
									{title.id === "0" ? (
										<span className="week-table__day__list-time__time_span">
											{time.timeValue}
										</span>
									) : (
										<div className="week-table__day__list-time__item__content">
											{weekTasks.map(task => {
												const contentDiv = []
												if (
													task.date_start === datesWeek[title.id] &&
													task.time_start === time.timeValue
												) {
													contentDiv.push(
														<Task
															task={task}
															table={"week-table__day"}
															key={time.id + task.id}
														/>
													)
												}
												return contentDiv
											})}
										</div>
									)}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	)
}
