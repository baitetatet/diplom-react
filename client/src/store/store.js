import { configureStore } from "@reduxjs/toolkit"
import popUpTaskState from "./reducers/popUpTaskState"
import newTask from "./reducers/newTask"
import taskForCalendar from "./reducers/tasksForCalendar"
import taskByType from "./reducers/taskByType"

export default configureStore({
	reducer: {
		popUpTaskState: popUpTaskState,
		newTask: newTask,
		tasksForCalendar: taskForCalendar,
		taskByType: taskByType,
	},
})
