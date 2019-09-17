import { createStore, combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

const appInitialState = {
  heartBeat: false,
  user: ''
};

const SET_HEART_BEAT = 'SET_HEART_BEAT';
const SET_USER = 'SET_USER';
export const setHeartBeat = createAction(SET_HEART_BEAT);
export const setUser = createAction(SET_USER)

const App = handleActions(
  {
    [SET_HEART_BEAT]: (state, { payload }) => ({
      ...state,
      heartBeat: payload,
    }),
    [SET_USER]: (state, {payload}) => ({
      ...state,
      user: payload
    }),
  },
  appInitialState,
);

const rootReducer = combineReducers({
  App,
});

const configureStore = () => createStore(rootReducer);
export const store = configureStore();
