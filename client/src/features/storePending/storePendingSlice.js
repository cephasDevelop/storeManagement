import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStorePendingData,makeWithdraw} from '../../api/index.js';


const initialState = {
    loading: false,
    storePending:[],
    error: ''
};

export const getStorePendingItems = createAsyncThunk('atStore/getStorePendingItems', async(_, { rejectWithValue}) => {
    try {
        const response = await getAllStorePendingData();
        console.log('getStorePendingItems items = ',response.data);
        return response.data;
    } catch (error) {
        console.log("getStorePendingItems actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});
export const withdrawItems = createAsyncThunk('atStore/withdrawItems', async(storeObj, { rejectWithValue}) => {
    try {
        const response = await makeWithdraw(storeObj);
        console.log('makeWithdraw items = ',response.data);
        return response.data;
    } catch (error) {
        console.log("makeWithdraw actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});


const storePendingSlice = createSlice({
    name: 'atStore',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStorePendingItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getStorePendingItems.fulfilled, (state, action) => {
            state.loading = false;
            state.storePending = action.payload;
        });
        builder.addCase(getStorePendingItems.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
        builder.addCase(withdrawItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(withdrawItems.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(withdrawItems.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default storePendingSlice.reducer;


