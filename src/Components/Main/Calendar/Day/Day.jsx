import { useContext } from "react"
import { Database } from "../../../../DatabaseContext"
import { Task } from "../Task/Task"

export const Day = ({ TIME, selectedDate }) => {

  const { database } = useContext(Database)
  const currentDate = [selectedDate.getDate(), selectedDate.getMonth() + 1, selectedDate.getFullYear()].join('.')
  console.log(database)
  return (
    <section className="day-table" data-date={currentDate}>
      <div className="day-table__inner">
        <ul className="day-table__list-time">
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
                            type={taskOfThisTime.type}
                          />
                        )
                        )
                      }
                      console.log('contentDiv: ', contentDiv)
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