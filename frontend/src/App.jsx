import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Snake from "./pages/Snake";
import Calculator from "./pages/Calculator";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/snake" element={
          <ProtectedRoute><Snake /></ProtectedRoute>
        } />

        <Route path="/calculator" element={
          <ProtectedRoute><Calculator /></ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}