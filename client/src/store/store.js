import { configureStore } from "@reduxjs/toolkit"
import popUpTaskState from "./reducers/popUpTaskState"
import task from "./reducers/task"
import taskForCalendar from "./reducers/tasksForCalendar"

export default configureStore({
	reducer: {
		popUpTaskState: popUpTaskState,
		task: task,
		tasksForCalendar: taskForCalendar,
	},
})
