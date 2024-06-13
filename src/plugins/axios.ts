import axios from "axios";
import Swal from "sweetalert2";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        if (response.data?.message) {
            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success'
            })
        }
        return response;
    },
    (error) => {
        if (error.response.data?.message) {
            Swal.fire({
                title: 'Oops!',
                text: error.response.data.message,
                icon: 'error'
            })
        }
        if (error.response.status === 401) {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
export default instance;