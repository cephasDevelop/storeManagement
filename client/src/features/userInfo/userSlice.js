import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logIn } from '../../api/index.js';

// import axios from 'axios';
// import { url} from '../../api/index.js'
// const url = 'http://localhost:5000/api/';

const initialState = {
    loading: false,
    userInfo: {},
    error: ''
};

export const loginUser = createAsyncThunk('user/loginUser', async (loginData, { rejectWithValue}) => {
    try {
        console.log('userData for login from frontend - ', loginData);
        //--------------------------------
        // N.B - await IS REMOVED SHALL TAKE INTO CONSIDERATION ??
        const response = await logIn(loginData);
        //--------------------------------
        // THIS IS AWORKING API
        // const response = await axios.post(`${url}login`, loginData);
        //--------------------------------

        return response.data;
    } catch (error) {
        console.log("login actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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

export default userSlice.reducer;
