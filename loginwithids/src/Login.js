import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate=useNavigate();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
const[id,setId]=useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

 
      const response = await fetch('http://localhost:3000/auth/login', {
        method: "POST",
        body: JSON.stringify({ username, password }), // Pass an object with username and password.
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
    
      console.log(response)
      if (response.ok) {
        const data = await response.json(); // Assuming the server sends user data including the ID upon successful login
        setId(data.id); // Store the user ID in state
        console.log(data.id)
        alert("Login successful");
        navigate(`/user/${data.id}`)
      } else {
        alert("Login unsuccessful");
      }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' value={username} onChange={e => setusername(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={e => setpassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
