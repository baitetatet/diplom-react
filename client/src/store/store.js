import { configureStore } from "@reduxjs/toolkit";
import popUpTaskState from "./reducers/popUpTaskState";

export default configureStore({
  reducer: {
    popUpTaskState: popUpTaskState
  }
})