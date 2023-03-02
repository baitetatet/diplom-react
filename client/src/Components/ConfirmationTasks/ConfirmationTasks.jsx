import { ConfirmationTask } from "Components/ConfirmationTasks/ConfirmationTask/ConfirmationTask"

export const ConfirmationTasks = () => {
  const VARIABLES = {
    componentTitle: 'Задачи на подтверждение'
  }

  return (
    <section className="confirmation-tasks">
      <div className="confirmation-tasks__inner">
        <div className="confirmation-tasks__header">
          <h2 className="confirmation-tasks__header_title">
            {VARIABLES.componentTitle}
          </h2>
        </div>
        <div className="confirmation-tasks__content">
          <ConfirmationTask />
          <ConfirmationTask />
          <ConfirmationTask />
          <ConfirmationTask />
          <ConfirmationTask />
          <ConfirmationTask />
          <ConfirmationTask />
          <ConfirmationTask />
          <ConfirmationTask />

          <ConfirmationTask />
        </div>
      </div>
    </section>
  )
}