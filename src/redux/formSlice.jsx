import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('formState');
    if (serializedState === null) return { items: [], currentItem: null };
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [], currentItem: null };
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('formState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

const initialState = loadFromLocalStorage();

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    createItem: (state, action) => {
      state.items.push(action.payload);
      saveToLocalStorage(state);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveToLocalStorage(state);
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocalStorage(state);
    },
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
  },
});

export const { createItem, updateItem, deleteItem, setCurrentItem, clearCurrentItem } = formSlice.actions;
export default formSlice.reducer;
