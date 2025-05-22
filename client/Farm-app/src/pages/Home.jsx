import React from "react";
import { Link } from "react-router-dom";

const mockFeatured = [
  {
    id: 1,
    name: "Livers",
    img: "https://images.pexels.com/photos/18606644/pexels-photo-18606644/free-photo-of-meat-and-livers-at-butchery.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Free-Range Goat",
    img: "data:image/jpeg;base64,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",
  },
  {
    id: 3,
    name: "Organic Chicken",
    img: "https://media.istockphoto.com/id/1342480600/photo/free-range-healthy-brown-organic-chickens-and-a-white-rooster-on-a-green-meadow.jpg?b=1&s=612x612&w=0&k=20&c=zqgSOUH7Zry8PcAI7qEfWWhZTuez3CPCjX2iCV064VI=",
  },
  {
    id: 4,
    name: "Sheep Lamb Cuts",
    img: "https://media.istockphoto.com/id/1421188197/photo/merino-sheep-out-in-the-paddock.jpg?b=1&s=612x612&w=0&k=20&c=WrVveTgz3LaYILJh_400Yo3DscOB1qO-PemRtcL8DAU=",
  },
];

const Home = () => {
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9fafb",
    color: "#111827",
  };

  const heroStyle = {
    textAlign: "center",
    padding: "6rem 1rem 4rem",
    background: "linear-gradient(to right, #f0fdf4, #d1fae5)",
  };

  const heroTitle = {
    fontSize: "3.25rem",
    fontWeight: 700,
    color: "#064e3b",
    marginBottom: "1rem",
    lineHeight: 1.2,
  };

  const heroSub = {
    fontSize: "1.25rem",
    color: "#065f46",
    marginBottom: "2rem",
  };

  const heroBtn = {
    display: "inline-block",
    padding: "0.85rem 2.25rem",
    fontSize: "1.05rem",
    fontWeight: "600",
    backgroundColor: "#10b981",
    color: "#fff",
    borderRadius: "0.75rem",
    textDecoration: "none",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  };

  const gridContainer = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "2.5rem",
    padding: "4rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const card = {
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const cardImg = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const cardBody = {
    padding: "1.25rem",
    textAlign: "center",
  };

  const cardTitle = {
    fontSize: "1.15rem",
    fontWeight: 600,
    color: "#065f46",
  };

  const footer = {
    textAlign: "center",
    padding: "1.25rem",
    background: "#e0f2f1",
    borderTop: "1px solid #a7f3d0",
    fontSize: "0.95rem",
    color: "#065f46",
    marginTop: "auto",
  };

  const onCardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.1)";
  };

  const onCardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.05)";
  };

  const onHeroHover = (e) => (e.currentTarget.style.backgroundColor = "#059669");
  const onHeroLeave = (e) => (e.currentTarget.style.backgroundColor = "#10b981");

  return (
    <div style={pageStyle}>
      {/* Hero Section */}
      <section style={heroStyle}>
        <h1 style={heroTitle}>Mohammed Guyo Meat Marketplace</h1>
        <p style={heroSub}>Buy fresh, Halal meat directly from Mohammed — no middlemen.</p>
        <Link
          to="/animals"
          style={heroBtn}
          onMouseEnter={onHeroHover}
          onMouseLeave={onHeroLeave}
        >
          Browse Animals
        </Link>
      </section>

      {/* Featured Products */}
      <section style={gridContainer}>
        {mockFeatured.map((animal) => (
          <div
            key={animal.id}
            style={card}
            onMouseEnter={onCardHover}
            onMouseLeave={onCardLeave}
            onClick={() => (window.location.href = `/animals/${animal.id}`)}
          >
            <img src={animal.img} alt={animal.name} style={cardImg} />
            <div style={cardBody}>
              <div style={cardTitle}>{animal.name}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={footer}>
        Contact: Mohammed &nbsp;|&nbsp; +254&nbsp;710&nbsp;749&nbsp;935
        Gmail: mohammedhassanguyo10@gmail.com
      </footer>
    </div>
  );
};

export default Home;
