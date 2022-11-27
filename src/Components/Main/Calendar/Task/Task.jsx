export const Task = ({ content, type }) => {

  return (
    <div
      className={'day-table__list-time__item__content_task ' + type}
      key={content}
    >
      {content}
    </div>
  )
}