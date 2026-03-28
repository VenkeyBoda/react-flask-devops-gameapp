import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [form,setForm]=useState({
    username: "",
    email: "",
    password: ""
  });

  const nav = useNavigate();

  const submit = async ()=>{
    console.log("Sending:", form);

    try {
      const res = await api.post("/register", {
        username: form.username,
        email: form.email,
        password: form.password
      });

      console.log("Response:", res.data);

      alert("Registered successfully");
      nav("/");
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="card center">
      <h2>Register</h2>

      <input 
        placeholder="Username"
        value={form.username}
        onChange={e=>setForm({...form,username:e.target.value})}
      />

      <input 
        placeholder="Email"
        value={form.email}
        onChange={e=>setForm({...form,email:e.target.value})}
      />

      <input 
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e=>setForm({...form,password:e.target.value})}
      />

      <button onClick={submit}>Create</button>
    </div>
  );
}