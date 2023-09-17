import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { Routes, Route } from 'react-router-dom';
import User from './User';
import Createtask from './Createtask';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} /> {/* Use component prop */}
    <Route path="/user/:id" element={<User />} /> {/* Use component prop */}
    <Route path="/createtask/:id" element={<Createtask />} /> {/* Use component prop */}
  </Routes>
  );
}

export default App;
