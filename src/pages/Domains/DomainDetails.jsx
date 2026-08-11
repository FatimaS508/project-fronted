import React, { useState, useEffect } from "react";
import { getDomainById, deleteDomain } from "../../services/domainService";
import { getAllGoals, createGoal } from "../../services/goalService";
import { useParams, useNavigate, Link, useLocation } from "react-router";

import { useAuth } from "../../context/AuthContext";

function DomainDetails() {

  const [goals, setGoals] = useState([])
  const [domain, setDomain] = useState(null);
  const [showForm, setShowForm] = useState(false)

  const { user } = useAuth();

  const location = useLocation();
  const domainFromLocation = location?.state?.domain;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      console.log(formData)
      const createdGoal = await createGoal(formData)
      setShowForm(false)
      // navigate('/domains')
    } catch (err) {
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

          <button onClick={() => { //delete all goals
            if (window.confirm("Are you sure you want to delete all goals?")) {
              handleDeleteAllGoals();
            }
          }}>
            Delete All Goals
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={()=>{ showForm ? setShowForm(false) : setShowForm(true)}}>Create new goal</button>

      <form className={`${!showForm ? 'hide': 'show'}`} onSubmit={handleSubmit}>
        <label htmlFor='title'> Name of the goal: </label>
        <input type='text' name='title' id='title' onChange={handleChange} value={formData.title} />

        <label htmlFor='description'> Description: </label>
        <input type='text' name='description' id='description' onChange={handleChange} value={formData.description} />

        <label htmlFor='targetAchievement'> Target achievement (optional): </label>
        <input type='text' name='targetAchievement' id='targetAchievement' onChange={handleChange} value={formData.targetAchievement} placeholder=' e.g. 10 ' />

        <label htmlFor='unit'> Unit (optional): </label>
        <input type='text' name='unit' id='unit' onChange={handleChange} value={formData.unit} placeholder="e.g. books, km, minutes" />

        <label htmlFor='domain'>Area: </label>
        <input type="text" placeholder={domain?.domainName} readOnly />

        <button disabled={sending}>{sending ? 'Creating...' : 'Create goal'}</button>
      </form>


      {goals && goals.map((goal, index) => (
        <div key={goal._id}>
          <h3> Goal {index + 1}: {goal.title}</h3>
          <p>Description: {goal.description}</p>
          <p>Progress: {goal.progress}%</p>
          <p>Status: {goal.status}</p>

          {goal.tracking?.currentAchievement != null &&
            goal.tracking?.targetAchievement != null && (
              <>
                <p>
                  Current achievement: {goal.tracking.currentAchievement}
                </p>

                <p>
                  Target achievement: {goal.tracking.targetAchievement}
                </p>
              </>
            )}
            <Link to={`/goals/${goal._id}`}>Go to goal details</Link>

        </div>
      ))}

      


    </div>
  );
}

export default DomainDetails;
