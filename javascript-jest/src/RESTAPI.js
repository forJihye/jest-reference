import axios from 'axios'

const REST_API = 'https://jsonplaceholder.typicode.com'

export default {
  findAll : callback => {
    return axios.get(`${REST_API}/users`).then(res => callback(null, res.data))
  },
  findOne : id => {
    return axios.get(`${REST_API}/users/${id}`).then(res => res.data)
  }
}