// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const nav = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        nav("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/profile", {
          headers: { Authorization: token },
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.msg);
        } else {
          alert(data.error || "Unauthorized");
          nav("/login");
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
        nav("/login");
      }
    };

    fetchProfile();
  }, [nav]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;