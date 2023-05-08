import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  premiumCount: 0,
  economyCount: 0,
  firstClassCount: 0,
  premiumPrice: 0,
  economyPrice: 0,
  firstClassPrice: 0,

  seats: [],
  bookedSeats: {},
};

export const seatingSlice = createSlice({
  name: "seating",
  initialState,
  reducers: {
    setSeats: (state, action) => {
      state.seats = action.payload;
    },
    setBookedSeats: (state, action) => {
      state.bookedSeats = action.payload;
    },
    setPremiumCount: (state, action) => {
      state.premiumCount = action.payload;
    },
    setEconomyCount: (state, action) => {
      state.economyCount = action.payload;
    },
    setFirstClassCount: (state, action) => {
      state.firstClassCount = action.payload;
    },
    setPremiumPrice: (state, action) => {
      state.premiumPrice = action.payload;
    },
    setEconomyPrice: (state, action) => {
      state.economyPrice = action.payload;
    },
    setFirstClassPrice: (state, action) => {
      state.firstClassPrice = action.payload;
    },
  },
});

export const {
  setSeats,
  setBookedSeats,
  setEconomyCount,
  setFirstClassCount,
  setPremiumCount,
  setEconomyPrice,
  setFirstClassPrice,
  setPremiumPrice,
} = seatingSlice.actions;
export default seatingSlice.reducer;
