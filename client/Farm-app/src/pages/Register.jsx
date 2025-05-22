import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(formData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/animals");
    }
  };

  // Styles
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    padding: "0 16px",
  };

  const formStyle = {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    color: "#2d3748",
    marginBottom: "24px",
  };

  const errorStyle = {
    color: "#e53e3e",
    marginBottom: "16px",
    fontWeight: "600",
    textAlign: "center",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "6px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 16px",
    border: "1px solid #cbd5e0",
    borderRadius: "10px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    fontSize: "16px",
    outline: "none",
    marginTop: "4px",
    boxSizing: "border-box",
  };

  const inputFocusStyle = {
    borderColor: "#68d391",
    boxShadow: "0 0 0 3px rgba(72, 187, 120, 0.3)",
  };

  const selectStyle = { ...inputStyle };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "16px",
    color: "white",
    border: "none",
    cursor: loading ? "not-allowed" : "pointer",
    backgroundColor: loading ? "#68d391cc" : "#38a169",
    boxShadow: loading ? "none" : "0 4px 8px rgba(56, 161, 105, 0.4)",
    transition: "all 0.2s ease",
  };

  // For hover effect on button if not loading
  const handleButtonMouseOver = (e) => {
    if (!loading) {
      e.target.style.backgroundColor = "#2f855a";
      e.target.style.transform = "scale(1.05)";
      e.target.style.boxShadow = "0 6px 12px rgba(47, 133, 90, 0.5)";
    }
  };

  const handleButtonMouseOut = (e) => {
    if (!loading) {
      e.target.style.backgroundColor = "#38a169";
      e.target.style.transform = "scale(1)";
      e.target.style.boxShadow = "0 4px 8px rgba(56, 161, 105, 0.4)";
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Register</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="name" style={labelStyle}>
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            value={name}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) =>
              Object.assign(e.target.style, inputFocusStyle)
            }
            onBlur={(e) =>
              Object.assign(e.target.style, inputStyle)
            }
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="email" style={labelStyle}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={email}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) =>
              Object.assign(e.target.style, inputFocusStyle)
            }
            onBlur={(e) =>
              Object.assign(e.target.style, inputStyle)
            }
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="password" style={labelStyle}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            value={password}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) =>
              Object.assign(e.target.style, inputFocusStyle)
            }
            onBlur={(e) =>
              Object.assign(e.target.style, inputStyle)
            }
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label htmlFor="role" style={labelStyle}>
            Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleChange}
            style={selectStyle}
            onFocus={(e) =>
              Object.assign(e.target.style, inputFocusStyle)
            }
            onBlur={(e) =>
              Object.assign(e.target.style, inputStyle)
            }
          >
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
          onMouseOver={handleButtonMouseOver}
          onMouseOut={handleButtonMouseOut}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
