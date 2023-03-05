import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"

export const task = createSlice({
	name: "task",
	initialState: Axios.get("/get-tasks")
		.then(res => res.data)
		.catch(() => {}),
	reducers: {
		addNewTask: (state, action) => {
			state.push({ ...action.payload.newTask, stages: action.payload.stages })

			Axios.post("/new-task", {
				newTask: action.payload.newTask,
			})
				.then(res => console.log(res))
				.catch(err => console.log(err))
		},
	},
})
