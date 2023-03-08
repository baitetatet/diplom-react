import { configureStore } from "@reduxjs/toolkit"
import popUpTaskState from "./reducers/popUpTaskState"
import task from "./reducers/task"

export default configureStore({
	reducer: {
		popUpTaskState: popUpTaskState,
		task: task,
	},
})
