import React from "react";
import Select from "react-select";
import {
  setDepartureDate,
  setDestinationPlace,
  setOriginPlace,
  setClassValue,
} from "../features/filterSlice";
import { useSelector, useDispatch } from "react-redux";

const SearchBar = ({ setFilteredAirports }) => {
  const dispatch = useDispatch();

  const flights = useSelector((state) => state.flight.flights);
  const airports = useSelector((state) => state.flight.airports);
  const { originPlace, destinationPlace, departureDate, classValue } =
    useSelector((state) => state.filter);

  let classValues = [
    {
      label: "Economy",
      value: "economy",
    },
    {
      label: "Business",
      value: "business",
    },
    {
      label: "First Class",
      value: "first-class",
    },
  ];

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
      // console.log("hi date", date1);
      if (
        flight.originPlace === originPlace ||
        flight.destinationPlace === destinationPlace
      ) {
        if (!date1) {
          return flight;
        }
        if (date1 === formattedDate) {
          return flight;
        }
      }
    });

    setFilteredAirports(filterFlight);
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
        <p className="search-bar-text">Class :</p>
        <Select
          className="select search-select"
          required
          placeholder="Select Class"
          defaultValue={{ label: classValue, value: classValue }}
          onChange={(e) => {
            dispatch(setClassValue(e.value));
          }}
          options={classValues}
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
