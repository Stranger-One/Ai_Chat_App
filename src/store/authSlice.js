import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userStatus: false,
        userData: null
    },
    reducers:{
        loginContext: (state, action) => {
            state.userStatus = true;
            state.userData = action.payload;
            // console.log("loginContext userdata updated");
        },
        LogoutContext: (state, action) => {
            state.userStatus = false;
            state.userData = null;
        }
    }
})

export const {loginContext, LogoutContext} = authSlice.actions
export default authSlice.reducer;