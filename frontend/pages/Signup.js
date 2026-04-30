import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/firebase';

export default function Signup(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const signup = ()=>{
    createUserWithEmailAndPassword(auth,email,password);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 shadow">
        <h2>Signup</h2>
        <input className="border p-2" onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <input className="border p-2" type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
        <button onClick={signup} className="bg-green-500 text-white p-2">Signup</button>
      </div>
    </div>
  );
}