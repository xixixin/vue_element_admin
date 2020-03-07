import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:3300/getUser',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:3300/getusertoken',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://localhost:3300/loginout',
    method: 'post'
  })
}
