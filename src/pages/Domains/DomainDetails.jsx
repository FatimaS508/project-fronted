import React, { useState, useEffect } from 'react'
import { getDomainById, deleteDomain } from "../../services/domainService"
import { useParams, useNavigate, Link, useLocation } from "react-router"

import { useAuth } from "../../context/AuthContext"

function DomainDetails() {

const [ domain, setDomain ] = useState(null)

 

  const { user } = useAuth()

  const location = useLocation()
  const domainFromLocation = location?.state?.domain
  const {id} = useParams()
  const navigate = useNavigate()


  async function loadDomain(){
    try{
      const response = await getDomainById(id)
      setDomain(response)
    }catch(err){
      console.log(err)
    }
  }

  

  useEffect(()=>{
    loadDomain()
  },[])


  async function handleDelete(){
    try{
      await deleteDomain(id)
      navigate('/domains')
    }catch(err){
      console.log(err)
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
      ) : <p>Loading...</p>}
    </div>
  )
}

export default DomainDetails
