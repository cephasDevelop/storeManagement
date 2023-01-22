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
    console.log('data passed to through the API - login');
    console.log(loginData);
    return API.post(`login`,loginData);
};

export const signUp = (signupData) => API.post(`signupforadmin`, signupData);

export const updateUserData = (updateInfo) => {
    console.log("SECOND API");
    console.log("payload data - ",updateInfo);
    // return API.patch(`update/${updateInfo.id}`, updateInfo.active);
    return API.patch(`updateUser`, updateInfo);
}
// export const signOut = () => API.get(`logout`);


