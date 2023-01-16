import { Month } from "../Month/Month"
import { MONTHS } from "../../../API/monthsAPI"
export const Year = ({ WEEK_DAYS, year, currentMonth, getDay, table }) => {

  return (
    <section className="year-table">
      <div className="year-table__inner">
        {
          MONTHS.map((month, numMonth) =>
            <div
              className="year-table__month"
              key={numMonth}
            >
              <h3 className="year-table__month__title">
                {month}
              </h3>
              <Month
                year={year}
                WEEK_DAYS={WEEK_DAYS}
                currentMonth={numMonth}
                getDay={getDay}
                table={table}
              >
                {month}
              </Month>
            </div>
          )
        }
      </div>
    </section>
  )
}