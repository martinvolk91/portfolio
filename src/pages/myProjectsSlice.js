import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// Data
import {githubUsername, projectCardImages, projectData} from "../data";

const initialState = {
    error: "",
    isLoading: true,
    data: [],
};

export const url = `https://api.github.com/users/${githubUsername}/repos?per_page=100`;

//export const fetchGitHubReops = createAsyncThunk(
//    "myProjects/fetchGitHubReops",
//    async (thunkApi, {rejectWithValue}) => {
//        try {
//            const response = await fetch(url).then(function (res) {
//                if (!res.ok) {
//                    throw new Error(res.status);
//                }
//                return res;
//            });
//            const data = await response.json();
//            return data;
//        } catch (err) {
//            return rejectWithValue(
//                `Error: ${err.message}, check username in data.js (currently ${githubUsername})`
//            );
//        }
//    }
//);
//
//export const myProjectsSlice = createSlice({
//    name: "myProjects",
//    initialState,
//    extraReducers: (builder) => {
//        builder
//            .addCase(fetchGitHubReops.pending, (state) => {
//                state.isLoading = true;
//                state.error = "";
//            })
//            .addCase(fetchGitHubReops.fulfilled, (state, action) => {
//                state.isLoading = false;
//                state.data = action.payload;
//                projectCardImages.forEach(function (element) {
//                    state.data.forEach((el, i) => {
//                        if (element.name.toLowerCase() === el.name.toLowerCase()) {
//                            el.image = element.image;
//                        }
//                    });
//                });
//            })
//            .addCase(fetchGitHubReops.rejected, (state, action) => {
//                state.isLoading = false;
//                state.error = action.payload;
//                console.log(state.error);
//            });
//    },
//});

export const myProjectsSlice = createSlice({
    name: "myProjects",
    initialState: {
        data: projectData, // Initialize with the static data
    },
    reducers: {
        // You can add other reducers as needed
    },
});

export const selectIsLoading = (state) => state.myProjects.isLoading;
export const selectError = (state) => state.myProjects.error;
export const selectData = (state) => state.myProjects.data;

export default myProjectsSlice.reducer;
