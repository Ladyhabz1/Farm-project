import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const resultAction = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/animals");
      } else {
        setError(resultAction.payload || "Login failed");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  // Styles
  const containerStyle = {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "24px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
    color: "#2f855a",
  };

  const errorStyle = {
    marginBottom: "16px",
    color: "#e53e3e",
    fontWeight: "600",
    textAlign: "center",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const inputStyle = {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#38a169",
    color: "#fff",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const linkStyle = {
    color: "#38a169",
    textDecoration: "none",
    cursor: "pointer",
  };

  const paragraphStyle = {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Login</h2>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={onSubmit} style={formStyle}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2f855a")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#38a169")}
        >
          Login
        </button>
      </form>
      <p style={paragraphStyle}>
        Don't have an account?{" "}
        <Link
          to="/register"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
