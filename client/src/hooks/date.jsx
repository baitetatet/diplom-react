export const checkAndChangeDateFormat = date => (date < 10 ? "0" + date : date)
export const dateFormat = date => {
	return [
		date.getFullYear(),
		checkAndChangeDateFormat(date.getMonth() + 1),
		checkAndChangeDateFormat(date.getDate()),
	].join("-")
}
