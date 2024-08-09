import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import routerReducer from './routerSlice'; 

const store = configureStore({
  reducer: {
    form: formReducer,
    router: routerReducer, 
  },
});

export default store; 
