import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAnimal, fetchAnimalById } from "../features/animals/animalSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditAnimal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const animal = useSelector((state) =>
    state.animals.animals.find((a) => a.id === parseInt(id))
  );

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    price: "",
    description: "",
    image_url: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (animal) {
      setFormData({
        name: animal.name || "",
        breed: animal.breed || "",
        age: animal.age || "",
        price: animal.price || "",
        description: animal.description || "",
        image_url: animal.image_url || "",
      });
    } else {
      dispatch(fetchAnimalById(id));
    }
  }, [animal, dispatch, id]);

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const resultAction = await dispatch(updateAnimal({ id, ...formData }));
      if (updateAnimal.fulfilled.match(resultAction)) {
        navigate("/animals");
      } else {
        setError(resultAction.payload || "Failed to update animal");
      }
    } catch (err) {
      setError("Failed to update animal");
    }
  };

  // Styles
  const containerStyle = {
    maxWidth: "600px",
    margin: "80px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "24px",
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

  const textareaStyle = {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    resize: "vertical",
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

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#2f855a",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Edit Animal</h2>
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
          style={inputStyle}
          min={0}
        />
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={formData.price}
          onChange={onChange}
          required
          style={inputStyle}
          min={0}
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
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2f855a")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#38a169")}
        >
          Update Animal
        </button>
      </form>
    </div>
  );
};

export default EditAnimal;
