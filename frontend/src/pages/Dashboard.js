import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard(){
  const [tasks,setTasks] = useState([]);
  const [title,setTitle] = useState('');

  const fetchTasks = ()=>{
    axios.get('http://localhost:5000/api/tasks')
    .then(res=> setTasks(res.data));
  }

  useEffect(fetchTasks,[]);

  const addTask = ()=>{
    axios.post('http://localhost:5000/api/tasks',{title})
    .then(()=>{ setTitle(''); fetchTasks(); });
  }

  const updateStatus = (id,status)=>{
    axios.put(`http://localhost:5000/api/tasks/${id}`,{status})
    .then(fetchTasks);
  }

  const completed = tasks.filter(t=>t.status==='Completed').length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-200 p-4 rounded">Total: {tasks.length}</div>
        <div className="bg-green-200 p-4 rounded">Done: {completed}</div>
        <div className="bg-yellow-200 p-4 rounded">Pending: {tasks.length - completed}</div>
      </div>

      <div className="flex gap-2 mb-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} className="p-2 border" placeholder="Task"/>
        <button onClick={addTask} className="bg-blue-500 text-white px-4">Add</button>
      </div>

      {tasks.map(t=>(
        <div key={t._id} className="bg-white p-4 mb-2 shadow rounded">
          <h3>{t.title}</h3>
          <p>{t.status}</p>
          <button onClick={()=>updateStatus(t._id,'Completed')} className="bg-green-500 text-white px-2">Done</button>
        </div>
      ))}
    </div>
  );
}