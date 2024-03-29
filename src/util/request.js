import axios from "axios";

const service = axios.create({
    baseURL: 'http://localhost:8888',
})

//axios请求拦截器
service.interceptors.request.use(
    config => {
        return config
    }
)

service.interceptors.response.use(
    res => {
        return res.data
    }
)

export default service;
