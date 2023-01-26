import imgPlus from 'images/plus.png'
import imgCheck from 'images/check.png'
import imgCalendar from 'images/calendar-icon.png'
import { Link } from 'react-router-dom'

export const Nav = () => {

  const NAV_ITEMS = [
    {
      text: "Календарь",
      img: imgCalendar,
      path: '/'
    },
    {
      text: "Новая задача",
      img: imgPlus,
      path: '/new-task'
    },
    {
      text: "Задачи на подтверждение",
      img: imgCheck,
      path: '/confirmation-tasks'
    }
  ]

  return (
    <>
      <div className="nav">
        <div className="nav__inner">
          <ul className="nav__list">
            {
              NAV_ITEMS.map(item =>
                <li
                  className=""
                  key={item.text}
                >
                  <Link className='nav__item' to={item.path}>
                    <p className="nav__item_text">{item.text}</p>
                    <span className="nav__item_icon">
                      <img src={item.img} alt="icon" />
                    </span>
                  </Link>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </>
  )
}