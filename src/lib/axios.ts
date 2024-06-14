import axios from 'axios'

const oldBlogAPI = axios.create({
    baseURL: "https://blog.modacad.com.br/ghost/api/content/posts/?key=9b804468fef4c227aca1c6c7d8"
})

const newBlogAPI = axios.create({
    baseURL: "https://blog.modacad.com.br/ghost/api/content/posts/?key=9b804468fef4c227aca1c6c7d8"
})

export  {newBlogAPI, oldBlogAPI}