import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnimals } from "../features/animals/animalSlice";
import AnimalCard from "../components/AnimalCard";

const Animals = () => {
  const dispatch = useDispatch();
  const { animals, loading, error } = useSelector((state) => state.animals);

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  const containerStyle = {
    maxWidth: "1200px",
    margin: "3rem auto",
    padding: "0 1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "2rem",
    textAlign: "center",
    color: "#2c3e50",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2rem",
  };

  const loadingStyle = {
    textAlign: "center",
    marginTop: "4rem",
    fontSize: "1.2rem",
    color: "#2980b9",
  };

  const errorStyle = {
    textAlign: "center",
    marginTop: "4rem",
    fontSize: "1.2rem",
    color: "#e74c3c",
  };

  const emptyStyle = {
    gridColumn: "1 / -1",
    textAlign: "center",
    fontSize: "1.1rem",
    color: "#7f8c8d",
  };

  if (loading) return <div style={loadingStyle}>Loading animals...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Available Animals</h1>
      <div style={gridStyle}>
        {animals.length > 0 ? (
          animals.map((animal) => <AnimalCard key={animal.id} animal={animal} />)
        ) : (
          <p style={emptyStyle}>No animals found.</p>
        )}
      </div>
    </div>
  );
};

export default Animals;
