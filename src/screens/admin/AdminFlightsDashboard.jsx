import React, { useEffect, useState } from "react";
import AdminFlightsCard from "../../components/admin/AdminFlightsCard";
import Navbar from "../../components/Navbar";
import Select from "react-select";
import { NotificationManager } from "react-notifications";
import { useSelector, useDispatch } from "react-redux";
import { setFlights } from "../../features/flightSlice";
import "../../css/screens/AdminFlightsDashboard.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const AdminFlightsDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [searchBy, setSearchBy] = useState({
    label: "Flight Name",
    value: "name",
  });
  const [search, setSearch] = useState("");

  const [filteredFlights, setFilteredFlights] = useState([]);

  let searchByOptions = [
    { label: "Flight Name", value: "name" },
    { label: "Flight Number", value: "flightNumber" },
    { label: "Depature", value: "originPlace" },
    { label: "Arrival", value: "destinationPlace" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { flights } = useSelector((state) => state.flight);

  const filterFlights = () => {
    let filteredFlights = flights.filter((flight) => {
      if (searchBy.value === "name") {
        return flight.name.toLowerCase().includes(search.toLowerCase());
      } else if (searchBy.value === "flightNumber") {
        return flight.flightNumber.toLowerCase().includes(search.toLowerCase());
      } else if (searchBy.value === "originPlace") {
        return flight.originPlace.toLowerCase().includes(search.toLowerCase());
      } else if (searchBy.value === "destinationPlace") {
        return flight.destinationPlace
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilteredFlights(filteredFlights);
  };

  const fetchFlights = async () => {
    const response = await fetch(
      "http://localhost:8000/api/v1/flights/"
    );
    const data = await response.json();
    if (data.status === "success") {
      // console.log(data.data);
      dispatch(setFlights(data.data));
      setFilteredFlights(data.data);
    } else {
      NotificationManager.error(data.message, "Error");
    }
  };

  useEffect(() => {
    if (flights.length <= 0) {
      fetchFlights();
    } else {
      setFilteredFlights(flights);
    }
  }, [flights]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="admin-flights-dashboard">
        <div className="admin-flight-header">
          <h3 className="admin-flights-dashboard-title">Flights Dashboard</h3>
          <button
            className="add-flight-button"
            onClick={() => {
              navigate("/admin/addflights");
            }}
          >
            Add Flight
          </button>
        </div>
        <div className="search-sort-container">
          <Select
            className="select"
            options={searchByOptions}
            value={searchBy}
            defaultValue={searchByOptions[0]}
            onChange={(e) => {
              setSearchBy(e);
            }}
          />
          <input
            className="search-input"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            className="search-button"
            onClick={(e) => {
              e.preventDefault();
              filterFlights();
            }}
          >
            Search
          </button>
        </div>
        <div className="admin-flight-card">
          {filteredFlights.map((flight) => {
            return (
              <AdminFlightsCard
                key={flight._id}
                flight={flight}
                loading={loading}
                setLoading={setLoading}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminFlightsDashboard;
