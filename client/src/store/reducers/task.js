import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"

export const task = createSlice({
	name: "task",
	initialState: [],
	reducers: {
		addNewTask: (state, action) => {
			state.push({ ...action.payload.newTask, stages: action.payload.stages })
			Axios.post("/new-task", {
				newTask: action.payload.newTask,
				stages: action.payload.stages,
			})
				.then(res => console.log(res))
				.catch(err => console.log(err))
		},
	},
})

export const { addNewTask } = task.actions
export default task.reducer
