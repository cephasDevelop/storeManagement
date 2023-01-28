import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../api/index.js';

const initialState = {
    loading: false,
    items: [],
    error: ''
};

export const fetchItems = createAsyncThunk('item/fetchItems', async (_, { rejectWithValue}) => {
    try {
        // const response = await axios.get(`${url}items`);
        const response = await getData();
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("fetchItems actions api .... error");
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});


const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchItems.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        

         
        
    }
});

export default itemSlice.reducer;




// const itemSlice = createSlice({
//     name: 'item',
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(fetchUsers.pending, (state) => {
//             state.loading = true;
//         });
//         builder.addCase(fetchUsers.fulfilled, (state, action) => {
//             state.loading = false;
//             state.items = action.payload;
//         });
//         builder.addCase(fetchUsers.rejected, (state,action) => {
//             state.loading = false;
//             state.error = action.error.message;
//          });
//     }
// });