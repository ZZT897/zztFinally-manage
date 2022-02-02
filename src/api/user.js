
import request from '../util/request'

const login = (data) => {
    return request({
        url: '/user',
        method: 'post',
        data
    })
}

const editPersonData = (data) => {
    return request({
        url: '/editPersonData',
        method: 'post',
        data
    })
}

export {
    login,
    editPersonData
}