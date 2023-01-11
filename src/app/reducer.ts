import { combineReducers } from 'redux';
import personReducer from '@/features/person/person-slice';

const rootReducer = combineReducers({
   person: personReducer
});

export default rootReducer;