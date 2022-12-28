export const Task = ({ content, table, type, date, time }) => {

  return (
    <div
      className={table + '__list-time__item__content_task ' + type}
      data-date={date}
      data-time={time}
      key={content}
    >
      {content}
    </div>
  )
}