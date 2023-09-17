import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Createtask() {
  const {id}=useParams();
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate=useNavigate()
  const handelSubmit=async(e)=>{
    e.preventDefault();
    const taskData={description,status,dueDate};
    const response=await fetch(`http://localhost:3000/create/tasks/${id}`,{
      method:"POST",
      body: JSON.stringify(taskData),
      headers: {
        "content-type": "application/json"
      }
    });
    if(response.ok){
      alert("Task Created");
      navigate(`/user/${id}`)
    }else{
      alert("somthing went wrong")
    }
  }
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input type="text" value={description} required placeholder='description' onChange={(e)=>setDescription(e.target.value)} /><br />
        <input type="text" value={status} required placeholder='status' onChange={(e)=>setStatus(e.target.value)} /><br />
        <input type="date" value={dueDate} required placeholder='duedate' onChange={(e)=>setDueDate(e.target.value)} /><br />
        <button>Submit</button>
      </form>
    </div>
  )
}
