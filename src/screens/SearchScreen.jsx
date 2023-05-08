import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../css/screens/SearchScreen.css";
import SearchBar from "../components/Searchbar";
import FlightDetailsCard from "../components/FlightDetailsCard";
import FilterSidebar from "../components/FilterSidebar";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { setAirports, setFlights } from "../features/flightSlice";
import Loading from "./Loading";

const SearchScreen = () => {
  const [fliteredAirports, setFilteredAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { airports, flights } = useSelector((state) => state.flight);

  useEffect(() => {
    if (airports.length <= 0) {
      fetchAirports();
    }

    if (flights.length <= 0) {
      fetchFlights();
    }
  }, [airports]);

  const fetchAirports = async () => {
    setLoading(true);
    const response = await fetch(
      "https://hungry-crown-boa.cyclic.app/api/v1/flights/airports"
    );
    const data = await response.json();
    if (data.status === "success") {
      dispatch(setAirports(data.data));
    } else {
      NotificationManager.error(data.message, "Error");
    }
    setLoading(false);
  };

  const fetchFlights = async () => {
    setLoading(true);
    const response = await fetch("api/v1/flights/");
    const data = await response.json();
    if (data.status === "success") {
      console.log(data.data);
      dispatch(setFlights(data.data));
      setFilteredAirports(data.data);
    } else {
      NotificationManager.error(data.message, "Error");
    }
    setLoading(false);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="search-screen-section">
      <Navbar />
      <SearchBar
        loading={loading}
        setLoading={setLoading}
        setFilteredAirports={setFilteredAirports}
      />
      <div className="filter-flight-card-container">
        <FilterSidebar
          fliteredAirports={fliteredAirports}
          setFilteredAirports={setFilteredAirports}
        />

        <div>
          {fliteredAirports.length <= 0 && (
            <div className="flight-details-card">
              <h2>No Airplanes</h2>
            </div>
          )}
          {fliteredAirports.length >= 1 &&
            fliteredAirports.map((flight) => {
              return <FlightDetailsCard key={flight._id} flight={flight} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
