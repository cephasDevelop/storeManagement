import { configureStore } from '@reduxjs/toolkit';

// import reducers
import itemReducer from '../features/items/itemSlice.js';
import formReducer from '../features/itemForm/itemFormSlice.js';
import signupReducer from '../features/userInfo/signUpInSlice.js';
import allUsersReducer from '../features/userInfo/allUsersSlice.js';
import requestReducer from '../features/requestSlice/requestSlice.js';
import historyReducer from '../features/historySlice/historySlice.js';
import kkgwReducer from '../features/companySlice/kkgwSlice.js';
import kmikedemReducer from '../features/companySlice/kmikedemSlice.js';

import companyReducer from '../features/companySlice/companySlice.js';
import productListReducer from '../features/companySlice/productListSlice.js';

const store = configureStore({
    reducer: {
        item: itemReducer,
        formItem: formReducer,
        userAdded: signupReducer,
        users: allUsersReducer,
        requested: requestReducer,
        history:historyReducer,

        kkgwItem: kkgwReducer,
        kmikedemItem: kmikedemReducer,
        
        totalCompanyItems:companyReducer,
        purchasedProductsList:productListReducer,
    }
});

export default store;