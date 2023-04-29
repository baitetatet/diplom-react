export const checkAndChangeDateFormat = date => (date < 10 ? "0" + date : date)
export const dateFormat = date => {
	return [
		date.getFullYear(),
		checkAndChangeDateFormat(date.getMonth() + 1),
		checkAndChangeDateFormat(date.getDate()),
	].join("-")
}
export const timeFormat = date => {
	return [date.getHours(), date.getMinutes()].join(":")
}

export const dateFormatForConfirmationTask = data => {
	var dateResult
	const [date, time] = data.split(" ")
	const dateDiff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)

	if (dateDiff < 1) {
		dateResult = "Сегодня"
	} else if (dateDiff < 2) {
		dateResult = "Вчера"
	} else {
		dateResult = date
	}
	return [dateResult, "в", time].join(" ")
}
