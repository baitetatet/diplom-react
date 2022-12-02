import { useContext } from "react"
import { Database } from "../../../../DatabaseContext"
import { Task } from "../Task/Task"

export const Week = ({ WEEK_DAYS, TIME, datesWeek }) => {
  const { database } = useContext(Database)
  console.log(datesWeek)
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
              <ul className="week-table__day__list-time">
                {
                  TIME.map(time =>
                    <li
                      className="week-table__day__list-time__item"
                      key={time.id}
                    >
                      {
                        title.id === '0' ?
                          <span className="week-table__day__list-time__item_time">
                            {time.timeValue}
                          </span>
                          :
                          <div className="week-table__day__list-time__item__content">

                            {
                              database.tasks.map(task => {
                                const contentDiv = []
                                if (task.data === datesWeek[title.id] && task.startTime === time.timeValue) {
                                  contentDiv.push(task.taskOfThisTime.map(taskOfThisTime =>
                                    <Task
                                      content={taskOfThisTime.content}
                                      table={'week-table__day'}
                                      type={taskOfThisTime.type}
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