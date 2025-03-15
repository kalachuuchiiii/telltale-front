import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  notes: [],
  error: false
}

export const fetchAllNotes = createAsyncThunk("fetchAllNotes", async(_, thunkAPI) => {
  try{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-note`);
    
    return res.data;
  }catch(e){
    return thunkAPI.rejectWithValue(e);
    
  }
})

export const fetchAllNotesByReceiver = createAsyncThunk("fetchAllNotesByReceiver", async(getReceiver, thunkAPI) => {
  try{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-notesof/${getReceiver}`);
    console.log(res)
  return res.data
  }catch(e){
    console.log(e);
     return thunkAPI.rejectWithValue(e);
  }
  
})

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllNotes.pending, (state) => {
      state.loading = true
      state.error = false
    })
    builder.addCase(fetchAllNotes.fulfilled, (state, action) => {
      state.notes = action.payload.allNotes;
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchAllNotes.rejected, (state) => {
      
      state.loading = false
      state.error = true
    })
    
    builder.addCase(fetchAllNotesByReceiver.pending, (state) => {
      
      state.loading = true
      state.error = false
    })
    
    builder.addCase(fetchAllNotesByReceiver.fulfilled, (state, action) => {
      state.notes = action.payload.allNotes;
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchAllNotesByReceiver.rejected, (state) => {
      
      state.loading = false
      state.error = true
    })
    
  }
})

export default noteSlice.reducer;
