// src/features/animals/animalSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as animalAPI from './animalAPI';

// Thunks
export const fetchAnimals = createAsyncThunk('animals/fetchAnimals', async () => {
  const response = await animalAPI.fetchAnimals();
  return response;
});

export const fetchAnimalById = createAsyncThunk('animals/fetchAnimalById', async (id) => {
  const response = await animalAPI.fetchAnimalById(id);
  return response;
});

export const addAnimal = createAsyncThunk('animals/addAnimal', async (animalData) => {
  const response = await animalAPI.addAnimal(animalData);
  return response;
});

export const updateAnimal = createAsyncThunk('animals/updateAnimal', async ({ id, animalData }) => {
  const response = await animalAPI.updateAnimal(id, animalData);
  return response;
});

export const deleteAnimal = createAsyncThunk('animals/deleteAnimal', async (id) => {
  await animalAPI.deleteAnimal(id);
  return id;
});

const animalSlice = createSlice({
  name: 'animals',
  initialState: {
    animals: [],
    animal: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.animals = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchAnimalById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnimalById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.animal = action.payload;
      })
      .addCase(fetchAnimalById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addAnimal.fulfilled, (state, action) => {
        state.animals.push(action.payload);
      })

      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.animals.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.animals[index] = action.payload;
        }
      })

      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.filter(a => a.id !== action.payload);
      });
  },
});

export default animalSlice.reducer;
