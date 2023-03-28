import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPendingChecks,depositePendingChecks} from '../../api/index.js';


const initialState = {
    loading: false,
    checkPendings:[],
    error: ''
};

export const getPendingChecks = createAsyncThunk('check/getPendingChecks', async(_, { rejectWithValue}) => {
    try {
        const response = await fetchPendingChecks();
        console.log('getCheckPendingItems items = ',response.data);
        return response.data;
    } catch (error) {
        console.log("getCheckPendingItems actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});
export const depositeCheck = createAsyncThunk('check/depositeCheck', async(id, { rejectWithValue}) => {
    try {
        const response = await depositePendingChecks(id);
        console.log('deposite items = ',response.data);
        return response.data;
    } catch (error) {
        console.log("deposite actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

const checkPendingSlice = createSlice({
    name: 'check',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPendingChecks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPendingChecks.fulfilled, (state, action) => {
            state.loading = false;
            state.checkPendings = action.payload;
        });
        builder.addCase(getPendingChecks.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
        builder.addCase(depositeCheck.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(depositeCheck.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(depositeCheck.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default checkPendingSlice.reducer;


