import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        project: "demo",
        database: "demo",
    },
    reducers: {
        setProject: (state, action) => {
            state.project =  action.payload.project;
        },
        unSetProject: (state) => {
            state.project =  "demo";
        },
        setDatabase: (state, action) => {
            state.database =  action.payload.database;
        },
        unSetDatabase: (state) => {
            state.database =  "demo";
        },
        reset: (state) => {
            state.project =  "demo";
            state.database =  "demo";
        },
    },
});

export const { setProject, unSetProject, setDatabase, unSetDatabase, reset } = projectSlice.actions;
export default projectSlice.reducer;
