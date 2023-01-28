import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest,getAllRequested,cancelRequest,makePayment } from '../../api/index.js';

const initialState = {
    loading: false,
    requestedItems: [],
    error: ''
};

export const deleteRequest = createAsyncThunk('request/deleteRequest', async ({ selfId,fromMongoId}, { rejectWithValue}) => {
    try {
        const response = await cancelRequest({ selfId,fromMongoId});
        return response.data;
    } catch (error) {
        console.log("login actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

export const requestThis = createAsyncThunk('request/requestThis', async (request, { rejectWithValue}) => {
    try {
        // const response = await axios.get(`${url}items`);
        console.log('Request Made');
        console.log('First API call - ',request);
        const response = await makeRequest(request);
        return response.data;

    } catch (error) {
        console.log("request api .... error");
        console.log(error);
        return rejectWithValue(error.response.data);
    }
}); 

export const getRequestedItems = createAsyncThunk('request/getRequestedItems', async (_, { rejectWithValue}) => {
    try {
        // const response = await axios.get(`${url}items`);
        const response = await getAllRequested();
        return response.data;
    } catch (error) {
        console.log("fetchItems actions api .... error");
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});
export const makingPayment = createAsyncThunk('request/makingPayment', async (payload, { rejectWithValue}) => {
    try {
        // const response = await axios.get(`${url}items`);
        const response = await makePayment(payload);
        return response.data;
    } catch (error) {
        console.log("payment actions api .... error");
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});
const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(requestThis.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(requestThis.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(requestThis.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        builder.addCase(getRequestedItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRequestedItems.fulfilled, (state, action) => {
            state.loading = false;
            state.requestedItems = action.payload;
        });
        builder.addCase(getRequestedItems.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        builder.addCase(makingPayment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(makingPayment.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(makingPayment.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        builder.addCase(deleteRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteRequest.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteRequest.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default requestSlice.reducer;



