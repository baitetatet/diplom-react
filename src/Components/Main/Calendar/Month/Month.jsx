export const Month = ({ WEEK_DAYS, year, currentMonth, getDay, table }) => {
  const current = new Date(year, currentMonth)
  const next = new Date(year, currentMonth + 1)
  let dayMonth = 1 - (current.getDay() + 6) % 7

  const getDaysOfMonth = (next, current) => {
    return (next - current) / (1000 * 3600 * 24)
  }
  const prevMonthDays = getDaysOfMonth(current, new Date(year, currentMonth - 1))
  const currentMonthDays = getDaysOfMonth(next, current)

  const daysList = []
  for (let day = dayMonth; day < 7 * Math.ceil(currentMonthDays / 7) + dayMonth; day++) {
    daysList.push(
      day > 0 && day <= currentMonthDays ?
        <div
          className={table + "-table__body__item"}
          key={day}
          data-date={day + '.' + currentMonth + '.' + year}
          onClick={(event) => getDay(event)}
        >
          <span className={table + "-table__body__item_span"}>
            {day}
          </span>
        </div>
        :
        (day < currentMonthDays ?
          <div
            className={table + "-table__body__item"}
            key={day}
            data-date={(prevMonthDays + day) + '.' + (currentMonth + 1) + '.' + year}
            onClick={(event) => getDay(event)}
          >
            <span className={table + "-table__body__item_span prev-month"}>
              {prevMonthDays + day}
            </span>
          </div>
          :
          <div
            className={table + "-table__body__item"}
            key={day}
            data-date={(day - currentMonthDays) + '.' + (currentMonth + 1) + '.' + year}
            onClick={(event) => getDay(event)}
          >
            <span className={table + "-table__body__item_span prev-month"}>
              {day - currentMonthDays}
            </span>
          </div>)
    )
  }
  return (
    <section className={table + "-table"}>
      <div className={table + "-table__inner"}>
        <div className={table + "-table__header"}>
          {
            WEEK_DAYS.map(day =>
              <h3
                className={table + "-table__header_title"}
                key={day.id}
              >
                {day.title}
              </h3>
            )
          }
        </div>
        <div className={table + "-table__body"}>
          {daysList}
        </div>
      </div>
    </section>
  )
}