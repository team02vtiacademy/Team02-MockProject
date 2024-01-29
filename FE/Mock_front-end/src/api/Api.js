import axios from 'axios';
import storage from '../Storage/Storage';

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/api/v1`,
    //'https://653e80399e8bd3be29df643b.mockapi.io/api/v1'
    // timeout: 5000, // default is `0` (no timeout)
    // responseType: 'json',
    // headers: {"Access-Control-Allow-Origin": "http://localhost:3000",
    //          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    // if token exists then attach token
    const token = storage.getToken();
    if (token !== null && token !== undefined) {
        config.headers.Authorization = "Bearer " + token;
    }
    // config.headers["Access-Control-Allow-Origin"] = "*";
    // config.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept";

    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data !== undefined) {
        // only get data
        return response.data;
    }
    // response.headers["Access-Control-Allow-Origin"] = "*";
    // response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept";

    return response;
}, (error) => {
    // Handle errors
    if (error.response) {
        throw error.response;
    } else if (error.request) {
        throw error.request;
    } else {
        throw error;
    }
});

export default axiosClient;

