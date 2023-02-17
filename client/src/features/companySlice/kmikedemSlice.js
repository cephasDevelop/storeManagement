import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createKmikedemData,getAllKmikedemData} from '../../api/index.js';


const initialState = {
    loading: false,
    kmikedemItems:[],
    error: ''
};


export const postKMikedem = createAsyncThunk('kmikedem/postKMikedem', async(form, { rejectWithValue}) => {
    try {
        const response = await createKmikedemData(form);
        console.log('Kmikdem item posted = ',response.data);
        return response.data;
    } catch (error) {
        console.log("post mikedem actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});
export const getKmikedemItems = createAsyncThunk('kmikedem/getKmikedemItems', async(_, { rejectWithValue}) => {
    try {
        const response = await getAllKmikedemData();
        console.log('kmikdem items = ',response.data);
        return response.data;
    } catch (error) {
        console.log("get kmikedem actions api .... error")
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});


const kmikedemSlice = createSlice({
    name: 'kmikedem',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postKMikedem.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postKMikedem.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(postKMikedem.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        builder.addCase(getKmikedemItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getKmikedemItems.fulfilled, (state, action) => {
            state.loading = false;
            state.kmikedemItems = action.payload;
        });
        builder.addCase(getKmikedemItems.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
    }
});

export default kmikedemSlice.reducer;


