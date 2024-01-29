import Api from './Api';

const url = "/users";

const existsByEmail = (email) => {
    return Api.get(`${url}/email/${email}`);
};

const existsByUsername = (username) => {
    return Api.get(`${url}/username/${username}`);
};


const create = (values) => {
    
    const body = {
        firstName: values.firstname,
        lastName: values.lastname,
        username: values.username,
        email: values.email,
        password: values.password
    }
    console.log(body);
    return Api.post(`${url}`, body);
};

const resendEmailToActiveAccount = (email) => {

    const parameters = {
        email: email
    }

    return Api.get(`${url}/userRegistrationConfirmRequest`, { params: parameters });
};

const requestResetPassword = (email) => {

    const parameters = {
        email: email
    }

    return Api.get(`${url}/resetPasswordRequest`, { params: parameters });
};

const resendEmailToResetpassword = (email) => {

    const parameters = {
        email: email
    }

    return Api.get(`${url}/resendResetPassword`, { params: parameters });
};

const resetPassword = (token, newPassword) => {

    const parameters = {
        token: token,
        newPassword: newPassword
    }

    return Api.get(`${url}/resetPassword`, { params: parameters });
};

const getProfile = () => {
    return Api.get(`${url}/profile`);
};

const updateProfile = (avatarUrl) => {

    const body = {
        avatarUrl: avatarUrl
    }

    return Api.put(`${url}/profile`, body);
};

const createAccountFromAdmin = (values) => {

    const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role
    }

    return Api.post(`${url}/byAdmin`, body);
};
const getAllUsers = (page = 1 , size = 10, sortField = 'id', sortType = 'desc', search ='') => {
    const parameters= {
        page,
        size,
        sort: `${sortField},${sortType}`
    }
       // search
       if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}`, {params: parameters});
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};
const update = (id, email, firstName, lastName) => {
    const body = {
        email, 
        firstName,
        lastName
    }
    return Api.put(`${url}/${id}`, body);
};

const deleteByIds = (ids) => {
    return Api.delete(`${url}/${ids.toString()}`);
};
// export
const api = {deleteByIds,getAllUsers, updateProfile, getProfile, create, existsByEmail, existsByUsername, 
    resendEmailToActiveAccount, requestResetPassword, resendEmailToResetpassword, resetPassword, createAccountFromAdmin,
    getById, update

}
export default api;