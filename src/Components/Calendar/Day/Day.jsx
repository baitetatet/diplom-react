import { useContext } from "react"
import { Database } from "DatabaseContext"
import { Task } from "Components/Calendar/Task/Task"
import { TIME_LAPSE } from "API/TIME_LAPSE_API"
import { checkAndChangeDateFormat } from "hooks/checkAndChangeDateFormat"

export const Day = ({ selectedDate, handlerClickOnDay }) => {

  const { database } = useContext(Database)
  const currentDate = [checkAndChangeDateFormat(selectedDate.getDate()), checkAndChangeDateFormat(selectedDate.getMonth() + 1), selectedDate.getFullYear()].join('.')

  return (
    <section className="day-table" data-date={currentDate}>
      <div className="day-table__inner">
        <ul
          className="day-table__list-time"
          onClick={handlerClickOnDay}
        >
          {
            TIME_LAPSE.map(time =>
              <li
                className="day-table__list-time__item"
                key={time.id}
              >
                <span
                  className="day-table__list-time__item_time"
                >
                  {time.timeValue}
                </span>
                <div className="day-table__list-time__item__content">
                  {
                    database.tasks.map(task => {
                      const contentDiv = []
                      if (task.date.start === currentDate && task.time.start === time.timeValue) {
                        contentDiv.push(
                          <Task
                            content={task.description}
                            table={'day-table'}
                            type={task.type}
                            date={currentDate}
                            time={time.timeValue}
                            key={task.description + task.date.start}
                          />
                        )
                      }
                      return contentDiv
                    })
                  }
                </div>
              </li>
            )
          }
        </ul>
      </div>
    </section>
  )
}