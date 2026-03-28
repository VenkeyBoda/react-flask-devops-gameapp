import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [form,setForm]=useState({});
  const nav = useNavigate();

  const submit = async ()=>{
    await api.post("/register",form);
    nav("/");
  };

  return (
    <div className="card center">
      <h1>Register</h1>
      <input placeholder="Username" onChange={e=>setForm({...form,username:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={submit}>Create</button>
    </div>
  );
}