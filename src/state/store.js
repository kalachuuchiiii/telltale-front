import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './notesSlice.js';

const store = configureStore({
  reducer: {
    note: noteReducer
  }
})

export default store;