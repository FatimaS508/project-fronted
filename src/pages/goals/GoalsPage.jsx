import React from 'react'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { getAllGoals, deleteAll } from '../../services/goalService'
import { getDomainById } from '../../services/domainService'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'



function GoalsPage() {
    const [goals, setAllGoals]= useState([])
    const [domain, setDomain]= useState(null) //th
    const navigate = useNavigate()
    const { id } = useParams();

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

    async function LoadOneDomain(){
        try{
            const response= await getDomainById(id)
            setDomain(response)
        }catch(err){console.log(err)}
    }

    useEffect(()=>{
        LoadOneDomain()
    },[id])

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
          <h1>goals page</h1> <Link to={`/goals/create/${domain?._id}`}>➕ new goal</Link> <button onClick={() => {
              if (window.confirm("Are you sure you want to delete all goals?")) {
                  handleDeleteAllGoals();
              }
          }}>
              Delete All Goals
          </button>

            {
                goals.map((one, index) => <div key={one._id}>
                    <h3>goal {index + 1}: {one.title}</h3>
                    <p>status: {one.status}</p>
                    <p> progress: {one.progress}%</p>


                    {one.tracking?.currentAchievement != null &&
                        one.tracking?.targetAchievement != null && (
                            <>
                                <p>
                                    Current achievement: {one.tracking.currentAchievement}
                                </p>

                                <p>
                                    Target achievement: {one.tracking.targetAchievement}
                                </p>
                            </>
                        )}

                    <Link to={`/goals/${one._id}`}>Go to goal details</Link>
                </div>)
            }
        </div>
    )
}

export default GoalsPage