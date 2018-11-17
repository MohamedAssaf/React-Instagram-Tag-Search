import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './MainReducer';

export default function configureStore(initialState) {
  const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));

  if (module.hot) {
    module.hot.accept( () => {
      const nextRootReducer = require('./MainReducer').default;
      store.replaceReducer(nextRootReducer)
    });
  }
  return store;
}