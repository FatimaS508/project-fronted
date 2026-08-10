import React from 'react'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { getAllGoals, deleteAll } from '../../services/goalService'
import { useNavigate } from 'react-router'



function GoalsPage() {
    const [goals, setAllGoals]= useState([])
    const navigate = useNavigate()

    async function LoadGoals(){
        try{
            const response = await getAllGoals()
            setAllGoals(response)
        }catch(err){
          console.log(err)
        }
    }

    useEffect(()=>{
        LoadGoals()
    }, [])

    async function handleDeleteAllGoals(){
        try{
            const response= await deleteAll()
            setAllGoals([])

        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <h1>goals page</h1> <Link to={`/goals/create`}>➕ new goal</Link> <button onClick={handleDeleteAllGoals}>Delete All goals</button>
        {
            goals.map((one, index)=><div key={one._id}>
               <h3>goal {index+1}: {one.title}</h3>
               <p>status: {one.status}</p>
               <p> progress: {one.progress}</p>
               <p>Current achievement: {one.tracking?.currentAchievement}</p>
               <p>target achievement: {one.tracking?.targetAchievement}</p>
               <Link to={`/goals/${one._id}`}>Go to goal details</Link>
            </div>)
        }
   </div>
  )
}

export default GoalsPage