import request from '../util/request'

const getNewsData = (data) => {
  return request({
    url: '/getNewsData',
    method: 'get',
    params: data
  })
}

export {
  getNewsData
}