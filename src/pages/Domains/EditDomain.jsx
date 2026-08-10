import {useState, useEffect} from 'react'
import { getDomainById } from '../../services/domainService'
import { useParams, useNavigate } from 'react-router'
import { updateDomain } from '../../services/domainService'

function EditDomain() {
   const [ formData, setFormData ] = useState({
      domainName: '',
      description: '',
      icon: ''
    })
  const {id} = useParams()
  const navigate = useNavigate()


  async function loadDomain(){
  try{
    const response = await getDomainById(id)
    setFormData({
      domainName: response.domainName || '',
      description: response.description || '',
      icon: response.icon || ''
    })
  }catch(err){
    console.log(err)
  }
}
  
  function handleChange(event){
    setFormData({...formData,[event.target.name]:event.target.value})
  }
  
  async function handleSubmit(event){
    event.preventDefault()
    if(!formData.domainName){
      console.log("ERROR PLEASE FILL IN DOMAIN NAME")
      return
    }
    const updatedDomain = await updateDomain(id, formData)
    navigate(`/domains/${updatedDomain._id}`)
  }
  
  useEffect(()=>{
    loadDomain()
  },[])

  return (
    <div>
      <h1>Edit Domain</h1>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="domainName">Domain Name</label>
        <input 
        type="text" 
        name="domainName"
        id="domainName"
        onChange={handleChange}
        value={formData.domainName}
        />

        <label htmlFor="description">Description:</label>
        <input 
        type="text" 
        name="description"
        id="description"
        onChange={handleChange}
        value={formData.description}
        />

        <label htmlFor="icon">Icon:</label>
        <input 
        type="text" 
        name="icon"
        id="icon"
        onChange={handleChange}
        value={formData.icon}
        />

        <button>Edit</button>
        
      </form>
    </div>
  )
}

export default EditDomain