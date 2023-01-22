import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserData } from '../../api/index.js';

// import axios from 'axios';
// const url = 'http://localhost:5000/api/';

const initialState = {
    loading: false,
    updateStatus: '',
    error: ''
};

export const updateUser = createAsyncThunk('userUpdate/update', async(updateInfo, { rejectWithValue}) => {
    try {
        // console.log('FIRST API');
        // console.log('the user data - ',updateInfo.id);
        // console.log('the user Status - ',updateInfo.active);
        const response = await updateUserData(updateInfo);
        return response.data;
    } catch (error) {
        console.log("login actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

const updateSlice = createSlice({
    name: 'userUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.updateStatus = 'updated';
        });
        builder.addCase(updateUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
         });
    }
});

export default updateSlice.reducer;
