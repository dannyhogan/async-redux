import { createStore, applyMiddleware, compose } from 'redux';

const logger = store => next => action => {
  console.log('logger', action);
  const oldState = store.getState();
  next(action);
  const newState = store.getState();
  if(oldState !== newState) console.log('state changed', newState);
};

const initialState = {};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'test':
      return { ...state, stuff: action.payload };
    default:
      return state;
  }
}

const composeEnhancers = compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger))
);

store.dispatch({ type: 'test', payload: 'action' });
