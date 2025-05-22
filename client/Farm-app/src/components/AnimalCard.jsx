const AnimalCard = ({ animal }) => {
  // ... your imports and hooks

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "16px",
    width: "100%",
    maxWidth: "288px", // approx sm:w-72
    boxSizing: "border-box",
  };

  const imgStyle = {
    width: "100%",
    height: "192px", // 48 * 4 (Tailwind 48 = 12rem = 192px)
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "8px",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "4px",
  };

  const breedStyle = {
    color: "#4a5568", // gray-700
    marginBottom: "4px",
  };

  const priceStyle = {
    color: "#2f855a", // green-700
    fontWeight: "700",
    marginBottom: "8px",
  };

  const descriptionStyle = {
    fontSize: "14px",
    color: "#a0aec0", // gray-500
    marginBottom: "8px",
  };

  const buttonBaseStyle = {
    color: "white",
    padding: "8px 12px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
    fontSize: "14px",
    transition: "background-color 0.2s ease",
  };

  const addToCartBtnStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#38a169", // green-600
  };

  const addToCartBtnHoverStyle = {
    backgroundColor: "#2f855a", // green-700
  };

  const editBtnStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#4299e1", // blue-500
    flex: 1,
  };

  const editBtnHoverStyle = {
    backgroundColor: "#3182ce", // blue-600
  };

  const deleteBtnStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#f56565", // red-500
    flex: 1,
  };

  const deleteBtnHoverStyle = {
    backgroundColor: "#e53e3e", // red-600
  };

  // You can also add hover handlers similarly if you want

  return (
    <div style={cardStyle}>
      <img src={animal.image_url} alt={animal.name} style={imgStyle} />
      <h2 style={titleStyle}>{animal.name}</h2>
      <p style={breedStyle}>{animal.breed}</p>
      <p style={priceStyle}>${animal.price}</p>
      <p style={descriptionStyle}>{animal.description}</p>

      {user?.role === "user" && (
        <button
          onClick={handleAddToCart}
          style={addToCartBtnStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = addToCartBtnHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = addToCartBtnStyle.backgroundColor)}
        >
          Add to Cart
        </button>
      )}

      {user?.role === "farmer" && (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleEdit}
            style={editBtnStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = editBtnHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = editBtnStyle.backgroundColor)}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            style={deleteBtnStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = deleteBtnHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = deleteBtnStyle.backgroundColor)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AnimalCard