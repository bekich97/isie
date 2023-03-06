import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./stores/authSlice";
import mainSlice from "./stores/mainSlice";
import messageSlice from "./stores/messageSlice";

export default configureStore({
    reducer: {
        mainSlice: mainSlice,
        authSlice: authSlice,
        messageSlice: messageSlice,
    },
})