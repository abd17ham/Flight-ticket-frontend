import React, { useEffect, useState } from "react";
import Select from "react-select";
import { DayPicker } from "react-day-picker";
import Navbar from "../components/Navbar";
import "../css/screens/Home.css";
import { NotificationManager } from "react-notifications";
import Loading from "./Loading";
import { setAirports, setFlights } from "../features/flightSlice";
import {
  setDepartureDate,
  setDestinationPlace,
  setOriginPlace,
  setClassValue,
  setPassengersCount,
} from "../features/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const airports = useSelector((state) => state.flight.airports);
  const { passengers, departureDate, classValue } = useSelector(
    (state) => state.filter
  );

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchAirports = async () => {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8000/api/v1/flights/airports"
      );
      const data = await response.json();
      if (data.status === "success") {
        dispatch(setAirports(data.data));
      } else {
        NotificationManager.error(data.message, "Error");
      }
      setLoading(false);
    };
    document.title = "AvesAir - Home";
    fetchAirports();
    console.log(process.env.REACT_BACKEND_URL);
  }, []);

  const fetchFlights = async () => {
    const response = await fetch(
      "http://localhost:8000/api/v1/flights/"
    );
    const data = await response.json();
    if (data.status === "success") {
      // console.log(data.data);
      dispatch(setFlights(data.data));
    } else {
      NotificationManager.error(data.message, "Error");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="home">
      <div className="background-wrapper">
        <Navbar />
        <div className="container">
          <div className="title">
            <div className="heading-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="flight-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
              <h1 className="heading">Book Cheap Flights</h1>
            </div>
          </div>
          <div>
            <div className="search-container">
              <div>
                <p className="search-text">Flying from</p>
                <Select
                  className="select"
                  options={airports}
                  placeholder="Select Airport"
                  required
                  onChange={(e) => {
                    dispatch(setOriginPlace(e.value));
                  }}
                />
              </div>
              <div className="toogle-icon">
                <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZmlsbD0ibm9uZSIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQuOTkyNTUgMTEuMDE1OUM0LjQ0MDI3IDExLjAxNTkgMy45OTI1NSAxMC41NjgyIDMuOTkyNTUgMTAuMDE1OUMzLjk5MjU1IDkuNjU4NSA0LjE4MDA0IDkuMzQ0OSA0LjQ2MjAyIDkuMTY4MDdMNy4xNDk2NCA2LjQ4MDQ1QzcuNTQwMTYgNi4wODk5MyA4LjE3MzMzIDYuMDg5OTMgOC41NjM4NSA2LjQ4MDQ1QzguOTU0MzggNi44NzA5OCA4Ljk1NDM4IDcuNTA0MTQgOC41NjM4NSA3Ljg5NDY3TDcuNDQyNjMgOS4wMTU5TDE0Ljk5MjYgOS4wMTU4OUMxNS41NDQ4IDkuMDE1ODkgMTUuOTkyNiA5LjQ2MzYxIDE1Ljk5MjYgMTAuMDE1OUMxNS45OTI2IDEwLjU2ODIgMTUuNTQ0OCAxMS4wMTU5IDE0Ljk5MjYgMTEuMDE1OUw1LjA0MiAxMS4wMTU5QzUuMDMyODggMTEuMDE2IDUuMDIzNzYgMTEuMDE2IDUuMDE0NjQgMTEuMDE1OUg0Ljk5MjU1WiIgZmlsbD0iY3VycmVudENvbG9yIi8+PHBhdGggZD0iTTE5LjAwNzQgMTIuOTg0MUMxOS41NTk3IDEyLjk4NDEgMjAuMDA3NCAxMy40MzE4IDIwLjAwNzQgMTMuOTg0MUMyMC4wMDc0IDE0LjM0MTUgMTkuODIgMTQuNjU1MSAxOS41MzggMTQuODMxOUwxNi44NTA0IDE3LjUxOTVDMTYuNDU5OCAxNy45MTAxIDE1LjgyNjcgMTcuOTEwMSAxNS40MzYxIDE3LjUxOTVDMTUuMDQ1NiAxNy4xMjkgMTUuMDQ1NiAxNi40OTU4IDE1LjQzNjEgMTYuMTA1M0wxNi41NTc0IDE0Ljk4NDFIOS4wMDc0NUM4LjQ1NTE2IDE0Ljk4NDEgOC4wMDc0NSAxNC41MzY0IDguMDA3NDUgMTMuOTg0MUM4LjAwNzQ1IDEzLjQzMTggOC40NTUxNiAxMi45ODQxIDkuMDA3NDUgMTIuOTg0MUwxOC45NTggMTIuOTg0MUMxOC45NjcxIDEyLjk4NCAxOC45NzYyIDEyLjk4NCAxOC45ODU0IDEyLjk4NDFIMTkuMDA3NFoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg=="
                  alt="toggle"
                />
              </div>
              <div>
                <p className="search-text">Flying to</p>
                <Select
                  className="select"
                  placeholder="Select Airport"
                  options={airports}
                  onChange={(e) => {
                    dispatch(setDestinationPlace(e.value));
                  }}
                  required
                />
              </div>
            </div>
            <div className="search-container">
              <div>
                <p className="search-text">Depature</p>
                <input
                  type="date"
                  value={departureDate}
                  placeholder="Select Date"
                  className="home-input date"
                  onChange={(date) => {
                    dispatch(setDepartureDate(date.target.value));
                  }}
                />
              </div>
            </div>
            <div className="search-container">
              <div>
                <p className="search-text">Class</p>

                <div className="radio">
                  <Select
                    className="select"
                    options={classValues}
                    defaultValue={classValue}
                    onChange={(e) => {
                      setClassValue(e);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="search-container">
              <button
                className="search-button"
                onClick={(e) => {
                  e.preventDefault();
                  fetchFlights();
                  navigate("/search");
                }}
              >
                Search Flight
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
