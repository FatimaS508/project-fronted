import React from 'react'
import { useState, useEffect } from 'react'
import { deleteGoal, getOneGoal, updateGoal } from '../../services/goalService'
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
                console.log(response)
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
      //const [count, setCount]=useState(0)
    async function handleIncrease() {
        console.log('increase clicked')
                const chnangedGoal = await updateGoal(id, {tracking:{...goal.tracking,currentAchievement:goal.tracking.currentAchievement+1}})
        console.log(goal)
        setGoal({
            ...goal, //this dots takes all the objects in goal
            
           tracking:{...goal.tracking, currentAchievement: (goal.tracking.currentAchievement || 0) + 1}
            
        })
    }
    async function handleDecrease() {
        console.log('decrease checked')
        const chnangedGoal = await updateGoal(id, {tracking:{...goal.tracking,currentAchievement:goal.tracking.currentAchievement-1}})
        console.log(goal)
        setGoal({
            ...goal, //this dots takes all the objects in goal
            
           tracking:{...goal.tracking, currentAchievement: (goal.tracking.currentAchievement || 0) - 1}
            
        })

        
        }
    

    async function handleComplete(){
        console.log('complete checked')
    }

      if (!goal) return <p>Loading...</p>

  return (
    <div>
      <h1>Goal details</h1>
      <button onClick={() => navigate('/goals')}>Back to all goals</button>
      <p>Goal name: {goal.title}</p>
      <p>Description: {goal.description}</p>
      <p>Status: {goal.status}</p>
      <p>Progress: {goal.progress}</p>
      <button onClick={handleDelete}>Delete goal</button>
      <button onClick={() => navigate(`/goals/${goal._id}/edit`)}>Edit</button>

            {goal.tracking ? (

                <div>
                    <p>
                        Target: {goal.tracking.targetAchievement} {goal.unit}
                    </p>

                    <p>
                        Current achievement: {goal.tracking.currentAchievement || 0} {goal.unit}
                    </p>

                    <button onClick={handleDecrease} disabled={goal.tracking.currentAchievement <= 0}>−</button> 
                    <button onClick={handleIncrease} disabled={goal.tracking.currentAchievement >= goal.tracking.targetAchievement}>+</button>

                  {goal.tracking.currentAchievement >= goal.tracking.targetAchievement && (
                      <p>You reached your goal</p>
                  )}
                </div>
            ) : (

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={goal.status === "completed"}
                            onChange={handleComplete}
                        />
                        Mark as completed
                    </label>
                </div>
            )}
        </div>
    )
}
export default GoalDetailsPage
