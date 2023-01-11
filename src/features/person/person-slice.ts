import { RootState } from '@/app/store';
import { IPerson } from '@/models/person';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SortablePerson = IPerson & {
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

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setListPerson: (
      state: IPersonSliceState,
      action: PayloadAction<SortablePerson[]>,
    ) => {
      state.personList = action.payload;
    },
  },
});

export const { setListPerson } = personSlice.actions;
export const selectPersonList = (state: RootState) => state.person.personList;

export default personSlice.reducer;
