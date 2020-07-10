import axios from 'axios';
let url = process.env.REACT_APP_LOCAL_SERVER_URL;

export default {
    allImages: (page) => {
        return axios.get(`https://picsum.photos/v2/list?&limit=${page}`)
            .then((response) => response.data)
    },

    favImage: (imgUrl, uniqueUsername) => {
        return axios.post(`${url}/fav_image`, {
            imgUrl,
            uniqueUsername,
        })
            .then((response) => response.data)
    },

    getFavoriteImage: (uniqueUsername) => {
        return axios.post(`${url}/get_fav_image`, {
            uniqueUsername
        })
            .then((response) => response.data)
    },
}