/**
 * @file Axios Request service API for dislikes && tuits resource
 */
import axios from "axios";
//const BASE_URL = "http://localhost:4000/api"
const BASE_URL = "https://stormy-shelf-58076.herokuapp.com/api";
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
    withCredentials: true
});

/**
 * Update tuit stats based on user's click event(toggles dislike button)
 * @param {string} uid Represents user that is toggling dislike button
 * @param {string} tid Represents the tuit being disliked by user
 */
export const userDislikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

/**
 * Retrieve all tuits disliked by user.
 * @param {string} uid Represents the login user
 */
export const findAllTuitsDisLikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data);

export const findUserDislikesTuit = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);