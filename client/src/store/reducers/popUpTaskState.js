import { createSlice } from "@reduxjs/toolkit"

export const popUpTaskState = createSlice({
	name: "popUpTaskState",
	initialState: {
		popUpTaskActive: false,
		activeTask: {},
	},
	reducers: {
		changePopUpTaskState: (state, action) => {
			state.popUpTaskActive = action.payload.popUpTaskActive
			state.activeTask = action.payload.popUpTaskActive
				? action.payload.activeTask
				: {}
		},
		confirmStageTask: (state, action) => {
			state.activeTask.stages.forEach(stage => {
				if (
					stage.timeStart === action.payload.stage.timeStart &&
					stage.description === action.payload.stage.description
				) {
					stage.status = "Confirmed"
				}
			})
		},
	},
})

export const { changePopUpTaskState, confirmStageTask } = popUpTaskState.actions

export default popUpTaskState.reducer
