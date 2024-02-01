import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ProgressState {
    searchValue: string
    recordStatusValue: string
    formationDateStartValue: string
    formationDateEndValue: string
    creatorFilterValue: string
}

const initialState: ProgressState = {
    searchValue: '',
    recordStatusValue: '',
    formationDateStartValue: '',
    formationDateEndValue: '',
    creatorFilterValue: '',
}

export const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        resetSearch(state) {
            state.searchValue = ''
        },
        setRecordStatusValue(state, action: PayloadAction<string>) {
            state.recordStatusValue = action.payload
        },
        setFormationDateStartValue(state, action: PayloadAction<string>) {
            state.formationDateStartValue = action.payload
        },
        setFormationDateEndValue(state, action: PayloadAction<string>) {
            state.formationDateEndValue = action.payload
        },
        setCreatorFilterValue(state, action: PayloadAction<string>) {
            state.creatorFilterValue = action.payload
        },
    },
})

export default progressSlice.reducer;