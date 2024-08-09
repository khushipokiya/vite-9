import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import routerReducer from './routerSlice'; // if you have a router slice

const store = configureStore({
  reducer: {
    form: formReducer,
    router: routerReducer, // if you have a router slice
  },
});

export default store; // Ensure default export
