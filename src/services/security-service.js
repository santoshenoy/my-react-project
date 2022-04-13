import axios from "axios";
const BASE_URL = "https://stormy-shelf-58076.herokuapp.com";
//const BASE_URL = "http://localhost:4000"


const SECURITY_API = `${BASE_URL}/api/auth`;

// creates an axios instance configured to include cookie headers
// by setting the withCredentials property to true
const api = axios.create({
    withCredentials: true
});

export const signup = (user) =>
    api.post(`${SECURITY_API}/signup`, user)
        .then(response => response.data);

export const login = (user) =>
    api.post(`${SECURITY_API}/login`, user)
        .then(response => response.data);

export const logout = () =>
    api.post(`${SECURITY_API}/logout`)
        .then(response => response.data);

export const profile = () =>
    api.post(`${SECURITY_API}/profile`)
        .then(response => response.data);