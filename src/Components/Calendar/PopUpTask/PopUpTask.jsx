import { PopUpTaskDescription } from './PopUpTasksDescription/PopUpTaskDescription'

export const PopUpTask = ({ task }) => {

  return (
    <section className="calendar__task calendar__popup active">
      <div className="calendar__task__inner calendar__popup__inner">
        <div className="calendar__task__close calendar__popup__header__close" />
        <h3 className="calendar__task__title">
          Подготовка и представление обобщенного отчета о проведении всех видов  стажировок (практик), с приложением отчетных документов
          {task.innerHTML}
        </h3>
        <PopUpTaskDescription />

      </div>
    </section>
  )
}