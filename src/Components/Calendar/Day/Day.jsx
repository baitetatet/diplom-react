import { useContext } from "react"
import { Database } from "../../../DatabaseContext"
import { Task } from "../Task/Task"
import { TIME_LAPSE } from "../../../API/TIME_LAPSE_API"

export const Day = ({ selectedDate, handlerClickOnDay }) => {

  const { database } = useContext(Database)
  const currentDate = [checkAndChangeDateFormat(selectedDate.getDate()), checkAndChangeDateFormat(selectedDate.getMonth() + 1), selectedDate.getFullYear()].join('.')
  // console.log(selectedDate.getMonth() + 1)
  function checkAndChangeDateFormat(date) {
    return date < 10 ? '0' + date : date
  }
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
                      if (task.date === currentDate && task.startTime === time.timeValue) {
                        contentDiv.push(task.taskOfThisTime.map(taskOfThisTime =>
                          <Task
                            content={taskOfThisTime.content}
                            table={'day-table'}
                            type={taskOfThisTime.type}
                            date={currentDate}
                            time={time.timeValue}
                            key={time.id + taskOfThisTime.id}
                          />
                        )
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