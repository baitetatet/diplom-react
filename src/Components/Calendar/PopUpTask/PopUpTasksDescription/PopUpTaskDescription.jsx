import { PopUpTaskContent } from "../PopUpTaskContent/PopUpTaskContent"
import { PopUpTaskDescriptionCategory } from "./PopUpTaskDescriptionCategory"

export const PopUpTaskDescription = () => {
  const CATEGORY = ['director', 'attracted', 'time', 'place', 'report', 'content']
  const CONTENT = [
    {
      timeStart: '11.04.2023',
      timeEnd: '15.04.2023',
      text: 'Сбор и обобщение материалов'
    },
    {
      timeStart: '18.04.2023',
      timeEnd: '21.04.2023',
      text: 'Формирование отчета'
    },
    {
      timeStart: '22.04.2023',
      timeEnd: '22.04.2023',
      text: 'Доклад в ОВО РВСН'
    },
  ]

  return (
    <div className="calendar__task__description">
      {CATEGORY.map(category =>
      (
        category === 'content' ?
          <PopUpTaskContent CONTENT={CONTENT} key={category} />
          : <PopUpTaskDescriptionCategory category={category} key={category} />
      )
      )}
    </div>
  )
}