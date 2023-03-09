import { WEEK_DAYS } from "API/WEEK_DAYS_API"
import { dateFormat } from "hooks/date"

export const Month = ({ selectedDate, month, getDayTable, table }) => {
	const currentYear = selectedDate.getFullYear()
	const currentMonth = month
	const dayMonth = 1 - ((selectedDate.getDay() + 6) % 7)
	const dateForBuildingTable = new Date(currentYear, currentMonth, dayMonth)
	const daysList = []

	for (let i = 0, cellTable = 7 * 6; i < cellTable; i++) {
		dateForBuildingTable.setDate(dateForBuildingTable.getDate() + 1)
		const dataDateDay = dateForBuildingTable.getDate()
		const dataDateMonth = dateForBuildingTable.getMonth() + 1
		const dataDateYear = dateForBuildingTable.getFullYear()

		daysList.push(
			<div
				className="month-table__body__item"
				key={i}
				data-date={dateFormat(dateForBuildingTable)}
				onClick={event => getDayTable(event)}
			>
				<span
					className={`month-table__body__item_span${
						currentMonth + 1 !== dataDateMonth ? " another-month" : ""
					}`}
				>
					{dataDateDay}
				</span>
			</div>
		)
	}

	return (
		<section className="month-table" key={currentMonth}>
			<div className="month-table__inner">
				<div className="month-table__header">
					{WEEK_DAYS.map(day => (
						<h3 className="month-table__header_title" key={day.id}>
							{table === "month" ? day.title : day.shortTitle}
						</h3>
					))}
				</div>
				<div className="month-table__body">{daysList}</div>
			</div>
		</section>
	)
}
