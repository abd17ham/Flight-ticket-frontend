import React, { useEffect, useState } from "react";
import Select from "react-select";
import Navbar from "../../components/Navbar";
import AdminBookingCard from "../../components/admin/AdminBookingCard";
import { NotificationManager } from "react-notifications";
import Loading from "../Loading";

const AdminBookingDashboard = () => {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState({
    label: "Flight Name",
    value: "flightNumber",
  });

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredBookings, setFilteredBookings] = useState([]);

  let searchByOptions = [{ label: "Flight Name", value: "flightNumber" }];

  const fetchBookings = async () => {
    setLoading(true);
    const response = await fetch(
      "http://localhost:8000/api/v1/bookings"
    );
    const data = await response.json();
    // console.log(data);
    if (data.status === "success") {
      // console.log(data.data);
      setBookings(data.data);
      setFilteredBookings(data.data);
    } else {
      NotificationManager.error(data.message, "Error", 2000);
    }
    setLoading(false);
  };

  const filterBookings = () => {
    let filteredBookings = bookings.filter((booking) => {
      if (searchBy.value === "flightNumber") {
        return booking.flight.name.toLowerCase().includes(search.toLowerCase());
      } else if (searchBy.value === "time") {
        return booking.time.includes(search);
      }
    });
    console.log(filteredBookings);
    setFilteredBookings(filteredBookings);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <Navbar />
        <div className="manage-booking-container">
          <p className="manage-booking-title">Bookings Dashboard :</p>

          <div className="search-sort-container">
            <Select
              className="select"
              options={searchByOptions}
              value={searchBy}
              defaultValue={searchBy}
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
            <button className="search-button" onClick={filterBookings}>
              Search
            </button>
          </div>
          <div className="admin-booking-card">
            {filteredBookings.length === 0 && (
              <p className="no-bookings">No Bookings Found</p>
            )}
            {filteredBookings.map((booking) => {
              return <AdminBookingCard key={booking._id} booking={booking} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDashboard;
