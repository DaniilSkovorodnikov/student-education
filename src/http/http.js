import axios from "axios";

export const API_URL = 'https://peers.up.railway.app';

const $http = axios.create({
    baseURL: API_URL
})

$http.interceptors.request.use((reqConfig) => {
    reqConfig.headers.Authorization = `Token ${localStorage.getItem('token')}`
    return reqConfig
})

$http.interceptors.response.use((answer) => answer, (answer) => {
    if(answer.response.status === 403){
        throw Error('Authorization error')
    }
})

export default $http