import React, { useState, useEffect } from 'react'
import { getAllDomains } from "../../services/domainService"
import { Link } from "react-router"


function DomainList() {

const [ domains, setDomains ] = useState([])

  async function loadDomains(){
    try{
      const response = await getAllDomains()
      setDomains(response)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    loadDomains()
  },[])
  
  
  return (
    <div>
      <h1>All Domains</h1>
      {domains.map((oneDomain)=>
      <div key={oneDomain._id}>
        <h2>{oneDomain.domainName}</h2>
        <p>{oneDomain.icon}</p>
        <Link to={`/domains/${oneDomain._id}`}>See Details</Link>
      </div>
      )}
    </div>
  )
}

export default DomainList
