import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAnimal } from "../features/animals/animalSlice";
import { useNavigate } from "react-router-dom";

const AddAnimal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    price: "",
    description: "",
    image_url: "",
  });

  const [error, setError] = useState(null);

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.name || !formData.price) {
      setError("Name and Price are required");
      return;
    }
    try {
      const resultAction = await dispatch(addAnimal(formData));
      if (addAnimal.fulfilled.match(resultAction)) {
        navigate("/animals");
      } else {
        setError(resultAction.payload || "Failed to add animal");
      }
    } catch (err) {
      setError("Failed to add animal");
    }
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "4rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const titleStyle = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#1f2937",
  };

  const inputStyle = {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "1rem",
  };

  const textareaStyle = {
    ...inputStyle,
    resize: "vertical",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const errorStyle = {
    color: "red",
    marginBottom: "1rem",
    fontWeight: "600",
    textAlign: "center",
  };

  const buttonStyle = {
    backgroundColor: "#16a34a",
    color: "#fff",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#15803d";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#16a34a";
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Add New Animal</h2>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={onSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={onChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={onChange}
          style={inputStyle}
        />
        <input
          type="number"
          name="age"
          placeholder="Age (years)"
          value={formData.age}
          onChange={onChange}
          min={0}
          style={inputStyle}
        />
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={formData.price}
          onChange={onChange}
          required
          min={0}
          style={inputStyle}
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={onChange}
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={onChange}
          rows={4}
          style={textareaStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Add Animal
        </button>
      </form>
    </div>
  );
};

export default AddAnimal;
