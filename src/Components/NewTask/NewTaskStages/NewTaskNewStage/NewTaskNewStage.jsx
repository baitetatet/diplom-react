import { useState } from "react"

export const NewTaskNewStage = ({ setCreatingStage, stages, setStages }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [newTaskDescription, setNewTaskDescription] = useState('')

  const VARIABLES = {
    descriptionTitle: 'Описание:',
    startDateTitle: 'Начало:',
    endDateTitle: 'Окончание:',
    cancelButton: 'Отменить',
    addButton: 'Добавить'
  }

  const handlerChangeInputs = (event, setState) => {
    const inputDate = new Date(event.target.value)
    setState(inputDate)
  }

  // [inputDate.getDate(), inputDate.getMonth() + 1, inputDate.getFullYear()].join('.')
  const handlerChangeDescription = (event) => {
    setNewTaskDescription(event.target.value)
  }

  const handlerCancelButton = () => {
    setCreatingStage(false)
  }

  const handlerAddButton = () => {
    setStages([
      ...stages,
      {
        description: newTaskDescription,
        startDate: startDate,
        endDate: endDate
      }
    ])
    setCreatingStage(false)
  }


  return (
    <div className="new-task__stages__new-stage">
      <div className="new-task__stages__new-stage__inner">
        <div className="new-task__stages__new-stage__description">
          <h3 className="new-task__stages__new-stage__description_title">
            {VARIABLES.descriptionTitle}
          </h3>
          <textarea
            className="new-task__stages__new-stage__description_textarea"
            onChange={(event) => handlerChangeDescription(event)}
          ></textarea>
        </div>
        <div className="new-task__stages__new-stage__start-date">
          <h3 className="new-task__stages__new-stage__start-date_title">
            {VARIABLES.startDateTitle}
          </h3>
          <input
            className="new-task__stages__new-stage__start-date_input"
            type="date"
            onChange={(event) => handlerChangeInputs(event, setStartDate)}
          />
        </div>
        <div className="new-task__stages__new-stage__end-date">
          <h3 className="new-task__stages__new-stage__end-date_title">
            {VARIABLES.endDateTitle}
          </h3>
          <input
            className="new-task__stages__new-stage__end-date_input"
            type="date"
            onChange={(event) => handlerChangeInputs(event, setEndDate)}
          />
        </div>
      </div>
      <div className="new-task__stages__new-stage__buttons">
        <div
          className="new-task__stages__buttons_cancel button-red"
          onClick={handlerCancelButton}
        >
          {VARIABLES.cancelButton}
        </div>
        <div
          className="new-task__stages__buttons_add button-green"
          onClick={() => handlerAddButton()}
        >
          {VARIABLES.addButton}
        </div>
      </div>
    </div >
  )
}