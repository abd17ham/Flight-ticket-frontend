import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import "../css/components/SeatingDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { NotificationManager } from "react-notifications";
import Loading from "../screens/Loading";

const SeatingDetails = ({ setLoading }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const { id: flightId } = useParams();
  const { id: userId } = useAuth();
  const {
    seats,
    premiumCount,
    economyCount,
    firstClassCount,
    premiumPrice,
    economyPrice,
    firstClassPrice,
  } = useSelector((state) => state.seating);

  useEffect(() => {
    setTotal(
      premiumCount * premiumPrice +
        economyCount * economyPrice +
        firstClassCount * firstClassPrice
    );
  }, [seats]);
  // console.log({ flightId, userId, seats });
  const bookTickets = async () => {
    setLoading(true);
    const response = await fetch(
      "http://localhost:8000/api/v1/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flightId,
          userId,
          seatNumbers: seats,
        }),
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      NotificationManager.success("Ticket Booked Successfully", "Success");
      navigate("/mybookings");
    } else {
      NotificationManager.error(data.message, "Error");
    }
    setLoading(false);
  };

  const bookHandler = (e) => {
    e.preventDefault();
    bookTickets();
  };

  return (
    <div className="seating-details-container">
      <p className="seating-details-title">Seating Details</p>
      <div className="seating-details-seat">
        <p className="seating-details-seat-title">Selected Seats : </p>
        <div className="seating-details-seat-number-container">
          {seats.map((seat) => {
            return (
              <span className="seating-details-seat-number" key={seat}>
                {seat} ,{" "}
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <p className="seating-fare-summary">
          <p className="seating-fare-summary-title">Fare Summary</p>
          <div className="seating-fare-container">
            <p className="seating-fare-name">
              Premium : {premiumCount} * {premiumPrice}
            </p>
            <p className="seating-fare-subtotal">
              ₹ {premiumCount * premiumPrice}
            </p>
          </div>
          <div className="seating-fare-container">
            <p className="seating-fare-name">
              First Class : {firstClassCount} * {firstClassPrice}
            </p>
            <p className="seating-fare-subtotal">
              ₹ {firstClassCount * firstClassPrice}
            </p>
          </div>
          <div className="seating-fare-container">
            <p className="seating-fare-name">
              Economy : {economyCount} * {economyPrice}
            </p>
            <p className="seating-fare-subtotal">
              ₹ {economyCount * economyPrice}
            </p>
          </div>
          <div className="seating-fare-container seating-fare-total-container">
            <p className="seating-fare-total-name">Total</p>
            <p className="seating-fare-total">₹ {total}</p>
          </div>
        </p>
      </div>
      <div className="seating-button-container">
        <button
          className="seating-button"
          onClick={(e) => {
            bookHandler(e);
          }}
        >
          Book Now{" "}
        </button>
      </div>
    </div>
  );
};

export default SeatingDetails;
