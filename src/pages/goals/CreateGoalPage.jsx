import React, { useState ,useEffect} from 'react'
import { createGoal } from '../../services/goalService'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router';
import { getDomainById } from '../../services/domainService';

function CreateGoalPage(){
  const [domain, setDomain] = useState(null);
  const { id } = useParams();
  const [formData, setFormData]= useState({
    title: "",
    description: "",
    targetAchievement: "",
    unit: "",
    domain: id
  })

  const [error, setError] = useState(false)
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event){
     event.preventDefault()
     try{
      setSending(true)
      console.log(formData)
      const createdGoal= await createGoal(formData)
      navigate('/goals/'+createdGoal._id)

     }catch(err){
      setError(err.response.data.message)
      setSending(false)
     }
  }

  useEffect(() => {
    async function loadDomain() {
      const response = await getDomainById(id);

      setDomain(response);
    }

    loadDomain();
  }, [id]);
  return (
    <div>
      <button onClick={() => navigate('/goals')}>Back to all goals</button>
      <h1>Create new goal</h1>
      <p className="error">{error}</p>

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
    </div>
  )
}

export default CreateGoalPage