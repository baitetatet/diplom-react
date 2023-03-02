import { converterTimeInterval } from "hooks/converterTimeInterval"

export const NewTaskStage = ({ dates, stages, setStages }) => {
  const VARIABLES = {
    deleteButton: 'Удалить'
  }
  const { startDate, endDate, description } = dates

  const dayBetweenDates = (startDate, endDate) => {
    const oneDay = 1000 * 60 * 60 * 24
    return Math.round((endDate - startDate) / oneDay)
  }

  const handlerDeleteClick = (event) => {
    console.log(stages)
    const deletingTaskDescription = event.target.previousElementSibling.innerHTML
    const newStages = stages.filter(stage => stage.description !== deletingTaskDescription)
    setStages(newStages)
  }

  return (
    <div className="new-task__stages__stage">
      <div className="new-task__stages__stage__inner">
        <div className="new-task__stages__stage_date-interval">
          {
            converterTimeInterval(startDate, dayBetweenDates(startDate, endDate)).weekInterval
          }
        </div>
        <div className="new-task__stages__stage_description">
          {
            description
          }
        </div>
        <div
          className="new-task__stages__stage_delete-button button-red"
          onClick={(event) => handlerDeleteClick(event)}
        >
          {
            VARIABLES.deleteButton
          }
        </div>
      </div>
    </div>
  )
}