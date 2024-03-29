import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "axios"

export const statusTask = createAsyncThunk(
	"popUpTaskState/statusTask",
	async () => {
		const response = await Axios.post("/check-status-all-stages", {
			taskId: popUpTaskState.state.activeTask.id,
		})
			.then(res => res.data)
			.catch(err => console.log(err))

		if (response !== "false") {
		}
	}
)

export const popUpTaskState = createSlice({
	name: "popUpTaskState",
	initialState: {
		popUpTaskActive: false,
		activeTask: {},
		taskStatus: "inProcessing",
		stages: [],
		typePopUp: "",
	},
	reducers: {
		changePopUpTaskState: (state, action) => {
			state.popUpTaskActive = action.payload.popUpTaskActive
			if (action.payload.popUpTaskActive) {
				state.activeTask = action.payload.activeTask
				state.taskStatus = action.payload.activeTask.status
				state.typePopUp = action.payload.typePopUp
			}
		},
		confirmStageTask: (state, action) => {
			const stage = action.payload.stage
			state.stages.push(stage)
			Axios.post("/change-stage-status", {
				stageId: stage.id,
				status: "onConfirmation",
			})
				.then(res => console.log(res))
				.catch(err => console.log(err))
		},
		changeTaskStatus: (state, action) => {
			state.taskStatus = action.payload.taskStatus
			const taskId = action.payload.taskId
			Axios.post("/change-task-status", {
				taskId: taskId,
				taskStatus: state.taskStatus,
			})
				.then(res => console.log(res))
				.catch(err => console.log(err))
		},
		sendOnConfirmation: (state, action) => {
			state.taskStatus = action.payload.taskStatus
			const taskId = action.payload.taskId
			Axios.post("/send-on-confirmation", {
				taskId: taskId,
				taskStatus: state.taskStatus,
				timeComplete: action.payload.timeComplete,
			})
		},
	},
})

export const {
	changePopUpTaskState,
	confirmStageTask,
	changeTaskStatus,
	sendOnConfirmation,
} = popUpTaskState.actions

export default popUpTaskState.reducer
