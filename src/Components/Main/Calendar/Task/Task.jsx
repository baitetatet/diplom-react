export const Task = ({ content, table, type }) => {

  return (
    <div
      className={table + '__list-time__item__content_task ' + type}
      key={content}
    >
      {content}
    </div>
  )
}