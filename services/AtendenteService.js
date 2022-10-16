import axios from 'axios'

const URL_BASE = 'https://api-gcall.azurewebsites.net'

function login(email, password) {
    return axios({
        url : URL_BASE + '/atendente/login',
        method: 'post',
        data : {
            email,
            password
        }
    })
}

function cadastrarAtendente(name, cpf, email, password, cnpj) {
    return axios({
        url : URL_BASE + '/atendente',
        method: 'post',
        data : {
            name, 
            cpf, 
            email, 
            password, 
            cnpj
        }
    })
}

export { login, cadastrarAtendente }