export function converterCurrentWeek(dayOfWeek, date, MONTHS) {
  const convertMonth = (month) => {
    return month
      .toLowerCase()
      .replace(/т$/, 'та')
      .replace(/[ьй]$/, 'я')
  }

  let before = 0
  for (let i = 0; i < 7; i++) {
    if (i < dayOfWeek) before++
  }

  let startWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - before)
  let endWeek = new Date(startWeek.getFullYear(), startWeek.getMonth(), startWeek.getDate() + 7)
  let currentMonth = convertMonth(MONTHS[endWeek.getMonth()])

  const fillWeekDaysDate = (startWeek) => {
    const dateWeekDays = ['']
    let prepeirDate = startWeek.getTime()
    for (let i = 0; i < 8; i++) {
      const dateForPush = new Date(prepeirDate)
      dateWeekDays.push([dateForPush.getDate(), dateForPush.getMonth() + 1, dateForPush.getFullYear()].join('.'))
      prepeirDate += (24 * 60 * 60 * 1000)
    }
    return dateWeekDays
  }
  const datesWeek = fillWeekDaysDate(startWeek)

  let currentWeek = startWeek.getMonth() === endWeek.getMonth() ?
    (startWeek.getDate() + ' - ' + [endWeek.getDate(), currentMonth, endWeek.getFullYear(), ' г.'].join(' '))
    : (startWeek.getDate() + ' ' + convertMonth(MONTHS[startWeek.getMonth()]) + ' - ' + endWeek.getDate() + ' ' + convertMonth(MONTHS[endWeek.getMonth()]) + ' ' + endWeek.getFullYear() + ' г.')


  return { currentWeek, datesWeek }
}