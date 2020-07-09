import axios from 'axios';

let url = process.env.REACT_APP_LOCAL_SERVER_URL;

export default {
    register: (uniqueUsername, email, password) => {
        return axios.post(`${url}/signup`, {
            uniqueUsername,
            email,
            password
        })
            .then((response) => response.data)
    },

    login: (email, password) => {
        return axios.post(`${url}/login`, {
            email,
            password
        })
            .then((response) => response.data)
    },
}