import { useState } from "react"
import { createDomain } from "../../services/domainService"
import { useNavigate } from "react-router";


function CreateDomain() {
  const [ formData, setFormData ] = useState({
    domainName: '',
    description: '',
    icon: ''
  })
  const navigate = useNavigate()

  function handleChange(event){
    setFormData({...formData, [event.target.name]:event.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault()
    if(!formData.domainName){
      console.log("ERROR PLEASE FILL IN DOMAIN NAME")
      return
    }
    const createdDomain = await createDomain(formData)
    navigate(`/domains/${createdDomain._id}`)
  }

  return (
    <div>
      <h1>Create Domain</h1>
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

        <button>Create</button>
        
      </form>
    </div>
  )
}

export default CreateDomain