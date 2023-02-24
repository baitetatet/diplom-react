export const PopUpTaskContent = ({ CONTENT }) => {
  const VARIABLES = {
    title: 'Включает:',
    postFile: 'Прикрепить файл',
    confirmTask: 'Выполнить'
  }
  const handlerClickPostFile = (event) => {
    const inputPostFile = event.target.previousSibling
    inputPostFile.click()
  }

  return (
    <article className="calendar__task__description__category__content category__content">
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
                <div className="category__content_post-file">
                  <input
                    className="category__content__post-file_input"
                    type="file" />
                  <button
                    className="category__content__post-file_button button"
                    onClick={(event) => handlerClickPostFile(event)}
                  >
                    {VARIABLES.postFile}
                  </button>
                </div>
                <button className="category__content_confirm-task button">
                  {VARIABLES.confirmTask}
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </article>
  )
}