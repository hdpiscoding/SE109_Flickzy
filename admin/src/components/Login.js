import React, { useState } from "react";
import { LoginAPI } from "../services/AuthService";
import { useNavigate, Outlet } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    const res = await LoginAPI({
      email: "admin@gmail.com",
      password: "admin123",
    });

    localStorage.setItem("token", res.data.token);
    nav("/", { replace: true });
  };
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 24,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Tên đăng nhập</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            required
            placeholder="Nhập tên đăng nhập"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            required
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
