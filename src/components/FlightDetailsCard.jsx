import React, { useState } from "react";
import { parseISO, format } from "date-fns";
import { useNavigate } from "react-router-dom";

import "../css/components/FlightDetailsCard.css";

const FlightDetailsCard = ({ flight }) => {
  const [viewPrice, setViewPrice] = useState(false);

  const handleViewPrice = (e) => {
    e.preventDefault();
    setViewPrice(!viewPrice);
  };

  const navigate = useNavigate();

  const isodepartureDate = flight.departureDate;
  const departureDate = parseISO(isodepartureDate);
  const isoArrivalDate = flight.arrivalDate;

  const arrivalDate = parseISO(isoArrivalDate);

  const formattedDepatureDate = format(departureDate, "MMM dd HH:mm");
  const formattedArrivalDate = format(arrivalDate, "MMM dd HH:mm");

  const bookHandler = (e) => {
    e.preventDefault();
    navigate("/booking/" + flight._id);
  };

  return (
    <div className="flight-details-card">
      <div className="flight-card-container">
        <div className="flight-card-flght-img-name">
          <img
            className="flight-details-card-img"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZmlsbD0ibm9uZSIgaGVpZ2h0PSIxMjAiIHZpZXdCb3g9IjAgMCAxNTAgMTIwIiB3aWR0aD0iMTUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zMi4xNjk1IDUxLjYzMjVMNTIuOTA5OCAzOC4yODY1QzQ3LjQzMjcgMzEuODE3NiA0Mi4wODAyIDI1LjQ5NTkgMzYuNzI3MSAxOS4xNzQ3QzM1LjY2NzggMTcuOTI3NiAzNC42MTgzIDE2LjY2NDggMzMuNTM1NCAxNS40MzM1QzMxLjA2MjkgMTIuNjIzMSAzMS4wNjEgOS43MzkxMiAzMy41NjEgNy4wMTY2M0MzMy43ODIyIDYuNzc1NzYgMzQuMDMyOSA2LjU2MjQ4IDM0LjI3MjQgNi4zMzg2NkM0My4wODY0IC0xLjkwMjk3IDQxLjEwMzYgLTAuOTE0NTE4IDUwLjk4NjEgMi42MDU0MkM2MC4wMTc5IDUuODIxNDggNjguOTE1MyA5LjUyMTIyIDc3LjU4NzQgMTMuNjEwOUM4My4yODE4IDE2LjI5NTkgODcuODI2MyAxNi45MjkzIDkzLjMzOTYgMTIuNjk1M0MxMDAuNzI3IDYuOTc2MjkgMTA5LjQyOSAzLjE5OTE1IDExOC42NTEgMS43MDg4MUMxMjYuMTggMC40OTU4OTQgMTMzLjU5OSAwLjU2MTU1NSAxNDEuMDMyIDIuNjcxNjhDMTUxLjE1MiA1LjU0MzE2IDE1MC43MTcgMTUuODc5OCAxNDUuODk0IDIwLjc3OTRDMTQzLjI1MyAyMy4zODQ5IDE0MC4zNTkgMjUuNzIxMSAxMzcuMjU1IDI3Ljc1MzZDMTI5LjQ2OSAzMy4wMDA0IDEyMS42MDYgMzguMTQyMiAxMTMuNjI3IDQzLjA5MzZDMTEyLjQ2NyA0My43NDc1IDExMS40NjQgNDQuNjQ4OCAxMTAuNjkxIDQ1LjczMzVDMTA5LjkxOCA0Ni44MTgyIDEwOS4zOTMgNDguMDU5OCAxMDkuMTU0IDQ5LjM3MDFDMTA1LjMwNyA2Ni41MDA2IDEwMS4yODUgODMuNTk0OSA5Ny4yODM1IDEwMC42OTFDOTYuODE3NyAxMDIuNDg1IDk2LjI2MiAxMDQuMjUzIDk1LjYxODQgMTA1Ljk5MUM5NS4xNjYxIDEwNy4zNDUgOTQuNDQxIDEwOC41OTIgOTMuNDg3OSAxMDkuNjU1QzkyLjUzNDggMTEwLjcxOCA5MS4zNzM5IDExMS41NzQgOTAuMDc2OSAxMTIuMTcxQzg1LjM1MTMgMTE0LjQzNyA4MC42MDkyIDExNi42NzMgNzUuNzkzNyAxMTguNzM0QzcwLjgxMTQgMTIwLjg2OCA2OC4yMTUgMTE4Ljk0MyA2OC41MyAxMTMuNTI3QzY5LjMyMiA5OS45MDE0IDcwLjExOTIgODYuMjc2NyA3MC45MjE3IDcyLjY1MjRDNzAuOTY1NyA3MS44OTg5IDcwLjkyNzYgNzEuMTQyOCA3MC45Mjc2IDY5Ljg2NjlDNjkuNDc0NCA3MC42OTc4IDY4LjI5MTcgNzEuMzY5OSA2Ny4xMTM2IDcyLjA0OThDNTUuNzY5NSA3OC42MDAxIDQ0LjY5NTEgODUuNzEzNSAzMi4zNjA1IDkwLjMxMTFDMjcuNDcyOCA5Mi4xNDg3IDIyLjM4MjkgOTMuMzk1IDE3LjE5OTEgOTQuMDIzNEMxMi4xNTY1IDk0LjYwOTUgOC4yNDg2NCA5Mi4xMjAxIDYuMDUxMjIgODcuMTk3NUMzLjc3OTk4IDgyLjM0NDUgMi4zNzAxNSA3Ny4xMzMzIDEuODg0NzggNzEuNzk3MUMxLjMxNTA4IDY0LjI5MDYgMC43NTY1MzkgNTYuNzgyOCAwLjMxMjg1NSA0OS4yNjg0QzAuMDYxNDc3MiA0NS4wMTk5IDEuOTU3NjQgNDIuMjA2MiA1LjkyODQ4IDQwLjI2MDJDMTUuMDMzMiAzNS43OTcxIDE0LjAxNjUgMzYuNDQyOSAyMC4xMzk1IDQxLjc4MTVDMjMuNjc5MSA0NC44NjYzIDI3LjMxNjYgNDcuODQ0MSAzMC45MTk5IDUwLjg1NzRDMzEuMzE5IDUxLjE0MjggMzEuNzM2NSA1MS40MDE4IDMyLjE2OTUgNTEuNjMyNVpNNzUuNzM0IDExMC42NjVMNzYuNTk2NCAxMTEuMDU5Qzc4Ljc2NTYgMTEwLjA2NCA4MC44NjI2IDEwOC44MzUgODMuMTIwNCAxMDguMTI3Qzg2Ljk0NzUgMTA2LjkyOSA4Ny45NjQ4IDEwMy45OTMgODguODM4NCAxMDAuNTU1QzkzLjU4NjMgODEuODY1IDk4LjQyODQgNjMuMTk4MyAxMDMuMzY0IDQ0LjU1NTJDMTAzLjg5NiA0Mi40OTExIDEwNC44MzkgNDAuNTU1NyAxMDYuMTM3IDM4Ljg2NTFDMTA3LjQzNSAzNy4xNzQ2IDEwOS4wNjEgMzUuNzYzNyAxMTAuOTE4IDM0LjcxNzNDMTE3Ljc0OSAzMC42Mjc3IDEyNC4zMTMgMjYuMDg2NSAxMzAuOTE2IDIxLjYyNDFDMTM0LjA3OSAxOS40ODcgMTM3LjE2NyAxNy4yMTIyIDE0MC4xMTMgMTQuNzg2NEMxNDIuNiAxMi43MzkzIDE0Mi4yMiAxMS4xNzY1IDEzOS4yMDcgMTAuMTUyNkMxMzIuNjY2IDcuOTM0MTYgMTI1Ljk0OSA3LjU4ODkzIDExOS4xNTIgOC40NjA1NUMxMTAuMzY2IDkuNTg2MTcgMTAyLjc2NCAxMy42NjM0IDk1LjQ0MzggMTguMjk0NUM3NS4xNDcyIDMxLjEzNzMgNTQuODgwMSA0NC4wMjY5IDM0LjY0MjYgNTYuOTYzM0MzMS4wMzI3IDU5LjI2NDQgMzAuNDc3NSA1OS4zMDcxIDI3LjI3IDU2LjM3MjZDMjMuMjQwNyA1Mi42ODU5IDE5LjMwNTMgNDguODk2OSAxNS4yOTA1IDQ1LjE5NDVDMTQuMjI4NSA0NC4yMTQ2IDEzLjIyOTYgNDIuNTU4IDExLjQzNzggNDMuODA5NkM5LjYwMDA0IDQ1LjA5NDEgNi42MDEyNCA0NS4zOTk5IDYuOTI1NDcgNDguNjkwMkM3Ljk2MjQ4IDU5LjIwOTkgOC41ODE0IDY5Ljc5NCAxMC4xOTIxIDgwLjIyNTlDMTEuNDUzNSA4OC4zOTQ2IDE0LjEzMDEgODkuNTAzOSAyMi4xMDcyIDg3LjEyNjZDMzAuNzU3NyA4NC41NDg1IDM4LjY5MjkgODAuNDMyIDQ2LjM5MTcgNzUuODMzQzU0LjU0NiA3MC45NjMgNjIuNjA3MiA2NS45Mzc0IDcwLjcyNDggNjEuMDA1Qzc0LjI3OTUgNTguODQ1IDc2Ljg5ODMgNjAuMDUwNyA3Ny40NzcyIDY0LjEwNTVDNzcuNzU3OCA2NS43MTk3IDc3LjkwMzggNjcuMzU0MyA3Ny45MTM3IDY4Ljk5MjdDNzcuNjU1MSA3OS4xNDc1IDc3LjMyOTUgODkuMjk5NyA3Ni45ODk1IDk5LjQ1MkM3Ni45NTM0IDEwMC41MyA3Ni42NDIzIDEwMS41OTggNzYuNTMwMSAxMDIuNjc3Qzc2LjI0IDEwNS4zMzggNzUuOTk1MiAxMDguMDAzIDc1LjczNjYgMTEwLjY2Nkw3NS43MzQgMTEwLjY2NVpNNTkuNDQ4MiAzNC4xNjI4TDc4Ljg4MjQgMjEuNzYzOUM2OC4xODExIDE1Ljc5NDQgNTcuMDI4NCAxMC42NzI4IDQ1LjUyNjcgNi40NDYyNkM0NC42ODUyIDYuMTQzMDQgNDMuNDQyMSA1Ljk1NDY4IDQyLjc3IDYuMzU3MDFDNDAuNjgzNSA3LjYxMDYyIDM4Ljc4MzUgOS4xNzM0IDM3LjUwNDkgMTAuMTA4N0w0OC4zMDM2IDIxLjk0OTZDNTEuODggMjUuODY4NiA1NS40NTU3IDI5Ljc4NjMgNTkuNDQ4MiAzNC4xNjM0VjM0LjE2MjhaIiBmaWxsPSJibGFjayIvPjwvc3ZnPg=="
            alt="aeroplane-logo"
          />
          <div>
            <p className="flight-details-flight-name">
              {flight.name.length > 10
                ? flight.name.substring(0, 10) + "..."
                : flight.name}
            </p>
            <span>{flight.flightNumber}</span>
          </div>
        </div>
        <div>
          <span className="flight-details-time-name">Departure : </span>
          <p className="flight-details-time">{formattedDepatureDate}</p>
          <span>{flight.originPlace}</span>
        </div>
        <div>
          <span className="flight-details-time-name">Arrival : </span>
          <p className="flight-details-time">{formattedArrivalDate}</p>
          <span>{flight.destinationPlace}</span>
        </div>
        <div>
          <p className="flight-details-amount">₹ {flight.economyPrice}</p>
        </div>
        <div>
          <button
            className="flight-details-book-button"
            onClick={handleViewPrice}
          >
            View Prices
            {!viewPrice ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {viewPrice && (
        <div className="flight-details-price-card">
          <div>
            <table className="flight-details-table">
              <thead>
                <tr>
                  <th className="flight-details-thead">FARES</th>
                  <th className="flight-details-thead">CHECK-IN</th>
                  <th className="flight-details-thead">CANCELLATION</th>
                  <th className="flight-details-thead">BOOKING</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flight-details-class flight-details-values">
                    Economy
                  </td>
                  <td className="flight-details-values">{flight.checkIn}</td>
                  <td className="flight-details-values">Free Cancellation</td>
                  <td className="flight-details-values flight-details-booking">
                    <p className="flight-detials-table-price">
                      ₹ {flight.economyPrice}
                    </p>
                    <button
                      className="flight-details-book-button"
                      onClick={bookHandler}
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="flight-details-class flight-details-values">
                    First Class
                  </td>
                  <td className="flight-details-values">{flight.checkIn}</td>
                  <td className="flight-details-values">Free Cancellation</td>
                  <td className="flight-details-values flight-details-booking">
                    <p className="flight-detials-table-price">
                      ₹ {flight.firstClassPrice}
                    </p>
                    <button
                      className="flight-details-book-button"
                      onClick={bookHandler}
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="flight-details-class flight-details-values">
                    Premium
                  </td>
                  <td className="flight-details-values">{flight.checkIn}</td>
                  <td className="flight-details-values">Free Cancellation</td>
                  <td className="flight-details-values flight-details-booking">
                    <p className="flight-detials-table-price">
                      ₹ {flight.premiumClassPrice}
                    </p>
                    <button
                      className="flight-details-book-button"
                      onClick={bookHandler}
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDetailsCard;
