import { useNavigate } from "react-router-dom";

export default function Dashboard(){
  const nav = useNavigate();

  return (
    <div>
      <h2>Dashboard</h2>

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