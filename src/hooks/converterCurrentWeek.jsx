import { checkAndChangeDateFormat } from '../hooks/checkAndChangeDateFormat'
import { MONTHS } from '../API/monthsAPI'

export function converterCurrentWeek(selectedDate) {
  const convertMonth = (month) => {
    return month
      .toLowerCase()
      .replace(/т$/, 'та')
      .replace(/[ьй]$/, 'я')
  }
  const dayOfWeek = (selectedDate.getDay() + 6) % 7

  const daysBeforeBeginningOfWeek = dayOfWeek => {
    let days = 0
    for (let i = 0; i < 7; i++) {
      if (i < dayOfWeek) days++
    }
    return days
  }

  const startWeek = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - daysBeforeBeginningOfWeek(dayOfWeek))
  const endWeek = new Date(startWeek.getFullYear(), startWeek.getMonth(), startWeek.getDate() + 7)

  const fillWeekDaysDate = (startWeek) => {
    const dateWeekDays = ['']
    const dateForPush = new Date(startWeek.getTime())

    for (let i = 0; i < 8; i++) {
      dateWeekDays.push([checkAndChangeDateFormat(dateForPush.getDate()), checkAndChangeDateFormat(dateForPush.getMonth() + 1), dateForPush.getFullYear()].join('.'))
      dateForPush.setDate(dateForPush.getDate() + 1)
    }
    return dateWeekDays
  }

  const weekInterval = (startWeek, endWeek) => {
    return [
      [startWeek.getDate(), (startWeek.getMonth() === endWeek.getMonth() ? '' : convertMonth(MONTHS[startWeek.getMonth()])), startWeek.getFullYear() === endWeek.getFullYear() ? '' : startWeek.getFullYear() + ' г.'].join(' '),
      [endWeek.getDate(), convertMonth(MONTHS[endWeek.getMonth()]), endWeek.getFullYear() + ' г.'].join(' ')
    ].join(' - ')
  }

  return { weekInterval: weekInterval(startWeek, endWeek), datesWeek: fillWeekDaysDate(startWeek) }
}