import { createSlice } from "@reduxjs/toolkit"

export const tasksForCalendar = createSlice({
	name: "taskForCalendar",
	initialState: [],
	reducers: {
		tasksForDay: (state, action) => {
			state = [action.payload.tasksForDay]
		},
		tasksForWeek: (state, action) => {
			state = [...action.payload.tasksForWeek]
		},
	},
})

export const { tasksForDay, tasksForWeek } = tasksForCalendar.actions
export default tasksForCalendar.reducer
