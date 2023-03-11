import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) { 
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const getData = () => API.get(`items`);
export const getUsers = () => API.get(`allUsers`);

export const createData = (form) => API.post(`form`, form);


export const createPurchasedData = (form) => API.post(`formPurchasedItems`, form);

// api regarding KKGW 
export const createKkgwData = (form) => {
    return API.post(`postKkgwItem`, form);
};
export const getAllKkgwData = () => API.get(`getkkgwItems`);


// to get both companys' data together
export const getAllCompanyItemsData = () => API.get(`getAllCompanyItemsData`);


// api regarding the purchased product list
export const getAllProductListData = () => API.get(`getAllProductListData`);
export const editProductListData = (obj) => API.post(`editProduct/${obj.id}`, { ...obj });
export const deleteProductListData = (obj) => {
    return API.put(`deleteProduct/${obj.id}`, { ...obj });
};



// api regarading KMikedem
export const createKmikedemData = (form) => API.post(`postKmikedemItem`, form);
export const getAllKmikedemData = () => API.get(`getKmikedemItems`);



export const getAllStorePendingData = () => API.get(`getStorePendingItems`);
export const makeWithdraw = (obj) => API.post(`withdrawItems`,obj);



export const fetchPendingChecks = () => API.get(`pendingCheck`);
export const depositePendingChecks = (id) => API.delete(`depositeCheck/${id}`);



export const changePassword = (data) => API.post(`changepassword`,data);
export const forgotPassword = (data) => API.post(`forgotpassword`,data);
export const logIn = (loginData) => API.post(`login`,loginData);
export const signUp = (signupData) => API.post(`signupforadmin`, signupData);
export const updateUserData = (id,active) => API.patch(`updateUser/${id}`, {active});
export const deleteUser = (id) => API.delete(`deleteUser/${id}`);


export const makeRequest = (requestObject) => API.post(`makeRequest/`, { ...requestObject });
export const getAllRequested = () => API.get(`requestedtems`);
export const cancelRequest = ({ selfId, fromMongoId }) => API.delete(`delete-request/${selfId}`);
export const makePayment = (payload) => API.put(`paymentRequest/${payload.id}`, payload);

export const makeindividualPayments = (obj) => API.put(`individualPayments`,obj);

export const createHistory = (payloadHist) => { 
    return API.post(`historyCreate`,payloadHist);
};
export const getAllHistory = () => { 
    return API.get(`getHistory`);
};
// export const signOut = () => API.get(`logout`);
