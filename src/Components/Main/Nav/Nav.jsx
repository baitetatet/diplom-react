import imgPlus from '../../../images/plus.png'
import imgCheck from '../../../images/check.png'

export const Nav = () => {

  const NAV_ITEMS = [
    {
      text: "Новая задача",
      img: imgPlus
    },
    {
      text: "Задачи на подтверждение",
      img: imgCheck
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
                  className="nav__item"
                  key={item.text}
                >
                  <p className="nav__item_text">{item.text}</p>
                  <span className="nav__item_icon">
                    <img src={item.img} alt="icon" />
                  </span>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </>
  )
}