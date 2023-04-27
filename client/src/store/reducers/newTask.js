import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"

export const newTask = createSlice({
	name: "newTask",
	initialState: [],
	reducers: {
		addNewTask: (state, action) => {
			state.push({ ...action.payload.newTask, stages: action.payload.stages })
			const involved = action.payload.newTask.involved
			involved.forEach(confirmer =>
				Axios.post("/new-task", {
					newTask: { ...action.payload.newTask, confirmer: confirmer },
					stages: action.payload.stages,
				})
					.then(res => console.log(res))
					.catch(err => console.log(err))
			)
		},
	},
})

export const { addNewTask } = newTask.actions
export default newTask.reducer
