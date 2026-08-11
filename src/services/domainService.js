import api from './api'
import axios from 'axios'


async function getAllDomains(){
    const response = await api.get('/domains')
    return response.data
}

async function getDomainById(id){
    try {
        const response = await api.get(`/domains/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log({message: error.response.data.message})
    }
}

async function createDomain(body){
    const response = await api.post('/domains', body)
    return response.data
}

async function updateDomain(id, body){
    const response = await api.put(`/domains/${id}`,body)
    return response.data
}

async function deleteDomain(id){
    const response = await api.delete(`/domains/${id}`)
    return response.data
}

export{
    getAllDomains,
    getDomainById,
    createDomain,
    updateDomain,
    deleteDomain,
}