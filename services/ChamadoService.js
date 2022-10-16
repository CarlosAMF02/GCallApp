import axios from 'axios'

const URL_BASE = 'https://api-gcall.azurewebsites.net'

function listarChamados(id) {
    return axios({
        url : URL_BASE + '/atendente-chamado/'+id,
        method: 'get',
    })
}

function listarChamadosCliente(id) {
    return axios({
        url : URL_BASE + '/chamado/cliente/'+id,
        method: 'get',
    })
}

export { listarChamados, listarChamadosCliente }