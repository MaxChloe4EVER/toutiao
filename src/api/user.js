import request from '../utils/request'

export const login = data => request({
  url: '/app/v1_0/authorizations',
  method: 'POST',
  data
})

export const getSmsCode = mobile => request({
  // 接口文档说明 mobile 要以动态参数的形式传给后台
  url: `/app/v1_0/sms/codes/${mobile}`,
  method: 'POST'
})
