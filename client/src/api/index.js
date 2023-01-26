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

export const logIn = (loginData) => {
    return API.post(`login`,loginData);
};

export const signUp = (signupData) => API.post(`signupforadmin`, signupData);

export const updateUserData = (id,active) => API.patch(`updateUser/${id}`, {active});

export const deleteUser = (id) => API.delete(`deleteUser/${id}`);

export const makeRequest = (requestObject) => {
    console.log('Second API call');
    console.log('request object = ', requestObject);
    return API.post(`makeRequest/`, { ...requestObject });
}

export const getAllRequested = () => API.get(`requestedtems`);
export const cancelRequest = ({ selfId, fromMongoId }) => API.delete(`delete-request/${selfId}`);
export const makePayment = (payload) => {
    console.log('PAYMENT DATA');
    console.log(payload);
    return API.patch(`payment-request/${payload.id}`, {...payload});
}
// export const signOut = () => API.get(`logout`);
