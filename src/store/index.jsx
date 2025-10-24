import { configureStore } from "@reduxjs/toolkit";
import { mainReducer } from "./reducers/mainReducer";
import authReducer from "./reducers/authReducer";

export const store = configureStore({
    reducer: {
        main: mainReducer,
        auth: authReducer,
    },
})