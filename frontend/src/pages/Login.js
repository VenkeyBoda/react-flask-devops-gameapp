import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [form,setForm]=useState({});
  const nav = useNavigate();

  const submit = async ()=>{
    try{
      await api.post("/login",form);
      nav("/dashboard");
    }catch{
      alert("Invalid login");
    }
  };

  return (
    <div className="card center">
      <h1>🎮 GameApp</h1>
      <input placeholder="Username" onChange={e=>setForm({...form,username:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={submit}>Login</button>
      <p onClick={()=>nav("/register")}>Create Account</p>
    </div>
  );
}