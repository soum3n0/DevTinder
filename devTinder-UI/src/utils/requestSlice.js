import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "Requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const req = state.filter((user)=>user._id !== action.payload);
            return req;
        },
    },
});

export const {addRequests, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;
