import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"

export const popUpTaskState = createSlice({
	name: "popUpTaskState",
	initialState: {
		popUpTaskActive: false,
		activeTask: {},
	},
	reducers: {
		changePopUpTaskState: (state, action) => {
			state.popUpTaskActive = action.payload.popUpTaskActive
			if (action.payload.popUpTaskActive)
				state.activeTask = action.payload.activeTask
		},
		confirmStageTask: (state, action) => {
			const stage = action.payload.stage
			Axios.post("/change-status", {
				stageId: stage.id,
				status: "onConfirmation",
			})
				.then(res => console.log(res))
				.catch(err => console.log(err))
		},
	},
})

export const { changePopUpTaskState, confirmStageTask } = popUpTaskState.actions

export default popUpTaskState.reducer
