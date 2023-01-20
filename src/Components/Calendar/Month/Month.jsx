import { WEEK_DAYS } from "../../../API/WEEK_DAYS_API"

export const Month = ({ selectedDate, getDayTable, table }) => {

  const currentYear = selectedDate.getFullYear()
  const currentMonth = selectedDate.getMonth()
  const dayMonth = 1 - (selectedDate.getDay() + 6) % 7
  const dateForBuldingTable = new Date(currentYear, currentMonth, dayMonth)
  const daysList = []

  function checkAndChangeDateFormat(date) {
    return date < 10 ? '0' + date : date
  }

  for (let i = 0, cellTable = 7 * 6; i < cellTable; i++) {
    dateForBuldingTable.setDate(dateForBuldingTable.getDate() + 1)
    const dataDateDay = dateForBuldingTable.getDate()
    const dataDateMonth = dateForBuldingTable.getMonth() + 1
    const dataDateYear = dateForBuldingTable.getFullYear()

    daysList.push(
      <div
        className="month-table__body__item"
        key={i}
        data-date={[checkAndChangeDateFormat(dataDateDay), checkAndChangeDateFormat(dataDateMonth), dataDateYear].join('.')}
        onClick={(event) => getDayTable(event)}
      >
        <span className={`month-table__body__item_span${currentMonth + 1 !== dataDateMonth ? ' another-month' : ''}`}>
          {dataDateDay}
        </span>
      </div>
    )
  }

  return (
    <section
      className="month-table"
      key={currentMonth}
    >
      <div className="month-table__inner">
        <div className="month-table__header">
          {
            WEEK_DAYS.map(day =>
              <h3
                className="month-table__header_title"
                key={day.id}
              >
                {
                  table === 'month' ? day.title : day.shortTitle
                }
              </h3>
            )
          }
        </div>
        <div className="month-table__body">
          {daysList}
        </div>
      </div>
    </section>
  )
}