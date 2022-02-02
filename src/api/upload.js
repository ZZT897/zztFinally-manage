
import request from '../util/request'

const getImage = (data) => {
    return request({
        url: '/getImageUrl',
        method: 'get',
        params: data,
    })
}

const saveImage = (data) => {
    return request({
        url: '/saveImageUrl',
        method: 'post',
        data,
        headers: { "Content-Type": "multipart/form-data" }
    })
}


export {
    getImage,
    saveImage
}