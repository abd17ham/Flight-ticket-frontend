import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import useAuth from "../../hooks/useAuth";

const AdminAddFlights = () => {
  const [flightDetails, setFlightDetails] = useState({
    name: "",
    flightNumber: "",
    economyPrice: 0,
    firstClassPrice: 0,
    premiumClassPrice: 0,
    checkIn: "",
    originPlace: "",
    destinationPlace: "",
    departureDate: "",
    arrivalDate: "",
  });

  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addFlight = async () => {
    setLoading(true);
    if (token) {
      const response = await fetch(
        "http://localhost:8000/api/v1/flights/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(flightDetails),
        }
      );

      const data = await response.json();
      // console.log(data);
      if (data.status === "success") {
        NotificationManager.success("Flight added successfully", "Success");
        navigate("/admin/flights");
      } else {
        NotificationManager.error("Flight could not be added", "Error");
      }
    } else {
      NotificationManager.error("You are not logged in", "Error");
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFlightDetails({
      ...flightDetails,
      departureDate: new Date(flightDetails.departureDate),
      arrivalDate: new Date(flightDetails.arrivalDate),
    });
    addFlight();
  };

  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="add-flight">
        <p className="admin-add-title">Add Flights</p>

        <div className="admin-add-form">
          <form onSubmit={handleSubmit}>
            <div className="admin-add-form-group">
              <label htmlFor="name">Flight Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={flightDetails.name}
                onChange={handleChange}
                className="admin-add-input"
                placeholder="Eg : Air India"
                required
              />
            </div>
            <div className="admin-add-form-group">
              <label htmlFor="flightNumber">Flight Number</label>
              <input
                type="text"
                name="flightNumber"
                id="flightNumber"
                value={flightDetails.flightNumber}
                onChange={handleChange}
                className="admin-add-input"
                placeholder="Eg : AI-101"
                required
              />
            </div>
            <div className="admin-add-form-group">
              <label htmlFor="economyPrice">Economy Price</label>
              <input
                type="number"
                name="economyPrice"
                id="economyPrice"
                value={flightDetails.economyPrice}
                onChange={handleChange}
                className="admin-add-input"
                required
              />
            </div>
            <div className="admin-add-form-group">
              <label htmlFor="firstClassPrice">First Class Price</label>
              <input
                type="number"
                name="firstClassPrice"
                id="firstClassPrice"
                value={flightDetails.firstClassPrice}
                onChange={handleChange}
                className="admin-add-input"
                required
              />
            </div>
            <div className="admin-add-form-group">
              <label htmlFor="premiumClassPrice">Premium Class Price</label>
              <input
                type="number"
                name="premiumClassPrice"
                id="premiumClassPrice"
                value={flightDetails.premiumClassPrice}
                onChange={handleChange}
                className="admin-add-input"
                required
              />
            </div>
            <div className="admin-add-form-group">
              <label htmlFor="checkIn">Check In</label>
              <input
                type="text"
                name="checkIn"
                id="checkIn"
                placeholder="Eg : 25 KG "
                value={flightDetails.checkIn}
                onChange={handleChange}
                className="admin-add-input"
                required
              />
            </div>
            <div className="admin-add-form-group">
              <label htmlFor="originPlace">Origin</label>
              <input
                type="text"
                name="originPlace"
                id="originPlace"
                value={flightDetails.originPlace}
                onChange={handleChange}
                placeholder="Eg : Mumbai"
                className="admin-add-input"
                required
              />
            </div>
            <div className="admin-add-form-group">
              <label htmlFor="destinationPlace">Destination</label>
              <input
                type="text"
                name="destinationPlace"
                id="destinationPlace"
                value={flightDetails.destinationPlace}
                onChange={handleChange}
                className="admin-add-input"
                placeholder="Eg : Delhi"
                required
              />
            </div>
            <div className="admin-add-form-group">
              <label htmlFor="departureDate">Departure Date</label>
              <input
                type="datetime-local"
                name="departureDate"
                id="departureDate"
                value={flightDetails.departureDate}
                onChange={handleChange}
                className="admin-add-input"
                required
              />
            </div>
            <div className="admin-add-form-group">
              <label htmlFor="arrivalDate">Arrival Date</label>

              <input
                type="datetime-local"
                name="arrivalDate"
                id="arrivalDate"
                value={flightDetails.arrivalDate}
                onChange={handleChange}
                className="admin-add-input"
                required
              />
            </div>
            <div className="admin-add-form-group">
              <button className="admin-add-form-button">Add Flight</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddFlights;
