import avatarSRC from 'images/avatar.png'

export const ConfirmationTask = () => {
  const VARIABLES = {
    avatarSRC: avatarSRC,
    userName: 'п-к Петров А.',
    timeComplete: 'Сегодня в 11:38',
    downLoadButton: 'Скачать файл',
    confirmButton: 'Подтвердить',
    contentTask: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ad repudiandae, aut, accusantium perferendis quod autem laudantium natus, illum tenetur placeat unde porro explicabo modi praesentium qui sed pariatur nemo?'
  }


  return (
    <article className="confirmation-task">
      <div className="confirmation-task__inner">
        <div className="confirmation-task__header">
          <div className="confirmation-task__user-info">
            <div className="confirmation-task__user-info_avatar">
              <img src={VARIABLES.avatarSRC} alt="avatar" />
            </div>
            <div className="confirmation-task__user-info_name">
              {VARIABLES.userName}
            </div>
          </div>
          <div className="confirmation-task__time-complete">
            {VARIABLES.timeComplete}
          </div>
        </div>
        <div className="confirmation-task__content">
          {VARIABLES.contentTask}
        </div>
        <div className="confirmation-task__buttons">
          <button className="confirmation-task__buttons_download-file button-grey">
            {VARIABLES.downLoadButton}
          </button>
          <button className="confirmation-task__buttons_confirm button-grey">
            {VARIABLES.confirmButton}
          </button>
        </div>
      </div>
    </article>
  )
}