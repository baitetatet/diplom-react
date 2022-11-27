export const Week = ({ WEEK_DAYS, TIME }) => {
  const WEEK_TITLE = [
    {
      id: 'time',
      title: ''
    },
    ...WEEK_DAYS
  ]
  return (
    <section className="week-table">
      <div className="week-table__inner">
        {
          WEEK_TITLE.map(title =>
            <div
              className="week-table__day"
              key={title.id}
            >
              <h3 className="week-table__day_title">
                {title.title}
              </h3>
              <ul className="week-table__day__time-list">
                {
                  TIME.map(time =>
                    <li
                      className="week-table__day__time-list__item"
                      key={time.id}
                    >
                      {
                        title.id === 'time' ?
                          <span className="week-table__day__time-list__item_time">
                            {time.timeValue}
                          </span>
                          :
                          <div className="week-table__day__time-list__item_content">

                          </div>
                      }
                    </li>


                  )
                }
              </ul>
            </div>
          )
        }
      </div>
    </section>
  )
}