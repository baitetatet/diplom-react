import { useState } from "react"
import { SelectItem } from "./SelectItem/SelectItem"
import { ChangeDate } from "../Calendar/ChangeDate/ChangeDate"
import { converterCurrentWeek } from "../../../hooks/converterCurrentWeek"
import { Day } from "./Day/Day"
import { Week } from "./Week/Week"
import { Month } from "./Month/Month"
import { MONTHS } from "../../../API/monthsAPI"

const TIME = [
  { id: 'timeId_6', timeValue: '06:00' }, { id: 'timeId_7', timeValue: '07:00' }, { id: 'timeId_8', timeValue: '08:00' }, { id: 'timeId_9', timeValue: '09:00' },
  { id: 'timeId_10', timeValue: '10:00' }, { id: 'timeId_11', timeValue: '11:00' }, { id: 'timeId_12', timeValue: '12:00' }, { id: 'timeId_13', timeValue: '13:00' },
  { id: 'timeId_14', timeValue: '14:00' }, { id: 'timeId_15', timeValue: '15:00' }, { id: 'timeId_16', timeValue: '16:00' }, { id: 'timeId_17', timeValue: '17:00' },
  { id: 'timeId_18', timeValue: '18:00' }, { id: 'timeId_19', timeValue: '19:00' }
]
const WEEK_DAYS = [
  {
    id: '1',
    title: 'Понедельник',
    shortTitle: 'Пн'
  },
  {
    id: '2',
    title: 'Вторник',
    shortTitle: 'Вт'
  },
  {
    id: '3',
    title: 'Среда',
    shortTitle: 'Ср'
  },
  {
    id: '4',
    title: 'Четверг',
    shortTitle: 'Чт'
  },
  {
    id: '5',
    title: 'Пятница',
    shortTitle: 'Пт'
  },
  {
    id: '6',
    title: 'Суббота',
    shortTitle: 'Сб'
  },
  {
    id: '7',
    title: 'Воскресенье',
    shortTitle: 'Вс'
  }
]
const OPTION_VALUE = [
  {
    key: 'day',
    text: 'День'
  },
  {
    key: 'week',
    text: 'Неделя'
  },
  {
    key: 'month',
    text: 'Месяц'
  },
  {
    key: 'year',
    text: 'Год'
  }
]


export const Calendar = () => {

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTable, setActiveTable] = useState('Неделя')

  const currentDate = {
    'День': selectedDate.toLocaleString('ru', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    'Неделя': function () {
      const { currentWeek } = converterCurrentWeek(((selectedDate.getDay() + 6) % 7), selectedDate, MONTHS)
      return currentWeek
    }(),
    'Месяц': selectedDate.toLocaleString('ru', {
      month: 'long',
      year: 'numeric'
    }),
    'Год': selectedDate.getFullYear() + ' г.'
  }

  const getDay = (event) => {
    const eventElem = event.target.classList.value === 'month-table__body__item' ? event.target : event.target.parentNode
    const eventDate = eventElem.attributes['data-date'].value
    const [eventDay, eventMonth, eventYear] = eventDate.split('.')
    const changedDate = [eventYear, +eventMonth + 1, eventDay].join('-')

    setSelectedDate(new Date(changedDate))
    setActiveTable('День')
  }

  const changeTable = () => {
    switch (activeTable) {
      case 'День':
        return <Day
          TIME={TIME}
          selectedDate={selectedDate}
        />
      case 'Неделя':
        return <Week
          TIME={TIME}
          WEEK_DAYS={WEEK_DAYS}
          getDay={getDay}
          datesWeek={converterCurrentWeek(((selectedDate.getDay() + 6) % 7), selectedDate, MONTHS).datesWeek}
        />
      case 'Месяц':
        return <Month
          WEEK_DAYS={WEEK_DAYS}
          year={selectedDate.getFullYear()}
          MONTHS={MONTHS}
          currentMonth={selectedDate.getMonth()}
          getDay={getDay}
        />
      case 'Год':
        return console.log('year')
      default: return <></>
    }
  }

  const handlerArrowClick = (event) => {
    const eventElem = event.target.classList.value === 'changeDate__button' ? event.target : event.target.parentNode
    const argument = eventElem.classList.value.includes('nextArrow') ? 1 : -1

    switch (activeTable) {
      case 'День':
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + argument))
        break
      case 'Неделя':
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + argument * 7))
        break
      case 'Месяц':
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + argument, selectedDate.getDate()))
        break
      case 'Год':
        setSelectedDate(new Date(selectedDate.getFullYear() + argument, selectedDate.getMonth(), selectedDate.getDate()))
        break
      default:
        break
    }
  }

  return (
    <div className="calendar">
      <SelectItem
        className="calendar__select"
        activeTable={activeTable}
        setActiveTable={setActiveTable}
        values={OPTION_VALUE}
      />
      <div className="calendar__content">
        <ChangeDate
          title={currentDate[activeTable]}
          handlerArrowClick={handlerArrowClick}
        />
        {changeTable()}

      </div>
    </div>
  )
}