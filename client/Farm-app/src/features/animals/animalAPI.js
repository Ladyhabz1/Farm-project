// src/features/animals/animalAPI.js

const API_URL = 'http://localhost:5000/api/animals'; // Change to your backend URL

export async function fetchAnimals() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch animals');
  return response.json();
}

export async function fetchAnimalById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch animal');
  return response.json();
}

export async function addAnimal(animalData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animalData),
  });
  if (!response.ok) throw new Error('Failed to add animal');
  return response.json();
}

export async function updateAnimal(id, animalData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animalData),
  });
  if (!response.ok) throw new Error('Failed to update animal');
  return response.json();
}

export async function deleteAnimal(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete animal');
  return;
}
