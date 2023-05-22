import React from "react";
import Select from "react-select";
import {
  setDepartureDate,
  setDestinationPlace,
  setOriginPlace,
  setClassValue,
} from "../features/filterSlice";
import { useSelector, useDispatch } from "react-redux";

const SearchBar = ({ setFilteredFlights }) => {
  const dispatch = useDispatch();

  const flights = useSelector((state) => state.flight.flights);
  const airports = useSelector((state) => state.flight.airports);
  const { originPlace, destinationPlace, departureDate } = useSelector(
    (state) => state.filter
  );

  const searchHandle = (e) => {
    e.preventDefault();

    let filterFlight = flights.filter((flight) => {
      const date1 = departureDate;
      const date2 = flight.departureDate;

      const isoDate = new Date(date2);
      const year = isoDate.getFullYear();
      const month = isoDate.getMonth() + 1;
      const day = isoDate.getDate();

      const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
        day < 10 ? "0" : ""
      }${day}`;
      if (
        flight.originPlace === originPlace ||
        flight.destinationPlace === destinationPlace
      ) {
        console.log("In the filter", date1, formattedDate);
        if (!date1) {
          return flight;
        }
        if (date1 === formattedDate) {
          console.log("selected");
          return flight;
        }
      }
    });

    setFilteredFlights(filterFlight);
  };

  return (
    <div className="search-bar-container">
      <div>
        <p className="search-bar-text">From : </p>
        <Select
          className="select search-select"
          placeholder="Select Origin"
          required
          defaultValue={{ label: originPlace, value: originPlace }}
          onChange={(e) => {
            dispatch(setOriginPlace(e.value));
          }}
          options={airports}
        />
      </div>
      <div>
        <p className="search-bar-text">To :</p>
        <Select
          className="select search-select"
          placeholder="Select Destination"
          required
          defaultValue={{ label: destinationPlace, value: destinationPlace }}
          onChange={(e) => {
            dispatch(setDestinationPlace(e.value));
          }}
          options={airports}
        />
      </div>
      <div>
        <p className="search-bar-text">Depart :</p>
        <input
          type="date"
          className="home-input"
          value={departureDate}
          onChange={(e) => {
            dispatch(setDepartureDate(e.target.value));
          }}
        />
      </div>
      <div>
        <button className="search-search-button" onClick={searchHandle}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
