import request from '../util/request'

const pay = (data) => {
  return request({
    url: '/beVip',
    method: 'post',
    data
  })
}

const aliPay = (data) => {
  return request({
    url: '/api/pcpay',
    method: 'post',
    data
  })
}

const getReturn = (data) => {
  return request({
    url: '/api/queryOrder',
    method: 'post',
    data
  })
}

export {
  pay,
  aliPay,
  getReturn
}