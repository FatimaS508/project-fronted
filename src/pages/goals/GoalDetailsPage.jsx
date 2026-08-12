import React from 'react'
import { useState, useEffect } from 'react'
import { deleteGoal, getOneGoal, updateGoal } from '../../services/goalService'
import { useParams, useNavigate, Link } from "react-router";



function GoalDetailsPage() {

    const [goal, setGoal] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const { id } = useParams();
   
    const navigate = useNavigate();

    useEffect(() => {
        async function LoadGoal() {
            try {
                setLoading(true)
                setError(null)
                const response = await getOneGoal(id)
                console.log(response)
                setGoal(response)
            } catch (err) {
                setError(err.response.data.message);
            } finally {
                setLoading(false);
            }
        }
        LoadGoal()
    }, [])

    const isMeasurable =
        goal?.tracking?.unit &&
        goal?.tracking?.targetAchievement > 0; 

    let status;
    let progress;
    let completed = false;

    if (isMeasurable) {
        const current = goal.tracking.currentAchievement || 0;
        const target = goal.tracking.targetAchievement;

        progress = Math.min((current / target) * 100, 100); //we use min to take min and not aboving 100

        if (current === 0) {
            status = "Not Started";
        } else if (current >= target) {
            status = "Completed";
        } else {
            status = "In Progress";
        }


        completed = current >= target;
    } else {
        status = goal?.status || "Not Started";
        progress = goal?.progress || 0;
    }


    async function handleDelete() { 
        try {
            await deleteGoal(id);
            navigate('/dashboard')
        } catch (err) {
            console.log(err);
        }
    }
    async function handleIncrease() {
        console.log('increase clicked')
        setTimeout(async() => {
            const newCurrent = goal.tracking.currentAchievement + 1;

        const progress = (newCurrent / goal.tracking.targetAchievement) * 100;

        const status =
            newCurrent >= goal.tracking.targetAchievement
                ? "Completed"
                : "In Progress";

        await updateGoal(id, {
            tracking: {
                ...goal.tracking,
                currentAchievement: newCurrent
            },
            progress,
            status
        });

        setGoal({
            ...goal,
            tracking: {
                ...goal.tracking,
                currentAchievement: newCurrent
            },
            progress,
            status
        });
        }, 500); 
    }
    async function handleDecrease() {
        setTimeout(async() => {
        console.log('decrease checked')
        const newCurrent = Math.max(
            0,
            goal.tracking.currentAchievement - 1
        );

        const progress =
            (newCurrent / goal.tracking.targetAchievement) * 100;

        const status =
            newCurrent >= goal.tracking.targetAchievement
                ? "Completed"
                : newCurrent > 0
                    ? "In Progress"
                    : "Not Started";

        await updateGoal(id, {
            tracking: {
                ...goal.tracking,
                currentAchievement: newCurrent
            },
            progress,
            status
        });

        setGoal({
            ...goal,
            tracking: {
                ...goal.tracking,
                currentAchievement: newCurrent
            },
            progress,
            status
        });}, 500);
    }

    async function handleComplete(event) {
        console.log('complete checked')
        try {
            const completed = event.target.checked;

            const status = completed ? "Completed" : "Not Started";
            const progress = completed ? 100 : 0;

            await updateGoal(id, {
                status,
                progress
            });

            setGoal({
                ...goal,
                status,
                progress
            });

        } catch (err) {
            console.log(err);
        }
    }

    if (!goal) return <p>Loading...</p>


    return (
        <div className="goal-details-page">
            <h1>Goal details</h1>
            <button className="back" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <p>Goal name: {goal.title}</p>
            <p>Description: {goal.description}</p>
            <p>Status: {status}</p>
            <p>Progress: {progress}%</p>

            {isMeasurable ? ( 

                <div>
                    <p>
                        Target: {goal.tracking.targetAchievement} {goal.tracking.unit}
                    </p>

                    <p>
                        Current achievement: {goal.tracking.currentAchievement || 0} {goal.tracking.unit}
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
                            checked={goal.status === "Completed"}
                            onChange={handleComplete}
                        />
                        Mark as completed
                    </label>
                </div>
            )}
            
                <button onClick={handleDelete}>Delete</button>
            
            <button onClick={() => navigate(`/goals/${goal._id}/edit`)}>Edit</button>
        </div>
    )
}
export default GoalDetailsPage