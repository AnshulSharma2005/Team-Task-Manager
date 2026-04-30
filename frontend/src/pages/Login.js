import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();

  const login = ()=>{
    signInWithEmailAndPassword(auth,email,password)
    .then(()=> nav('/dashboard'));
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-4">Login</h2>
        <input className="border p-2 mb-2 w-full" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input className="border p-2 mb-2 w-full" placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={login} className="bg-blue-500 text-white w-full p-2">Login</button>
      </div>
    </div>
  );
}
