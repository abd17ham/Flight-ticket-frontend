import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departureDate: "",
  originPlace: "",
  destinationPlace: "",
  passengers: 1,
  classValue: "Economy",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setDepartureDate: (state, action) => {
      state.departureDate = action.payload;
    },
    setOriginPlace: (state, action) => {
      state.originPlace = action.payload;
    },
    setDestinationPlace: (state, action) => {
      state.destinationPlace = action.payload;
    },
    setClassValue: (state, action) => {
      state.classValue = action.payload;
    },
    setPassengersCount: (state, action) => {
      state.passengers = action.payload;
    },
  },
});

export const {
  setDepartureDate,
  setDestinationPlace,
  setOriginPlace,
  setClassValue,
  setPassengersCount,
} = filterSlice.actions;
export default filterSlice.reducer;
