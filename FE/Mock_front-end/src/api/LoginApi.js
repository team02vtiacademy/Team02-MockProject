import Api from './Api';
import store from '../Storage/Storage';
const login = (username, password) => {
    store.setToken(null);
    const parameters = {
        username: username,
        password: password
    }

    return Api.get(`/login`, { params: parameters });
};

// export
const api = { login }
export default api;