import { useState } from "react"
import { NewTaskNewStage } from "./NewTaskNewStage/NewTaskNewStage"
import { NewTaskStage } from "./NewTaskStage/NewTaskStage"

export const NewTaskStages = () => {
  const VARIABLES = {
    title: 'Этапы: ',
    addStage: 'Добавить этап'
  }

  const [creatingStage, setCreatingStage] = useState(false)
  const [stages, setStages] = useState([])

  return (
    <div className="new-task__stages">
      <h3 className="new-task__stages_title">
        {VARIABLES.title}
      </h3>
      <div className="new-task__stages__content">
        {
          stages.length !== 0 ? stages.map(stage => (
            <NewTaskStage
              key={stage.description}
              dates={stage}
              stages={stages}
              setStages={setStages}
            />)) : <></>
        }
        {
          creatingStage ?
            <NewTaskNewStage
              setCreatingStage={setCreatingStage}
              stages={stages}
              setStages={setStages}
            />
            :
            <div
              className="new-task__stages__add"
              onClick={() => setCreatingStage(prev => !prev)}
            >
              {VARIABLES.addStage}
            </div>
        }
      </div>
    </div>
  )
}