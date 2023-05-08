import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "./features/flightSlice";
import filterReducer from "./features/filterSlice";
import seatingReducer from "./features/seatingSlice";

export const store = configureStore({
  reducer: {
    flight: flightReducer,
    filter: filterReducer,
    seating: seatingReducer,
  },
});
