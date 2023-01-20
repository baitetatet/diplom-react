import { useContext } from "react"
import { Database } from "../../../DatabaseContext"
import { Task } from "../Task/Task"
import { WEEK_DAYS } from "../../../API/WEEK_DAYS_API"
import { TIME_LAPSE } from "../../../API/TIME_LAPSE_API"

export const Week = ({ datesWeek, handlerClickOnDay }) => {
  const { database } = useContext(Database)
  const WEEK_TITLE = [
    {
      id: '0',
      title: ''
    },
    ...WEEK_DAYS
  ]
  return (
    <section className="week-table">
      <div className="week-table__inner">
        {
          WEEK_TITLE.map(title =>
            <div
              className="week-table__day"
              data-date={datesWeek[title.id]}
              key={title.id}
            >
              <h3 className="week-table__day_title">
                {title.title}
              </h3>
              <ul
                className="week-table__day__list-time"
                onClick={handlerClickOnDay}
              >
                {
                  TIME_LAPSE.map(time =>
                    <li
                      className={title.id === '0' ? "week-table__day__list-time__time" : "week-table__day__list-time__item"}
                      key={time.id}
                    >
                      {
                        title.id === '0' ?
                          <span className="week-table__day__list-time__time_span">
                            {time.timeValue}
                          </span>
                          :
                          <div className="week-table__day__list-time__item__content">
                            {
                              database.tasks.map(task => {
                                const contentDiv = []
                                if (task.date === datesWeek[title.id] && task.startTime === time.timeValue) {
                                  contentDiv.push(task.taskOfThisTime.map(taskOfThisTime =>
                                    <Task
                                      content={taskOfThisTime.content}
                                      table={'week-table__day'}
                                      type={taskOfThisTime.type}
                                      date={datesWeek[title.id]}
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
                      }
                    </li>


                  )
                }
              </ul>
            </div>
          )
        }
      </div>
    </section>
  )
}