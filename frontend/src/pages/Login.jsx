import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [form,setForm]=useState({});
  const nav = useNavigate();

  const submit = async ()=>{
    try{
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    }catch{
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title">🎮 GameApp</div>
        <div className="subtitle">Sign in to continue</div>

        <input placeholder="Username"
          onChange={e=>setForm({...form,username:e.target.value})}/>
        <input type="password" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}/>

        <button className="btn" onClick={submit}>
          Sign In →
        </button>

        <div className="link">
          Don't have an account?{" "}
          <span className="link-highlight" onClick={() => nav("/register")}>
            Create one
          </span>
        </div>
      </div>
    </div>
  );
}