import axios from 'axios';
const REGEX = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

// TODO: we might need to request interceptors in order to pass access token

// Register interceptors
axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        // We need to log this thing
        // Logger Service should log it
        console.log('Logging the error', error);
        // might be show the error via toast
    }

    return Promise.reject(error);
});

export default {
    get: REGEX.get,
    post: REGEX.post,
    put: REGEX.put,
    patch: REGEX.patch,
    delete: REGEX.delete,
    axios: axios
}

