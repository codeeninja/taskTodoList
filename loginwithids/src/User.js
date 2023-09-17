import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function User() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [udescription, setUDescription] = useState(''); // Add state for update form
  const [ustatus, setUStatus] = useState('');
  const [udueDate, setUDueDate] = useState('');
  const [taskIdToUpdate, setTaskIdToUpdate] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/get/task/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.log("Error in Fetching data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleCreateTask = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

const handleUpdate=(taskid)=>{
  setTaskIdToUpdate(taskid)
  const selectedId=tasks.find((task)=>task.id===taskid)
  setUDescription(selectedId.description);
  setUStatus(selectedId.status);
  setDueDate(selectedId.dueDate)

  setShowUpdateForm(true);
}

  const handelUpdateTask = async () => {
    const taskData = { description: udescription, status: ustatus, dueDate: udueDate, userId: id };
    const response = await fetch(`http://localhost:3000/update/tasks/${taskIdToUpdate}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
      headers: {
        "content-type": "application/json"
      }
    });
    if (response.ok) {
      alert("Task updated successfully");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };

  const handleDelete = async (taskid) => {
    const deletetask = await fetch(`http://localhost:3000/delete/tasks/${taskid}`, {
      method: "DELETE"
    });
    if (deletetask.ok) {
      alert("Task Deleted Successfully");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };

  const handelTask = async () => {
    const taskData = { description, status, dueDate, userId: id };
    const response = await fetch(`http://localhost:3000/create/tasks/${id}`, {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        "content-type": "application/json"
      }
    });
    if (response.ok) {
      alert("Task created");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };

  const handelUpdateClick=()=>{
    navigate(`/createtask/${id}`)
  }
  return (
    <div>
      <h1>User Tasks</h1>
      <button onClick={handleCreateTask}>Create Task</button>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
                <button onClick={() => handleUpdate(task.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handlePopupClose}>
              &times;
            </span>
            <h2>Create Task</h2>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <input
              type="date"
              placeholder="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <button onClick={handelTask}>Submit</button>
          </div>
        </div>
      )}

      {showUpdateForm && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowUpdateForm(false)}>
              &times;
            </span>
            <h2>Update Task</h2>
            <input
              type="text"
              placeholder="Description"
              value={udescription}
              onChange={(e) => setUDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Status"
              value={ustatus}
              onChange={(e) => setUStatus(e.target.value)}
            />
            <input
              type="date"
              placeholder="Due Date"
              value={udueDate}
              onChange={(e) => setUDueDate(e.target.value)}
            />
            <button onClick={handelUpdateTask}>Submit</button>
          </div>
        </div>
      )}
      <button onClick={handelUpdateClick}> go to Create task</button>
    </div>
  );
}
