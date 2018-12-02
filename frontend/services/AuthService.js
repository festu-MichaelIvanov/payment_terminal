import axios from 'axios';
import Cookies from 'js-cookie';


export function login(email, password) {
    const data = {
        email,
        password,
    };
    return axios.post(
        '/api-login/', data, setCsrfToken()
    )
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem('email', response.data.email);
            }
            return {message: response.data.message, status: response.status}
        })
        .catch((error) => {
                return {message: error.response.data.message, status: error.response.status}
            }
        )
}

export function logout() {
    return axios.post(
        '/api-logout/', {}, setCsrfToken()
    )
        .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('email');
            }
            return {message: response.data.message, status: response.status}
        })
        .catch((error) => {
                return {message: error.response.data.message, status: error.response.status}
            }
        )
}


export function getUserEmail() {
    return localStorage.getItem('email');
}

export function isLoggedIn() {
    return localStorage.getItem('email') !== null;
}

function setCsrfToken() {
    return {
        'headers': {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
}