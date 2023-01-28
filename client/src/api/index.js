import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000/api/' });

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) { 
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
//     return req;
// });

// export const fetchItems = () => axios.get(url);
export const getData = ()=>API.get(`items`);
export const createData = (form) => API.post(`form`, form);

export const logIn = (loginData) => {
    console.log('data passed to through the API - login');
    console.log(loginData);
    return API.post(`login`,loginData);
};
// export const signOut = () => API.get(`logout`);


