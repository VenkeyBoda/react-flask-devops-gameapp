import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div className="dashboard">
      <div className="header">
        <b>🎮 GameApp</b>
        <span style={{cursor:"pointer"}} onClick={logout}>
          Logout
        </span>
      </div>

      <div className="welcome">
        <h2>Welcome back 👋</h2>
        <p>Select an option below</p>
      </div>

      <div className="grid">
        <div className="feature">
          <h3>🐍 Snake Game</h3>
          <button className="btn" onClick={()=>nav("/snake")}>
            Play →
          </button>
        </div>

        <div className="feature">
          <h3>🧮 Calculator</h3>
          <button className="btn" onClick={()=>nav("/calculator")}>
            Open →
          </button>
        </div>
      </div>
    </div>
  );
}