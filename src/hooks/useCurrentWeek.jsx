export function useCurrentWeek(dayOfWeek, date, MONTHS) {
  let before = 0
  const convertMonth = (month) => {
    return month
      .toLowerCase()
      .replace(/т$/, 'та')
      .replace(/[ьй]$/, 'я')
  }

  for (let i = 0; i < 7; i++) {
    if (i < dayOfWeek) before++
  }

  let startWeek = new Date(date)
  startWeek.setDate(startWeek.getDate() - before)
  let endWeek = new Date(startWeek)
  let currentMonth = convertMonth(MONTHS[endWeek.getMonth()])

  endWeek.setDate(startWeek.getDate() + 7)
  console.log(endWeek)
  let currentWeek = startWeek.getMonth() === endWeek.getMonth() ?
    (startWeek.getDate() + ' - ' + [endWeek.getDate(), currentMonth, endWeek.getFullYear(), ' г.'].join(' '))
    : (startWeek.getDate() + ' ' + convertMonth(MONTHS[startWeek.getMonth()]) + ' - ' + endWeek.getDate() + ' ' + convertMonth(MONTHS[endWeek.getMonth()]) + ' ' + endWeek.getFullYear() + ' г.')

  return currentWeek
}