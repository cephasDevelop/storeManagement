import { configureStore } from '@reduxjs/toolkit';

// import reducers
import itemReducer from '../features/items/itemSlice.js';
import formReducer from '../features/itemForm/itemFormSlice.js';
import userReducer from '../features/userInfo/userSlice.js';

const store = configureStore({
    reducer: {
        item: itemReducer,
        formItem: formReducer,
        user: userReducer,
    }
});

export default store;