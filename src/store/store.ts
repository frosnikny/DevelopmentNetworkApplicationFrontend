import {combineReducers, configureStore} from "@reduxjs/toolkit";
import animationReducer from "./reducers/AnimationsState.ts"
import progressReducer from "./reducers/ProgressState.ts"
import devsReducer from "./reducers/DevsState.ts"
import requestSlice from "./reducers/RequestState.ts"

const rootReducer = combineReducers({
    animationReducer,
    progressReducer,
    devsReducer,
    requestSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']