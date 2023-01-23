import { RootState } from '@/common/app/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonModal } from './models/person';

export type IPerson = PersonModal & {
  id: string;
  children: IPerson[];
};
type IPersonSliceState = {
  loading: boolean;
  personList: IPerson[];
};
const initialState: IPersonSliceState = {
  loading: false,
  personList: [],
};

export const fetchPersons = createAsyncThunk('person/fetch', async () => {
  try {
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updatePersons = createAsyncThunk('person/updateList', async (list: IPerson[]) => {
  try {
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const generationSlice = createSlice({
  name: 'generation',
  initialState,
  reducers: {
    setListPerson: (
      state: IPersonSliceState,
      action: PayloadAction<IPerson[]>,
    ) => {
      state.personList = action.payload.map((person) => ({
        ...person,
        id: person._id
      }));
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPersons.pending, (state: IPersonSliceState) => {
      state.loading = true;
    });
    builder.addCase(
      fetchPersons.fulfilled,
      (state: IPersonSliceState, action: PayloadAction<IPerson[]>) => {
        state.loading = false;
        state.personList = action.payload as IPerson[];
      },
    );
    builder.addCase(fetchPersons.rejected, (state: IPersonSliceState) => {
      state.loading = false;
    });

    builder.addCase(updatePersons.pending, (state: IPersonSliceState) => {
      state.loading = true;
    });
    builder.addCase(
      updatePersons.fulfilled,
      (state: IPersonSliceState, action: PayloadAction<IPerson[]>) => {
        state.loading = false;
        state.personList = action.payload as IPerson[];
      },
    );
    builder.addCase(updatePersons.rejected, (state: IPersonSliceState) => {
      state.loading = false;
    });
  },
});

export const { setListPerson } = generationSlice.actions;
export const selectPersonList = (state: RootState) => state.generation.personList;

export default generationSlice.reducer;
