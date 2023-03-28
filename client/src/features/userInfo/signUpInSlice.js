import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp,logIn, forgotPassword, changePassword } from '../../api/index.js';

// import axios from 'axios';
// const url = 'http://localhost:5000/api/';

const initialState = {
    loading: false,
    userAdded: {},
    userInfo: {},
    error: '',
    incorrect: false
};

export const change = createAsyncThunk('user/change', async(data, { rejectWithValue}) => {
    try {
        const response = await changePassword(data);
        console.log('response after sign-up - ',response.data);
        // if (response.data.result.department === 'admin') navigate('/admin');
        return response.data;
    } catch (error) {
        console.log("login actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

export const forgot = createAsyncThunk('user/forgot', async(data, { rejectWithValue}) => {
    try {
        const response = await forgotPassword(data);
        console.log('response after sign-up - ',response.data);
        // if (response.data.result.department === 'admin') navigate('/admin');
        return response.data;
    } catch (error) {
        console.log("login actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

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
        if (response.data.result.department === 'teller') navigate('/request');
        if (response.data.result.department === 'finance') navigate('/finance');
        if (response.data.result.department === 'store') navigate('/stock');
        return response.data;
    } catch (error) {
        console.log("login actions api .... error")
        console.log('error response:', error.response.data);
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
            state.incorrect = false;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.removeItem('profile');
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
            state.userInfo = action.payload;
            state.incorrect = false;
        });
        builder.addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload.message;
            // console.log('correctness: ', action.error);
            state.incorrect = action.payload.message === 'Password not correct' ? true : false;
         });
    }
});

export default signupSlice.reducer;
