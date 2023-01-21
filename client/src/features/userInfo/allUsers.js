import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/index.js';

const initialState = {
    loading: false,
    allUsers: [],
    error: ''
};

export const fetchUsers = createAsyncThunk('allUsers/fetchUsers', async (_, { rejectWithValue}) => {
    try {
        const response = await getUsers();
        return response.data;
    } catch (error) {
        console.log("fetchItems actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
         });
    }
});

export default allUsersSlice.reducer;



