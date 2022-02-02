import request from '../util/request'

const getWareList = (data) => {
  return request({
    url: '/getWareList',
    method: 'get',
    params: data

  })
}



const updateScore = (data) => {
  return request({
    url: '/updateScore',
    method: 'post',
    data
  })
}

export {
  getWareList,
  updateScore
}