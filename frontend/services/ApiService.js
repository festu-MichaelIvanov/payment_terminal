import axios from "axios/index";
import Cookies from "js-cookie";


export function getCellOperators() {
    return axios.get(
        '/api/cell-operators/'
    )
        .then((response) => {
            return {data: response.data, status: response.status}
        })
        .catch((error) => {
            return {data: error.response.data, status: error.response.status}
        })
}

export function getUserBalance(cellOperatorId) {
    return axios.get(
        '/api/user-balance/',
        {
            params: {
                'cell_operator_id': cellOperatorId
            }
        }
    )
        .then((response) => {
            return {data: response.data, status: response.status}
        })
        .catch((error) => {
            return {data: error.response.data, status: error.response.status}
        })
}


export function createOrUpdateUserBalance(operatorId, phone, balance) {
    return axios.post(
        '/api/user-balance/create-or-update-user-balance/',
        {
            cell_operator: operatorId,
            phone: phone,
            balance: balance
        },
        setCsrfToken()
    )
        .then((response) => {
            return {data: response.data, status: response.status}
        })
        .catch((error) => {
            return {data: error.response.data, status: error.response.status}
        })
}

function setCsrfToken() {
    return {
        'headers': {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
}