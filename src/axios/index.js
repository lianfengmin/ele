import axios from "axios"

import Nprogress from "nprogress"
import "nprogress/nprogress.css"
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"




axios.interceptors.request.use(config => {
    Nprogress.start()//进度条
    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
})

axios.interceptors.response.use(config => {

    Nprogress.done()//进度条
    // config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
})

export default axios