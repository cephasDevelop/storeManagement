import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createData,createPurchasedData } from '../../api/index.js';


const initialState = {
    loading: false,
    formItem: {},
    error: ''
};


export const postItem = createAsyncThunk('itemForm/postItem', async(form, { rejectWithValue}) => {
    try {
        const response = await createData(form);
        console.log('item posted = ',response.data);
        return response.data;
    } catch (error) {
        console.log("postForm actions api .... error");
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

export const purchasedItem = createAsyncThunk('itemForm/purchasedItem', async (form, { rejectWithValue }) => {
    try {
        const response = await createPurchasedData(form);
        console.log('Purchased Item = ',response.data);
        return response.data;
    } catch (error) {
        console.log("purchased Items actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});


const formSlice = createSlice({
    name: 'itemForm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postItem.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postItem.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(postItem.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
        builder.addCase(purchasedItem.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(purchasedItem.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(purchasedItem.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
         });
    }
});

export default formSlice.reducer;


