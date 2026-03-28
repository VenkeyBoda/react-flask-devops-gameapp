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
    <div className="container">
      <div className="card">
        <div className="title">Create Account</div>

        <input placeholder="Username"
          onChange={e=>setForm({...form,username:e.target.value})}/>
        <input placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}/>

        <button className="btn">Create Account 🚀</button>
      </div>
    </div>
  );
}