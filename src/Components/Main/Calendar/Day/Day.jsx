import { useContext } from "react"
import { Database } from "../../../../DatabaseContext"
import { Task } from "../Task/Task"

export const Day = ({ TIME, selectedDate, handlerClickOnDay }) => {

  const { database } = useContext(Database)
  const currentDate = [selectedDate.getDate(), selectedDate.getMonth() + 1, selectedDate.getFullYear()].join('.')

  return (
    <section className="day-table" data-date={currentDate}>
      <div className="day-table__inner">
        <ul
          className="day-table__list-time"
          onClick={handlerClickOnDay}
        >
          {
            TIME.map(time =>
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
                      if (task.data === currentDate && task.startTime === time.timeValue) {
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