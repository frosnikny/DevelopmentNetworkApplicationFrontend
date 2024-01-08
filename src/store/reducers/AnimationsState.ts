import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AnimationState {
    isLoading: boolean
    successText: string
    errorText: string
}

const initialState: AnimationState = {
    isLoading: false,
    successText: '',
    errorText: ''
}

export const animationSlice = createSlice({
    name: 'animation',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        finishLoading(state) {
            state.isLoading = false
        },
        setSuccessAndError(state, action: PayloadAction<string[]>) {
            state.isLoading = false
            state.successText = action.payload[0]
            state.errorText = action.payload[1]
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.successText = ''
            state.errorText = action.payload
        },
        setSuccess(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.successText = action.payload
            state.errorText = ''
        },
        resetSearch(state) {
            state.successText = ''
            state.errorText = ''
        },
    },
})

export default animationSlice.reducer;