import axios from 'axios'
import { baseURL } from './no-github'

const instance = axios.create({
  baseURL
})

export default instance