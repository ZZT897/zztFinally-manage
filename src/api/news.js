import request from '../util/request'

const getNewsData = (data) => {
  return request({
    url: '/getNewsData',
    method: 'get',
    params: data
  })
}

const delNewsData = (data) => {
  return request({
    url: '/delNewsData',
    method: 'post',
    data
  })
}

const editNews = (data) => {
  return request({
    url: '/editNewsData',
    method: 'post',
    data
  })
}

const addNews = (data) => {
  return request({
    url: '/addNewsData',
    method: 'post',
    data
  })
}

export {
  getNewsData,
  delNewsData,
  editNews,
  addNews
}