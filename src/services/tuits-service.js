import axios from "axios";

const TUITS_API = "https://morning-retreat-82753.herokuapp.com/api/tuits";
const USERS_API = "https://morning-retreat-82753.herokuapp.com/api/users";

export const findAllTuits = () =>
    axios.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    axios.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitByUser = (uid) =>
    axios.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (uid, tuit) =>
    axios.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

export const updateTuit = (tid, tuit) =>
    axios.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const deleteTuitsByAuthor = uid =>
    axios.delete(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const deleteTuitsByContent = tuitContent =>
    axios.delete(`${TUITS_API}/content/${tuitContent}`)
        .then(response => response.data);
