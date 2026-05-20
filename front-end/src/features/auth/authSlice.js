import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuth: false,
        userDetails: null,
    },
    reducers: {
        userLogin: (state,action) => {
            state.isAuth = true;
            state.userDetails = action.payload;
        },
        userLogout: (state,action) => {
            state.isAuth = true;
            state.userDetails = null;
        }
    }
});

export const { userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;