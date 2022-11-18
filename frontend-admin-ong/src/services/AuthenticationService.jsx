import axios from './AxiosHelper';

// define public methods
export const authenticationService = {    
    login
};

function login(o) {
    return axios.postData(`/api/account/login`, o, false);
}
