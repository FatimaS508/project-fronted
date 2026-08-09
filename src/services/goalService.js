import api from "./api";
import axios from 'axios'

async function getAllGoals(){
    const response = await api.get('/goals')
    return response.data
}

async function getOneGoal(id){
    const response = await api.get(`/goals/${id}`)
    return response.data
}

async function createGoal(body){
    const response = await api.post('/goals', body)
    return response.data
}

async function updateGoal(id, body){
    const response = await api.put(`/goals/${id}`, body)
    return response.data
}

async function deleteGoal(id){
    const response = await api.delete(`/goals/${id}`)
    return response.data
}




export{getAllGoals, getOneGoal, createGoal, updateGoal, deleteGoal}