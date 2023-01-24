import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createData } from '../../api/index.js';

// import axios from 'axios';
// import { url} from '../../api/index.js'
// const url = 'http://localhost:5000/api/';

const initialState = {
    loading: false,
    formItem: {},
    error: ''
};

//--------------------- JASON PLACEHOLDER ------------------------------
// export const fetchItems = createAsyncThunk('item/fetchItems', () => {
//     return axios.get('https://jsonplaceholder.typicode.com/users')
//         .then((response) => response.data );
// });
//---------------------------------------------------

export const postItem = createAsyncThunk('itemForm/postItem', async(form, { rejectWithValue}) => {
    try {
        // const response = await axios.post(`${url}form`, form);
        const response = await createData(form);

        return response.data;
    } catch (error) {
        console.log("postForm actions api .... error")
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
            state.formItem = action.payload;
        });
        builder.addCase(postItem.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
         });
    }
});

export default formSlice.reducer;


