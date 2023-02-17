import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAllProductListData, editProductListData,
    deleteProductListData, makeindividualPayments
} from '../../api/index.js';


const initialState = {
    loading: false,
    allProductsList:[],
    error: ''
};

export const getListOfPurchasedProducts = createAsyncThunk('allProductsList/getListOfPurchasedProducts', async(_, { rejectWithValue}) => {
    try {
        const response = await getAllProductListData();
        console.log('All product list = ',response.data);
        return response.data;
    } catch (error) {
        console.log("get all product list actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});
export const editProduct = createAsyncThunk('allProductsList/editProduct', async(obj, { rejectWithValue}) => {
    try {
        const response = await editProductListData(obj);
        console.log('edit product list = ',response.data);
        return response.data;
    } catch (error) {
        console.log("edit product list actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});
export const deletePurchasedProduct = createAsyncThunk('allProductsList/deletePurchasedProduct', async(obj, { rejectWithValue}) => {
    try {
        const response = await deleteProductListData(obj);
        console.log('delete product list = ',response.data);
        return response.data;
    } catch (error) {
        console.log("delete product list actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
}); 
export const individualPayments = createAsyncThunk('allProductsList/individualPayments', async(obj, { rejectWithValue}) => {
    try {
        const response = await makeindividualPayments(obj);
        console.log('makeindividualPayments = ',response.data);
        return response.data;
    } catch (error) {
        console.log("makeindividualPayments actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});
const productListSlice = createSlice({
    name: 'allProductsList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getListOfPurchasedProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getListOfPurchasedProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.allProductsList = action.payload;
        });
        builder.addCase(getListOfPurchasedProducts.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        

        builder.addCase(editProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(editProduct.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        builder.addCase(deletePurchasedProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deletePurchasedProduct.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deletePurchasedProduct.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        builder.addCase(individualPayments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(individualPayments.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(individualPayments.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
    }
});

export default productListSlice.reducer;


