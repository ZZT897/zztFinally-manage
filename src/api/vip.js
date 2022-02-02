import request from '../util/request'

const pay = (data) => {
  return request({
    url: '/beVip',
    method: 'post',
    data
  })
}

export {
  pay
}