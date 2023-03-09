import { checkAndChangeDateFormat } from "./date"
import { MONTHS } from "../API/monthsAPI"

export const dateInterval = (startInterval, endInterval) => {
	const convertMonth = month => {
		return month.toLowerCase().replace(/т$/, "та").replace(/[ьй]$/, "я")
	}

	return [
		[
			startInterval.getDate(),
			startInterval.getMonth() === endInterval.getMonth()
				? ""
				: convertMonth(MONTHS[startInterval.getMonth()]),
			startInterval.getFullYear() === endInterval.getFullYear()
				? ""
				: startInterval.getFullYear() + " г.",
		].join(" "),
		[
			endInterval.getDate(),
			convertMonth(MONTHS[endInterval.getMonth()]),
			endInterval.getFullYear() + " г.",
		].join(" "),
	].join(" - ")
}

export function converterTimeInterval(selectedDate, timeInterval) {
	const daysBeforeBeginningOfWeek = () => {
		const dayOfWeek = (selectedDate.getDay() + 6) % 7

		for (var i = 0, days = 0; i < 7; i++) {
			if (i < dayOfWeek) days++
		}

		return days
	}

	const startInterval = new Date(
		selectedDate.getFullYear(),
		selectedDate.getMonth(),
		selectedDate.getDate() - daysBeforeBeginningOfWeek()
	)
	const endInterval = new Date(
		startInterval.getFullYear(),
		startInterval.getMonth(),
		startInterval.getDate() + timeInterval
	)

	const fillWeekDaysDate = startInterval => {
		const dateWeekDays = [""]
		const dateForPush = new Date(startInterval.getTime())

		for (let i = 0; i < 8; i++) {
			dateWeekDays.push(
				[
					dateForPush.getFullYear(),
					checkAndChangeDateFormat(dateForPush.getMonth() + 1),
					checkAndChangeDateFormat(dateForPush.getDate()),
				].join("-")
			)
			dateForPush.setDate(dateForPush.getDate() + 1)
		}
		return dateWeekDays
	}

	return {
		dateInterval: dateInterval(startInterval, endInterval),
		datesWeek: fillWeekDaysDate(startInterval),
	}
}
