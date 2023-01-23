import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers,updateUserData,deleteUser } from '../../api/index.js';
// import { deleteUser } from '../../api/index.js';

const initialState = {
    loading: false,
    allUsers: [],
    deleteStatus: '',
    updateStatus: '',
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

export const deleteUserInfo = createAsyncThunk('allUsers/deleteUserInfo', async ({ id}, { rejectWithValue}) => {
    try {
        const response = await deleteUser(id);
        return response.data;
    } catch (error) {
        console.log("login actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

export const updateUser = createAsyncThunk('allUsers/updateUser', async({id,active}, { rejectWithValue}) => {
    try {
        const response = await updateUserData(id,active);
        return response.data;
    } catch (error) {
        console.log("login actions api .... error")
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
            state.deleteStatus = "";
            state.updateStatus = "";
        });
        builder.addCase(fetchUsers.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        

        builder.addCase(deleteUserInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.deleteStatus = 'deleted';
        });
        builder.addCase(deleteUserInfo.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
        
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

export default allUsersSlice.reducer;



