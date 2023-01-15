import { configureStore } from '@reduxjs/toolkit';

// import reducers
import itemReducer from '../features/items/itemSlice.js';
import formReducer from '../features/itemForm/itemFormSlice.js';

const store = configureStore({
    reducer: {
        item: itemReducer,
        formItem: formReducer,
    }
});

export default store;