
import { configureStore } from '@reduxjs/toolkit';
import BoardSlice from "../slice/BoardSlice" 

export const store = configureStore({
  reducer: {
    boards: BoardSlice,  
  },
});
