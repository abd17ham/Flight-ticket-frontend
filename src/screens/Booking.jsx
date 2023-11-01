import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Seats from "../components/Seats";
import SeatingDetails from "../components/SeatingDetails";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFlight } from "../features/flightSlice";
import {
  setBookedSeats,
  setEconomyPrice,
  setFirstClassPrice,
  setPremiumPrice,
} from "../features/seatingSlice";
import { NotificationManager } from "react-notifications";
import "../css/screens/Booking.css";
import Loading from "./Loading";

const Booking = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  const { selectedFlight } = useSelector((state) => state.flight);

  const fetchFlight = async () => {
    setLoading(true);
    const response = await fetch(
      "http://localhost:8000/api/v1/flights/" + id
    );
    const data = await response.json();
    if (data.status === "success") {
      dispatch(setSelectedFlight(data.data.flight));
    } else {
      NotificationManager.error(data.message, "Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFlight();
  }, [id]);

  useEffect(() => {
    if (selectedFlight) {
      document.title = "Booking - " + selectedFlight.name;

      if (selectedFlight.seatsBooked) {
        dispatch(setBookedSeats(selectedFlight.seatsBooked));
      }

      dispatch(setEconomyPrice(selectedFlight.economyPrice));
      dispatch(setFirstClassPrice(selectedFlight.firstClassPrice));
      dispatch(setPremiumPrice(selectedFlight.premiumClassPrice));
    }
  }, [selectedFlight]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div>
        <p className="booking-flight-name">
          Flight Name : {selectedFlight.name} - {selectedFlight.flightNumber}
        </p>
      </div>
      <div className="seating-billing-container">
        <div>
          <Seats />
        </div>
        <div>
          <SeatingDetails setLoading={setLoading} key={"seats-booking"} />
        </div>
      </div>
    </div>
  );
};

export default Booking;
