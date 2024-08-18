import axios from 'axios'
import { LOCAL_STORAGE_KEY__ACCESS_TOKEN } from './auth'

const api = axios.create({
    baseURL: "https://api-modacad-72uqj.ondigitalocean.app/",
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN) || '""')}`
    }

    // salvar o token no localStorage,
    // function de login e logout

    // service de authentication - pra salver o login do token e remover o token
    // configurar no axios que assim que fizer a requisicao tem alguma coisa no localstorage, se tiver algo ele envia na requisicao
    // bater
})

export  {api}