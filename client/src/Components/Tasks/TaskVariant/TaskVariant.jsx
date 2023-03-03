import { useState } from "react"
import { Task } from "Components/Calendar/Task/Task"

const TaskVariant = ({tasksType, tasks}) => {
  const [active, setActive] = useState(false)
  const handlerClickTaskVariant = (event) => {
    if(event.target.classList.value.includes('task-variant__header') || event.target.nodeName === 'SPAN') setActive(prev => !prev)
  }

  return ( 
    <article 
    className={`tasks__task-variant${active ? ' active' : ''}`}
    onClick={(event) => handlerClickTaskVariant(event)}
    >
      <div className="tasks__task-variant__inner">
        <div className="tasks__task-variant__header">
          <h3 className="tasks__task-variant__header_title">
            {tasksType.title}
          </h3>
          <span className="tasks__header_arrow arrow">
            <span/>
            <span/>
          </span>
        </div>
        <div className="tasks__task-variant__content">
          {
            tasks.map(task => 
              <Task 
              table={'tasks'} 
              task={task}
              key={task.id}
              />
            )
          }
        </div>
      </div>
    </article>
   );
}
 
export default TaskVariant;