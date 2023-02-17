import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createKkgwData,getAllKkgwData} from '../../api/index.js';


const initialState = {
    loading: false,
    kkgwItems:[],
    error: ''
};


export const postKKGW = createAsyncThunk('kkgw/postKKGW', async(form, { rejectWithValue}) => {
    try {
        const response = await createKkgwData(form);
        console.log('kkgw item posted = ',response.data);
        return response.data;
    } catch (error) {
        console.log("post kkgw actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});
export const getKkgwItems = createAsyncThunk('kkgw/getKkgwItems', async(_, { rejectWithValue}) => {
    try {
        const response = await getAllKkgwData();
        console.log(' kkgw items = ',response.data);
        return response.data;
    } catch (error) {
        console.log("get kkgw actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});



const kkgwSlice = createSlice({
    name: 'kkgw',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postKKGW.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postKKGW.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(postKKGW.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        

        builder.addCase(getKkgwItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getKkgwItems.fulfilled, (state, action) => {
            state.loading = false;
            state.kkgwItems = action.payload;
        });
        builder.addCase(getKkgwItems.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default kkgwSlice.reducer;


