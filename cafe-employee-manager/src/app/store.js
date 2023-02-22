import { configureStore } from '@reduxjs/toolkit';
import cafeReducer from '../features/cafe/cafeSlice';
import employeeReducer from '../features/employee/employeeSlice';

export default configureStore({
  reducer: {
    cafe: cafeReducer,
    employee: employeeReducer,
  },
})