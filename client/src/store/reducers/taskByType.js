import { createSlice } from "@reduxjs/toolkit"

export const taskByType = createSlice({
	name: "taskByType",
	initialState: {
		actualTask: [],
		overdueTask: [],
		onConfirmationTask: [],
		confirmedTask: [],
	},
	reducers: {
		addTask: (state, action) => {
			const typeTask = action.payload.type
			const uniqueTask = state[typeTask].find(
				task => task.id === action.payload[typeTask].id
			)
			!uniqueTask && state[typeTask].push(action.payload[typeTask])
		},
	},
})

export const { addTask } = taskByType.actions
export default taskByType.reducer
