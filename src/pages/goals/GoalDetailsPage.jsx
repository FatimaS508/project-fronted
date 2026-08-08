import React from 'react'
import { useState, useEffect } from 'react'
import { deleteGoal, getOneGoal } from '../../services/goalService'
import { useParams, useNavigate, Link } from "react-router";



function GoalDetailsPage() {

    const [goal, setGoal]= useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        async function LoadGoal(){
            try{
                setLoading(true);
                setError(false);
                const response= await getOneGoal(id)
                setGoal(response)
            } catch (err) {
                setError(err.response.data.message);
            } finally {
                setLoading(false);
            }
        }
        LoadGoal()
    },[])


    async function handleDelete(){
        try{
             await deleteGoal(id)
            navigate("/goals");
        }catch(err){console.log(err)}
    }

    if (loading) return <p>Loading...</p>;
  if (error) {
    return <p className="error">Error: {error}</p>;
  }


  return (
    <div>
        <h1>goal details</h1>
        <p>goal name: 
             {goal.title}</p>
    </div>
  )
}

export default GoalDetailsPage