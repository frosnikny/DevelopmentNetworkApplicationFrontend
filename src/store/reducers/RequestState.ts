import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICustomerRequest} from "../../models/models.ts";

interface RequestState {
    requests: ICustomerRequest[]
    request: ICustomerRequest | null
}

const initialState: RequestState = {
    requests: [],
    request: null
}

export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        setRequests(state, action: PayloadAction<ICustomerRequest[]>) {
            state.requests = action.payload
        },
        setRequest(state, action: PayloadAction<ICustomerRequest>) {
            state.request = action.payload
        },
        setRecordStatus(state, action: PayloadAction<ICustomerRequest>) {
            state.request = action.payload
        },
        setFormationDateStart(state, action: PayloadAction<ICustomerRequest>) {
            state.request = action.payload
        },
        setFormationDateEnd(state, action: PayloadAction<ICustomerRequest>) {
            state.request = action.payload
        },
    },
})

export default requestSlice.reducer;