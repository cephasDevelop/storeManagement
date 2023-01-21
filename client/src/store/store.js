import { configureStore } from '@reduxjs/toolkit';

// import reducers
import itemReducer from '../features/items/itemSlice.js';
import formReducer from '../features/itemForm/itemFormSlice.js';
import userReducer from '../features/userInfo/userSlice.js';
import signupReducer from '../features/userInfo/signupSlice.js';
import allUsersReducer from '../features/userInfo/allUsers.js';
const store = configureStore({
    reducer: {
        item: itemReducer,
        formItem: formReducer,
        userInfo: userReducer,
        userAdded: signupReducer,
        users:allUsersReducer,
    }
});

export default store;