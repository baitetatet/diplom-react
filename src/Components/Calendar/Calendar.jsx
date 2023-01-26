import { useState } from "react"
import { SelectFormatTable } from "Components/Calendar/SelectFormatTable/SelectFormatTable"
import { ChangeDate } from "Components/Calendar/ChangeDate/ChangeDate"
import { converterCurrentWeek } from "hooks/converterCurrentWeek"
import { Day } from "Components/Calendar/Day/Day"
import { Week } from "Components/Calendar/Week/Week"
import { Month } from "Components/Calendar/Month/Month"
import { PopUpTasks } from "./PopUpTasks/PopUpTasks"
import { Year } from "Components/Calendar/Year/Year"

export const Calendar = () => {

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTable, setActiveTable] = useState('День')
  const [popUpTasksActive, setPopUpTasksActive] = useState(false)
  const [popUpTasksContent, setPopUpTasksContent] = useState(null)
  const [popUpDate, setPopUpDate] = useState(null)

  const dateType = {
    'День': selectedDate.toLocaleString('ru', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    'Неделя': function () {
      const { weekInterval } = converterCurrentWeek(selectedDate)
      return weekInterval
    }(),
    'Месяц': (() => {
      const monthTitle = selectedDate.toLocaleString('ru', { month: 'long', year: 'numeric' })
      return monthTitle[0].toUpperCase() + monthTitle.substring(1)
    })(),
    'Год': selectedDate.getFullYear() + ' г.'
  }

  const getDayTable = (event) => {
    const eventElem = event.target.classList.value === 'month-table__body__item' ? event.target : event.target.parentNode
    const eventDate = eventElem.attributes['data-date'].value
    const [eventDay, eventMonth, eventYear] = eventDate.split('.')
    const changedDate = [eventYear, +eventMonth, eventDay].join('-')

    setSelectedDate(new Date(changedDate))
    setActiveTable('День')
  }

  const handlerArrowClick = (event) => {
    const diff = event.target.classList.value.includes('nextArrow') ? 1 : -1
    const changeMonth = currentMonth => new Date(selectedDate.getFullYear(), currentMonth + diff)

    const formatDate = {
      'День': () => new Date(selectedDate.setDate(selectedDate.getDate() + diff)),
      'Неделя': () => new Date(selectedDate.setDate(selectedDate.getDate() + diff * 7)),
      'Месяц': () => changeMonth(selectedDate.getMonth()),
      'Год': () => new Date(selectedDate.setYear(selectedDate.getFullYear() + diff))
    }
    setSelectedDate(formatDate[activeTable]())
  }

  const handlerClickOnDay = (e) => {
    if (e.target.classList.value.includes('task')) {
      const taskElem = e.target
      setPopUpTasksContent(taskElem.parentNode.children)
      setPopUpTasksActive(true)
      setPopUpDate([taskElem.dataset.time, taskElem.dataset.date].join(' '))
    }
  }

  const changeTable = () => {
    switch (activeTable) {
      case 'День':
        return <Day
          selectedDate={selectedDate}
          handlerClickOnDay={handlerClickOnDay}
        />
      case 'Неделя':
        return <Week
          getDayTable={getDayTable}
          selectedDate={selectedDate}
          handlerClickOnDay={handlerClickOnDay}
        />
      case 'Месяц':
        return <Month
          selectedDate={selectedDate}
          month={selectedDate.getMonth()}
          getDayTable={getDayTable}
          table={'month'}
        />
      case 'Год':
        return <Year
          selectedDate={selectedDate}
          getDayTable={getDayTable}
          table={'year'}
        />
      default: return <></>
    }
  }

  return (
    <div className="calendar">
      <SelectFormatTable
        className="calendar__select-format"
        activeTable={activeTable}
        setActiveTable={setActiveTable}
      />
      <div className="calendar__content">
        <ChangeDate
          title={dateType[activeTable]}
          handlerArrowClick={handlerArrowClick}
        />
        {changeTable()}
        {
          popUpTasksActive ?
            <PopUpTasks
              content={popUpTasksContent}
              setPopUpTasksActive={setPopUpTasksActive}
              date={popUpDate}
            /> :
            <></>
        }
      </div>
    </div>
  )
}