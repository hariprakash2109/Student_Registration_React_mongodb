import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    city: '',
    district: '',
    hobbies: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get('http://localhost:3000/users')
      .then(res => setUsers(res.data));
  };
const handleChange = (e)=>{
  const {name,value}=e.target;
  setUserForm(prev=>({...prev,[name]:value}));
};
const submitForm =(e)=>{
  e.preventDefault();
  if(editMode){
    axios.put(`http://localhost:3000/users/${editId}`,userForm).then(()=>{getUsers(); resetForm();});
  }
  else{
    axios.post('http://localhost:3000/users',userForm).then(()=>{getUsers(); resetForm();});
  }
};
const editUser = (user)=>{
  setEditMode(true);
  setEditId(user._id);
  setUserForm({
    name:user.name,
    email:user.email,
    phone:user.phone
  });
};
const deleteUser=(id)=>{
  axios.delete(`http://localhost:3000/users/${id}`).then(()=>getUsers());
};
const resetForm = (user)=>{
  setEditMode(false);
  setEditId('');
  setUserForm({
    name:'',
    email:'',
    phone:''
  });
};
return(
  <div>
    <h2>App</h2>
    <form onSubmit={submitForm}>
      <input type="text" name='name' value={userForm.name} onChange={handleChange} placeholder='name'/>
      <input type="email" name='email' value={userForm.email} onChange={handleChange} placeholder='email'/>
      <input type="text" name='phone' value={userForm.phone} onChange={handleChange} placeholder='phone'/>
      <button type="submit">{editMode?'update':'add'}User</button>
      {editMode&&<button type='button' onClick={resetForm}>Cancel</button>}
    </form>
    <ul>
      {users.map(user=>(
        <li key={user._id}>
          <div>
            <h3>Name: </h3><strong>{user.name}</strong><br />
            <h3>Email: </h3><strong>{user.email}</strong><br />
            <h3>Phone: </h3><strong>{user.phone}</strong><br />
          </div>
          <div>
            <button onClick={()=>editUser(user)}>Edit</button>
            <button onClick={()=>deleteUser(user._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}
export default App;