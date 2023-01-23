import { configureStore } from '@reduxjs/toolkit';

// import reducers
import itemReducer from '../features/items/itemSlice.js';
import formReducer from '../features/itemForm/itemFormSlice.js';
import signupReducer from '../features/userInfo/signUpInSlice.js';
import allUsersReducer from '../features/userInfo/allUsersSlice.js';

const store = configureStore({
    reducer: {
        item: itemReducer,
        formItem: formReducer,
        userAdded: signupReducer,
        users: allUsersReducer,
    }
});

export default store;