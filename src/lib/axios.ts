import axios from 'axios'

const api = axios.create({
    baseURL: "https://api-modacad-72uqj.ondigitalocean.app/"
})

export  {api}