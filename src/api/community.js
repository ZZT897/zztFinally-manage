import request from '../util/request'

const getCommunityData = (data) => {
    return request({
        url: '/getCommunityData',
        method: 'post',
        data
    })
}

const post = (data) => {
    return request({
        url: '/addCommunityData',
        method: 'post',
        data
    })
}

const addCommunityComment = (data) => {
    return request({
        url: '/addCommunityComment',
        method: 'post',
        data
    })
}
export {
    getCommunityData,
    post,
    addCommunityComment
}