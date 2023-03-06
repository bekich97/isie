import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        access: null,
        isAuthenticated: null,
        user: null,
    },
    reducers: {
        userLoadedSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.access = localStorage.getItem("access");

        },
        userLoadedFail: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.access = null;
            localStorage.removeItem("access");
        }
    }
}) 

export const {
    userLoadedSuccess,
    userLoadedFail
} = authSlice.actions

export default authSlice.reducer