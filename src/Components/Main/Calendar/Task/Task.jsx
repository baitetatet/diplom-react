export const Task = ({ content, type }) => {
  console.log('CONTENT: ', content)
  console.log('TYPE: ', type)
  return (
    <div
      className={'day-table__list-time__item__content_task ' + type}
      key={content}
    >
      {content}
    </div>
  )
}