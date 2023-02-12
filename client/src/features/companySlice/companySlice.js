import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCompanyItemsData} from '../../api/index.js';


const initialState = {
    loading: false,
    allCompanyItems:[],
    error: ''
};

export const getAllCompanyItems = createAsyncThunk('allCompanyItems/getAllCompanyItems', async(_, { rejectWithValue}) => {
    try {
        const response = await getAllCompanyItemsData();
        console.log('All items = ',response.data);
        return response.data;
    } catch (error) {
        console.log("get all items actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});


const companySlice = createSlice({
    name: 'allCompanyItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCompanyItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllCompanyItems.fulfilled, (state, action) => {
            state.loading = false;
            state.allCompanyItems = action.payload;
        });
        builder.addCase(getAllCompanyItems.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
    }
});

export default companySlice.reducer;


