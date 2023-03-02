export const PopUpTaskDescriptionCategory = ({ category }) => {
  const CATEGORY_PATTERN = {
    'director': {
      title: 'Руководитель:',
      content: 'ЗНА по УНР'
    },
    'attracted': {
      title: 'Кто привлекается:',
      content: 'НФ, НК, СПНУМО'
    },
    'time': {
      title: 'Время:',
      content: '10.00-17.00'
    },
    'place': {
      title: 'Место:',
      content: 'Комн. А-320'
    },
    'report': {
      title: 'Кто готов.:',
      content: 'НУМО'
    }
  }

  return (
    <div className={`calendar__task__description__${category}`}>
      <h3 className={`calendar__task__description__${category}_title`}>
        {CATEGORY_PATTERN[category].title}
      </h3>
      <p className={`calendar__task__description__${category}_content`}>
        {CATEGORY_PATTERN[category].content}
      </p>
    </div>
  )
}