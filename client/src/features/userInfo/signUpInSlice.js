import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp,logIn } from '../../api/index.js';

// import axios from 'axios';
// const url = 'http://localhost:5000/api/';

const initialState = {
    loading: false,
    userAdded: {},
    userInfo: {},
    error: ''
};

export const signupUser = createAsyncThunk('user/signupUser', async(signupData, { rejectWithValue}) => {
    try {
        const response = await signUp(signupData);
        console.log('response after sign-up - ',response.data);
        // if (response.data.result.department === 'admin') navigate('/admin');
        return response.data;
    } catch (error) {
        console.log("login actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async({loginData,navigate}, { rejectWithValue}) => {
    try {
        const response = await logIn(loginData);
        if (response.data.result.department === 'admin') navigate('/admin');
        return response.data;
    } catch (error) {
        console.log("login actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

const signupSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userAdded = action?.payload;
        });
        builder.addCase(signupUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
        
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem('profile',JSON.stringify({...action?.payload}))
            state.userInfo = action?.payload;
        });
        builder.addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
         });
    }
});

export default signupSlice.reducer;
