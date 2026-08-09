import React from 'react'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { getAllGoals } from '../../services/goalService'
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

  return (
    <div>
        <h1>goals page</h1> <Link to={`/goals/create`}>➕ new goal</Link>
        {
            goals.map((one, index)=><div key={one._id}>
               <h3>goal {index+1}: {one.title}</h3>
               <p>status: {one.status}</p>
               <p> progress: {one.progress}</p>
               <p>Current achievement: {one.tracking?.currentAchievement}</p>
               <p>target achievement: {one.tracking?.TargetAchievement}</p>
               <Link to={`/goals/${one._id}`}>Go to goal details</Link>
            </div>)
        }
   </div>
  )
}

export default GoalsPage