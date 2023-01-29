import personSlice from '@/features/person/person-slice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
   person: personSlice 
});

export default rootReducer;