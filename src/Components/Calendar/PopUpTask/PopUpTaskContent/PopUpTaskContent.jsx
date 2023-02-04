export const PopUpTaskContent = ({ CONTENT }) => {
  const VARIABLES = {
    title: 'Содержание:',
    postFile: 'Прикрепить файл',
    confirmTask: 'Выполнить'
  }
  return (
    <atticle className="calendar__task__description__category__content category__content">
      <h3 className="category__content_title">
        {VARIABLES.title}
      </h3>
      <div className="category__content_list">
        {
          CONTENT.map(item => (
            <div className="category__content_item" key={item.text}>
              <div className="category__content_time">
                {item.timeStart}
              </div>
              <p className="category__content_text">
                {item.text}
              </p>
              <div className="category__content__buttons">
                <button className="category__content_post-file button">
                  {VARIABLES.postFile}
                </button>
                <button className="category__content_confirm-task button">
                  {VARIABLES.confirmTask}
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </atticle>
  )
}