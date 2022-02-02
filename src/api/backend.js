import request from '../util/request'

const getUser = (data) => {
    return request({
        url: '/getUser',
        method: 'get',
        params: data
    })
}

const editUser = (data) => {
  return request({
    url: '/updateUser',
    method: 'post',
    data
  })
}

const deleteUser = (data) => {
  return request({
    url: '/deleteUser',
    method: 'post',
    data
  })
}

const getDataList = (data) => {
  return request({
    url: '/getDataList',
    method: 'get',
    params: data
  })
}

const deleteData = (data) => {
  return request({
    url: '/deleteData',
    method: 'post',
    data
  })
}



const updateData = (data) => {
  return request({
    url: '/updateData',
    method: 'post',
    data
  })
}

const getNeed = (data) => {
  return request({
    url: '/getNeed',
    method: 'get',
    params: data
  })
}

const updateNeed = (data) => {
  return request({
    url: '/updateNeed',
    method: 'post',
    data
  })
}

const deleteNeed = (data) => {
  return request({
    url: '/deleteNeed',
    method: 'post',
    data
  })
}

const getCommunityList = (data) => {
  return request({
    url: '/getCommunityList',
    method: 'get',
    params: data
  })
}

const deleteCommunityList = (data) => {
  return request({
    url: '/deleteCommunityList',
    method: 'post',
    data
  })
}

const updateCommunityList = (data) => {
  return request({
    url: '/updateCommunityList',
    method: 'post',
    data
  })
}

const addCommunityList = (data) => {
  return request({
    url: '/addCommunityList',
    method: 'post',
    data
  })
}

const getCommentList = (data) => {
  return request({
    url: '/getCommentList',
    method: 'get',
    params: data
  })
}

const updateCommentList = (data) => {
  return request({
    url: '/updateCommentList',
    method: 'get',
    params: data
  })
}

const deleteCommemtList = (data) => {
  return request({
    url: '/deleteCommemtList',
    method: 'post',
    data
  })
}

const addData = (data) => {
  return request({
    url: '/addData',
    method: 'post',
    data
  })
}

export {
  getUser,
  editUser,
  deleteUser,
  getDataList,
  deleteData,
  updateData,
  getNeed,
  updateNeed,
  deleteNeed,
  getCommunityList,
  deleteCommunityList,
  updateCommunityList,
  addCommunityList,
  getCommentList,
  updateCommentList,
  deleteCommemtList,
  addData
}