import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PersonModal } from "@/features/person/models/person";
import * as personAPI from '@/features/person/apis';

type PersonSliceState = {
  isLoading: boolean;
  persons: PersonModal[]
}
const initialState: PersonSliceState = {
  isLoading: false,
  persons: []
};

export const fetchPersons = createAsyncThunk('persons/fetch', async (_args, thunk) => {
  try {
    const persons = await personAPI.findAll();
    return persons.data;
  } catch (error) {
    thunk.rejectWithValue(error);
  }
});

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPersons.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchPersons.fulfilled, (state) => {
      state.isLoading = false;
    });
  }
});

export default personSlice.reducer;