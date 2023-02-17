import { NewTaskDirector } from "./NewTaskDirector/NewTaskDirector";
import { NewTaskDescription } from "./NewTaskDescription/NewTaskDescription";
import { NewTaskInvolved } from "./NewTaskInvolved/NewTaskInvolved";
import { NewTaskReporter } from "./NewTaskReporter/NewTaskReporter";
import { NewTaskTime } from "./NewTaskTime/NewTaskTime";
import { NewTaskStages } from "./NewTaskStages/NewTaskStages";

export const NewTask = () => {
  const VARIABLES = {
    title: 'Новая задача',
    placeTitle: 'Место:',
    timeTitle: 'Время:'
  }

  return (
    <section className="new-task">
      <div className="new-task__inner">
        <div className="new-task__header">
          <h2 className="new-task__header_title">
            {VARIABLES.title}
          </h2>
        </div>
        <form className="new-task__form">
          <div className="new-task__content">
            <NewTaskDescription />
            <NewTaskDirector />
            <NewTaskTime />
            <NewTaskInvolved />
            <NewTaskReporter />
            <NewTaskStages />
          </div>
          <div className="new-task__buttons">
            <input className='new-task__buttons_reset button-red' type="reset" />
            <input className='new-task__buttons_submit button-green' type="submit" />
          </div>
        </form>

      </div>
    </section>
  );
}

