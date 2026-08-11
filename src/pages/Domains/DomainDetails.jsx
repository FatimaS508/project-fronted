import React, { useState, useEffect } from "react";
import { getDomainById, deleteDomain } from "../../services/domainService";
import { getAllGoals, createGoal } from "../../services/goalService";
import { useParams, useNavigate, Link, useLocation } from "react-router";

import { useAuth } from "../../context/AuthContext";

function DomainDetails() {

  const [goals, setGoals] = useState([])
  const [domain, setDomain] = useState(null);
  
  const { user } = useAuth();
  
  const location = useLocation();
  const domainFromLocation = location?.state?.domain;
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData]= useState({
    title: "",
    description: "",
    targetAchievement: "",
    unit: "",
    domain: id
  })

    const [sending, setSending] = useState(false)
  

    function handleChange(event) {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  
    async function handleSubmit(event){
       event.preventDefault()
       try{
        console.log(formData)
        const createdGoal= await createGoal(formData)
        navigate('/domains')
       }catch(err){
        setError(err.response.data.message)
       }
    }

  async function loadDomain() {
    try {
      const response = await getDomainById(id);
      setDomain(response.domain);
      setGoals(response.goals);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadDomain();
  }, []);

  async function handleDelete() {
    try {
      await deleteDomain(id);
      navigate("/domains");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {domain ? (
        <>
          <h2>{domain.domainName}</h2>
          <p>{domain.description}</p>
          <p>{domain.icon}</p>

          <Link to={`/domains/${domain._id}/edit`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>Loading...</p>
      )}


      {goals.map(goal => (
       <div key={goal._id}>
       <h3>{goal.title}</h3>
       <p>{goal.description}</p>
       <p>Progress: {goal.progress}%</p>
       </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label htmlFor='title'> Name of the goal: </label>
        <input type='text' name='title' id='title' onChange={handleChange} value={formData.title}/>

        <label htmlFor='description'> Description: </label>
        <input type='text' name='description' id='description' onChange={handleChange} value={formData.description}/>

        <label htmlFor='targetAchievement'> Target achievement (optional): </label>
        <input type='text' name='targetAchievement' id='targetAchievement' onChange={handleChange} value={formData.targetAchievement} placeholder=' e.g. 10 '/>

         <label htmlFor='unit'> Unit (optional): </label>
        <input type='text' name='unit' id='unit' onChange={handleChange} value={formData.unit} placeholder="e.g. books, km, minutes"/>
  
        <button disabled={sending}>{sending ? 'Creating...' : 'Create goal'}</button>
      </form>


      <table>
        <thead>
          <th>name</th>
          <th>progress</th>
        </thead>

        <tbody>
          <td>Something</td>
          <td>10%</td>
        </tbody>
      </table>
    </div>
  );
}

export default DomainDetails;
