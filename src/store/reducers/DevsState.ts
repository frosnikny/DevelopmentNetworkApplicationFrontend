import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDevelopmentService} from "../../models/models.ts";

interface DevsState {
    devs: IDevelopmentService[]
    dev: IDevelopmentService | null
    basketID: string | null
}

const initialState: DevsState = {
    devs: [],
    dev: null,
    basketID: null
}

export const devsSlice = createSlice({
    name: 'devs',
    initialState,
    reducers: {
        setDevs(state, action: PayloadAction<IDevelopmentService[]>) {
            state.devs = action.payload
        },
        setBasketID(state, action: PayloadAction<string>) {
            if (action.payload === '') {
                state.basketID = null;
            } else {
                state.basketID = action.payload;
            }
        },
        setDev(state, action: PayloadAction<IDevelopmentService>) {
            state.dev = action.payload
        },
    },
})

export default devsSlice.reducer;