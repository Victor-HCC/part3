import axios from "axios";

// const baseUrl = 'https://part3-backend-production.up.railway.app/api/persons'
const baseUrl = 'http://localhost:3000/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = (person) => {
  const request = axios.post(baseUrl, person)
  return request.then(res => res.data)
}

const deleteById = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updateById = (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person)
  return request.then(res => res.data)
}

export { create, getAll, deleteById, updateById }