import React from 'react'
import {  getOneGoal, updateGoal } from '../../services/goalService'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";


function EditGoalPage() {
    const [formData, setFormData]= useState({
      title: "",
      description: "",
      targetAchievement: "",
      unit: ""
    })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  async function loadGoal() {
    try {
      setLoading(true);
      setError(false);
      const response = await getOneGoal(id)
      setFormData(response)

    } catch (err) {
      setError(err.response.data.message);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGoal()
  }, []);

  async function handleSubmit(event){
     event.preventDefault()
     try{
      setSending(true)
      const updatedGoal= await updateGoal(id, formData)
      navigate('/goals/'+updatedGoal._id)

     }catch(err){
      console.log(err)
      // setError(err.response.data.message)
      setSending(false)
     }
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }


  return (
    <div className="edit-goal-page">
    <button className="back" onClick={() => navigate(-1)}>
    ← Back
    </button>
      <form onSubmit={handleSubmit}>

      <h1>update goal</h1>

      <p className="error">{error}</p>

        <label htmlFor='title'> Name of the goal: </label>
        <input type='text' name='title' id='title' onChange={handleChange} value={formData.title}/>

        <label htmlFor='description'> Description: </label>
        <input type='text' name='description' id='description' onChange={handleChange} value={formData.description}/>

        <label htmlFor='targetAchievement'> Target achievement (optional): </label>
        <input type='text' name='targetAchievement' id='targetAchievement' onChange={handleChange} value={formData.targetAchievement} placeholder=' e.g. 10 '/>

         <label htmlFor='unit'> Unit (optional): </label>
        <input type='text' name='unit' id='unit' onChange={handleChange} value={formData.unit} placeholder="e.g. books, km, minutes"/>
        



        <button disabled={sending}>{sending ? 'Updating...' : 'Update goal'}</button>
      </form>
    </div>
  )
}

export default EditGoalPage