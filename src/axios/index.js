import axios from "axios"
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"



axios.defaults.headers.common["Authorization"] = window.sessionStorage.getItem("token")
axios.interceptors.request.use(config => {
    // config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
})
export default axios