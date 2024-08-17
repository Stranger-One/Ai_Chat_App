import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import authSlice from "./authSlice";
import dataSlice from "./dataSlice";

const store = configureStore({
    reducer:{
        menu: menuSlice,
        auth: authSlice,
        data: dataSlice,
    }
})

export default store;