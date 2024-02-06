import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: {
            username: null,
            email: null,
            firstName: null,
            lastName: null,
            profile: null,
            token: null,
        },
        isAuthenticated: false,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser.username = action.payload.username;
            state.currentUser.email = action.payload.email;
            state.currentUser.firstName = action.payload.firstName;
            state.currentUser.lastName = action.payload.lastName;
            state.currentUser.profile = action.payload?.profile?.secureUrl;
            state.currentUser.token = action.payload.token;
            state.isAuthenticated = true;
        },
        updateData: (state, action) => {
            state.currentUser.username = action.payload.username;
            state.currentUser.email = action.payload.email;
            state.currentUser.firstName = action.payload.firstName;
            state.currentUser.lastName = action.payload.lastName;
            state.currentUser.profile = action.payload?.profile?.secureUrl;
            state.isAuthenticated = true;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser.username = null;
            state.currentUser.email = null;
            state.currentUser.token = null;
            state.currentUser.firstName = null;
            state.currentUser.lastName = null;
            state.currentUser.profile = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginStart, updateData, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
