import React, { useState, useEffect } from "react";
import { getDomainById } from "../../services/domainService";
import { getAllGoals, createGoal, deleteAll, deleteGoal } from "../../services/goalService";
import { useParams, useNavigate, Link, useLocation } from "react-router";

import { useAuth } from "../../context/AuthContext";

function DomainDetails() {

  const [goals, setGoals] = useState([])
  const [domain, setDomain] = useState(null);
  const [showForm, setShowForm] = useState(false)
  //const [loading, setLoading] = useState(true); //this
  const [allGoals, setAllGoals] =useState([]) //for deleting all goals

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

  async function handleDelete(id) { //
    try {
      await deleteGoal(id);
      
      navigate("/domains");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteAllGoals(){
        try{
            const response= await deleteAll()
            setAllGoals([])

        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="domain-details-page">
      <button className="back" onClick={() => navigate(-1)}>
                ← Back
       </button>
      

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
        <p>This domain no longer has any goals</p>
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


      {goals && goals.length > 0 ? (
        <div className="table-container">
          <table className="goals-table">
            <thead>
              <tr>
                <th>Goal Name</th>
                <th>Description</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Achievement</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => (
                <tr key={goal._id}>
                  <td className="goal-title-cell">{goal.title}</td>
                  <td>{goal.description}</td>
                  <td className="progress-cell">{Math.round(goal.progress)}%</td>
                  <td><span className="status-badge">{goal.status}</span></td>
                  <td>
                    {goal.tracking?.currentAchievement != null && goal.tracking?.targetAchievement != null 
                      ? `${goal.tracking.currentAchievement} / ${goal.tracking.targetAchievement}` 
                      : "-"}
                  </td>
                  <td>
                    <Link className="link-btn" to={`/goals/${goal._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
         <p className="empty-goals">No goals yet. Create your first goal!</p>
      )}

      


    </div>
  );
}

export default DomainDetails;
