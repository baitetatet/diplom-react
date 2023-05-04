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
		clearTypes: state => {
			for (let type in state) {
				state[type] = []
			}
		},
	},
})

export const { addTask, clearTypes } = taskByType.actions
export default taskByType.reducer
