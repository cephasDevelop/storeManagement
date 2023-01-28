import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createHistory,getAllHistory } from '../../api/index.js';

const initialState = {
    loading: false,
    historyData: [],
    error: ''
};


export const makeHistory = createAsyncThunk('history/makeHistory', async (historyData, { rejectWithValue}) => {
    try {
        console.log('Request Made');
        console.log('First API call - ',historyData);
        const response = await createHistory(historyData);
        return response.data;

    } catch (error) {
        console.log("create history api .... error");
        console.log(error);
        return rejectWithValue(error.response.data);
    }
}); 

export const getHistory = createAsyncThunk('history/getHistory', async (_, { rejectWithValue}) => {
    try {
        const response = await getAllHistory();
        return response.data;
    } catch (error) {
        console.log("fetchItems actions api .... error");
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeHistory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(makeHistory.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(makeHistory.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(getHistory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.historyData = action.payload;
        });
        builder.addCase(getHistory.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }
});

export default historySlice.reducer;



