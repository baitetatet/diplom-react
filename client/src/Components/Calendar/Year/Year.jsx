import { Month } from "Components/Calendar/Month/Month"
import { MONTHS } from "API/monthsAPI"

export const Year = ({ selectedDate, getDayTable, table }) => {

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
                selectedDate={selectedDate}
                month={numMonth}
                getDayTable={getDayTable}
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