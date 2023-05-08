import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  airports: [],
  selectedFlight: {},
};

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setAirports: (state, action) => {
      const tempFlightPlaces = new Set();

      let flights = action.payload;
      flights.forEach((flight) => {
        tempFlightPlaces.add(flight.destinationPlace);
        tempFlightPlaces.add(flight.originPlace);
      });

      let tempAirportValues = Array.from(tempFlightPlaces).map((place) => {
        return {
          value: place,
          label: place,
        };
      });

      state.airports = tempAirportValues;
    },

    setFlights: (state, action) => {
      state.flights = action.payload;
    },

    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
  },
});

export const { setAirports, setFlights, setSelectedFlight } =
  flightSlice.actions;
export default flightSlice.reducer;
