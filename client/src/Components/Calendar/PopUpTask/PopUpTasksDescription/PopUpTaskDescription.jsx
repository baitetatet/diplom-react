import { PopUpTaskContent } from "../PopUpTaskContent/PopUpTaskContent"
import { PopUpTaskDescriptionCategory } from "./PopUpTaskDescriptionCategory"

export const PopUpTaskDescription = ({task}) => {
  const CATEGORY = ['director', 'attracted', 'time', 'place', 'report', 'content']

  return (
    <div className="calendar__task__description">
      {CATEGORY.map(category =>
      (
        category === 'content' ?
          <PopUpTaskContent task={task} key={category} />
          : <PopUpTaskDescriptionCategory category={category} key={category} />
      )
      )}
    </div>
  )
}