import { useState } from 'react'

export const SelectItem = ({ activeTable, setActiveTable, values }) => {
  const [activeState, setActiveState] = useState(false)

  return (
    <div className='calendar__select'>
      <button className={activeState ? 'calendar__select__btn_active' : 'calendar__select__btn'} onClick={() => { setActiveState(prev => !prev) }}>
        <span className='calendar__select__btn_span'>{activeTable}</span>
      </button>
      <div className='calendar__select__menu'>
        <ul
          className='calendar__select__list'
          onClick={event => {
            setActiveState(prev => !prev)
            setActiveTable(event.target.innerHTML)
          }}
          onMouseLeave={() => { if (activeState) { setActiveState(prev => !prev) } }}
        >
          {values.map(value =>
            <button
              key={value.key}
              className='calendar__select__list__item'
            >
              <span
                data-value={value.text}
                className='calendar__select__list__item_text'>{value.text}</span>
            </button>)}
        </ul>
      </div>
    </div>
  )
}