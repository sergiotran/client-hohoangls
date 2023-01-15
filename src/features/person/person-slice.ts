import { RootState } from '@/app/store';
import { IPerson } from '@/models/person';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPersons, updateListPerson } from './person-api';

export type SortablePerson = IPerson & {
  id: string;
  children: SortablePerson[];
};
type IPersonSliceState = {
  loading: boolean;
  personList: SortablePerson[];
};
const initialState: IPersonSliceState = {
  loading: false,
  personList: [],
};

export const fetchPersons = createAsyncThunk('person/fetch', async () => {
  try {
    const persons = await getPersons();
    return persons;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updatePersons = createAsyncThunk('person/updateList', async (list: IPerson[]) => {
  try {
    const persons = await updateListPerson(list);
    return persons;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setListPerson: (
      state: IPersonSliceState,
      action: PayloadAction<SortablePerson[]>,
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
      (state: IPersonSliceState, action: PayloadAction<SortablePerson[]>) => {
        state.loading = false;
        state.personList = action.payload as SortablePerson[];
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
      (state: IPersonSliceState, action: PayloadAction<SortablePerson[]>) => {
        state.loading = false;
        state.personList = action.payload as SortablePerson[];
      },
    );
    builder.addCase(updatePersons.rejected, (state: IPersonSliceState) => {
      state.loading = false;
    });
  },
});

export const { setListPerson } = personSlice.actions;
export const selectPersonList = (state: RootState) => state.person.personList;

export default personSlice.reducer;
