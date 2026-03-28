import { useNavigate } from "react-router-dom";

export default function Dashboard(){
  const nav = useNavigate();

  const logout = ()=>{
    nav("/");
  };

  return (
    <div>

      {/* HEADER */}
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        padding:"10px",
        background:"#2e3fa3"
      }}>
        <h3>🎮 GameApp</h3>
        <button onClick={logout}>Logout</button>
      </div>

      {/* MAIN */}
      <div className="card">
        <h2>Dashboard</h2>
        <p>Select an option</p>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Snake Game</h3>
          <button onClick={()=>nav("/snake")}>Play</button>
        </div>

        <div className="card">
          <h3>Calculator</h3>
          <button onClick={()=>nav("/calculator")}>Open</button>
        </div>
      </div>

    </div>
  );
}
