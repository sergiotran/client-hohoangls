import { combineReducers } from 'redux';
import personReducer from '@/features/generation-family/generation-slice';

const rootReducer = combineReducers({
   generation: personReducer
});

export default rootReducer;