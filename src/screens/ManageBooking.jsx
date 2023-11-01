import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import "../css/screens/ManageBooking.css";
import { NotificationManager } from "react-notifications";
import Loading from "./Loading";
import useAuth from "../hooks/useAuth";
const ManageBooking = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { token } = useAuth();

  const fetchMyBookings = async () => {
    setLoading(true);
    if (token) {
      const response = await fetch(
        "http://localhost:8000/api/v1/bookings/mybooking",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      const data = await response.json();
      if (data.status === "success") {
        setMyBookings(data.data);
      } else {
        NotificationManager.error(data.message, "Error");
      }
    }
    setLoading(false);
  };

  const cancelBookingHandler = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:8000/api/v1/bookings/${deleteId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      NotificationManager.success("Successfully Cancelled", "Success");
      fetchMyBookings();
    } else {
      NotificationManager.error(data.message, "Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyBookings();
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <Navbar />
        <div className="manage-booking-container">
          <p className="manage-booking-title">My Bookings :</p>
          {myBookings.length === 0 && (
            <div>
              <p className="manage-booking-no-booking">No Bookings Found</p>
            </div>
          )}
          {myBookings.map((booking) => {
            let utcDate = new Date(booking.createdAt);

            let istDate = utcToZonedTime(utcDate, "Asia/Kolkata");

            let formattedDate = format(istDate, "EEE MMM dd yyyy HH:mm:ss");
            return (
              <div className="manage-booking-card" key={booking._id}>
                <div>
                  <img
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8zIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik00MDguOSwxNTguNmgtMzUuM2MtMC4zLTMtMi45LTUuMy02LTUuM2gtNDIuNmMtMy4zLDAtNiwyLjctNiw2djAuMmMtMC45LTAuNS0yLTAuOS0zLjEtMC45aC05Ljh2LTE5LjEgICAgYzAtMTIuMy0xMC0yMi4zLTIyLjMtMjIuM0gyMjhjLTEyLjMsMC0yMi4zLDEwLTIyLjMsMjIuM3YxOS4xaC0xMS4zYy0wLjgsMC0xLjYsMC4yLTIuMywwLjVjLTAuMS0zLjItMi43LTUuOC02LTUuOGgtNDIuNiAgICBjLTMuMSwwLTUuNiwyLjMtNiw1LjNoLTM0LjZjLTMuMywwLTYsMi43LTYsNlYzODJjMCwzLjMsMi43LDYsNiw2aDM0LjV2MC44YzAsMy4zLDIuNyw2LDYsNmg0Mi42YzMuMywwLDYtMi43LDYtNnYtMS4yICAgIGMwLjcsMC4zLDEuNSwwLjUsMi4zLDAuNUgzMTZjMS4xLDAsMi4yLTAuMywzLjEtMC45djEuNmMwLDMuMywyLjcsNiw2LDZoNDIuNmMzLjMsMCw2LTIuNyw2LTZWMzg4aDM1LjJjMy4zLDAsNi0yLjcsNi02VjE2NC42ICAgIEM0MTQuOSwxNjEuMyw0MTIuMiwxNTguNiw0MDguOSwxNTguNnogTTEwOS4xLDM3NlYxNzAuNmgyOC41VjM3NkgxMDkuMXogTTE4MC4yLDM4Mi44aC0zMC42VjE2NS4yaDMwLjZWMzgyLjh6IE0yMTcuOCwxMzkuNSAgICBjMC01LjcsNC42LTEwLjMsMTAuMy0xMC4zSDI4NGM1LjcsMCwxMC4zLDQuNiwxMC4zLDEwLjN2MTkuMWgtNzYuNFYxMzkuNXogTTMxNiwzNzZIMTk0LjVjLTAuOCwwLTEuNiwwLjItMi4zLDAuNVYxNzAuMSAgICBjMC43LDAuMywxLjUsMC41LDIuMywwLjVoMTcuM2g4OC40SDMxNmMxLjEsMCwyLjItMC4zLDMuMS0wLjl2MjA3LjJDMzE4LjIsMzc2LjMsMzE3LjEsMzc2LDMxNiwzNzZ6IE0zNjEuNywzODIuOGgtMzAuNlYxNjUuMiAgICBoMzAuNlYzODIuOHogTTQwMi45LDM3NmgtMjkuMlYxNzAuNmgyOS4yVjM3NnoiLz48L2c+PC9zdmc+"
                    alt="travel-bag"
                    className="flight-details-card-img"
                  />
                </div>
                <div>
                  <p className="manage-booking-card-title">Booked Date :</p>
                  <p className="manage-booking-card-content">{formattedDate}</p>
                </div>
                <div>
                  <p className="manage-booking-card-title">Flight Name :</p>
                  <p className="manage-booking-card-content">
                    {booking.flight.name}
                  </p>
                </div>
                <div>
                  <p className="manage-booking-card-title">Seats Booked :</p>
                  <p className="manage-booking-card-content">
                    {booking.seatNumbers.toString()}
                  </p>
                </div>
                <div className="">
                  <button
                    className="manage-booking-cancel-button"
                    onClick={() => {
                      setCancelBooking(true);
                      setDeleteId(booking._id);
                    }}
                  >
                    Cancel My Booking
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {cancelBooking && (
        <Modal
          isModalOpen={cancelBooking}
          setIsModalOpen={setCancelBooking}
          setDeleteId={setDeleteId}
        >
          <p className="model-booking-cancel-text">
            Are you sure ! , You want to cancel
          </p>
          <div className="model-booking-cancel-button-container">
            <button
              className="model-booking-yes-button"
              onClick={(e) => {
                e.preventDefault();
                cancelBookingHandler();
                setCancelBooking(false);
                setDeleteId("");
              }}
            >
              Yes
            </button>
            <button
              className="model-booking-no-button"
              onClick={() => {
                setCancelBooking(false);
                setDeleteId("");
              }}
            >
              No
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ManageBooking;
