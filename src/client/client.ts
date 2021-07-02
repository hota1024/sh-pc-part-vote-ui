import axios from 'axios'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
})

export { client }
