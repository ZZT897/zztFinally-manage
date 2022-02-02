import request from '../util/request'

const getNeed = (data) => {
  return request({
    url: '/addNeed',
    method: 'post',
    data
  })
}

const addUploadFile = (data) => {
  return request({
    url: '/addUploadFile',
    method: 'post',
    data
  })
}

const addProjectData = (data) => {
  return request({
    url: '/addProjectData',
    method: 'post',
    data
  })
}

const getPersonData = (data) => {
  return request({
    url: '/getPersonData',
    method: 'get',
    params: data
  })
}

const editPersonInfo = (data) => {
  return request({
    url: '/editPersonInfo',
    method: 'post',
    data
  })
}

export {
  getNeed,
  addProjectData,
  addUploadFile,
  getPersonData,
  editPersonInfo
}