// import { useContext } from "react"
// import { Database } from "../../../DatabaseContext"

export const PopUpTasks = ({ content, setPopUpTasksActive, date }) => {
  // const { database } = useContext(Database)
  const VARIABLES = {
    title: `Задачи на ${date} г.`,
    btn: 'Выполнить'
  }
  const handlerClickPopUp = (e) => {
    if (e.target.classList.value.includes('active') || e.target.classList.value.includes('close')) {
      setPopUpTasksActive(false)
    }
  }

  const handlerTaskConfirm = (task) => {

    console.log('task: ', task)
  }

  return (
    <div
      className="calendar__popup active"
      onClick={handlerClickPopUp}
    >
      <div className="calendar__popup__inner">
        <div className="calendar__popup__header">

          <h3 className="calendar__popup__header__title">
            {VARIABLES.title}
          </h3>
          <div className="calendar__popup__header__close">
          </div>
        </div>
        <ul className="calendar__popup__list">
          {
            [...content].map(task =>

              <li
                className={task.classList[1] ?
                  `calendar__popup__list__item ${task.classList[1]}`
                  : 'calendar__popup__list__item'}
                key={task.offsetTop}
              >
                <div className="calendar__popup__list__item_task">
                  {task.innerHTML}
                </div>
                <button
                  className="calendar__popup__list__item_btn-confirm button"
                  onClick={() => handlerTaskConfirm(task)}
                >
                  {VARIABLES.btn}
                </button>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}
