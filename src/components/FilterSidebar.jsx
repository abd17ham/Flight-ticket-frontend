import React, { useState } from "react";
import { RangeSlider } from "rsuite";

import "../css/components/FilterSidebar.css";

const FilterSidebar = ({ filteredFlights, setFilteredAirports }) => {
  const [priceRange, setPriceRange] = useState([7000, 35950]);

  const [time6AmSelected, setTime6AmSelected] = useState(false);
  const [time6AMPmSelected, setTimemAMPmSelected] = useState(false);
  const [timeAfter6PmSelected, setTimeAfter6PmSelected] = useState(false);

  const handleApply = () => {
    let filtered = filteredFlights.filter(
      (airport) =>
        airport.economyPrice >= priceRange[0] &&
        airport.economyPrice <= priceRange[1]
    );

    //filter by time Before 6AM   6AM - 6PM After 6PM

    filtered = filtered.filter((airport) => {
      const isoDate = new Date(airport.departureDate);
      const hours = isoDate.getHours();
      if (time6AmSelected && hours < 6) {
        return true;
      }
      if ((time6AMPmSelected && hours >= 6) || hours < 18) {
        return true;
      }
      if (timeAfter6PmSelected && hours >= 18) {
        return true;
      }
    });

    setFilteredAirports(filtered);
  };

  return (
    <div className="filter-siderbar">
      <p className="filter-sidebar-title">Popular Filters</p>
      <div className="filter-sidebar-content">
        <RangeSlider
          defaultValue={priceRange}
          min={7000}
          max={35950}
          onChange={(e) => {
            setPriceRange(e);
          }}
        />
      </div>
      <div className="filter-slider-min-max">
        <p>₹ {priceRange[0]}</p>
        <p>₹ {priceRange[1]}</p>
      </div>

      <div className="filter-sidebar-departure">
        <p className="filter-sidebar-departure-title">Departure :</p>
        <div className="filter-sidebar-timings">
          <div
            className={`filter-sidebar-time ${
              time6AmSelected && "time-selected"
            }`}
            onClick={() => {
              setTime6AmSelected(!time6AmSelected);
            }}
          >
            <img
              className="filter-sidebar-timings-icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTEsLmNscy0ye2ZpbGw6bm9uZTt9LmNscy0ye3N0cm9rZTojMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9PC9zdHlsZT48L2RlZnM+PGcgZGF0YS1uYW1lPSJMYXllciAyIiBpZD0iTGF5ZXJfMiI+PGcgaWQ9IldvcmtzcGFjZSI+PHJlY3QgY2xhc3M9ImNscy0xIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNiwxM2E0LDQsMCwwLDAtOCwwWiIvPjxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjEyIiB4Mj0iMTIiIHkxPSI1IiB5Mj0iNyIvPjxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjE3LjY2IiB4Mj0iMTYuMjQiIHkxPSI3LjM0IiB5Mj0iOC43NiIvPjxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjIwIiB4Mj0iMTgiIHkxPSIxMyIgeTI9IjEzIi8+PGxpbmUgY2xhc3M9ImNscy0yIiB4MT0iNCIgeDI9IjYiIHkxPSIxMyIgeTI9IjEzIi8+PGxpbmUgY2xhc3M9ImNscy0yIiB4MT0iNi4zNCIgeDI9IjcuNzYiIHkxPSI3LjM0IiB5Mj0iOC43NiIvPjxwb2x5bGluZSBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTAgMTcgMTIgMTUgMTQgMTciLz48bGluZSBjbGFzcz0iY2xzLTIiIHgxPSIxMiIgeDI9IjEyIiB5MT0iMTkiIHkyPSIxNSIvPjwvZz48L2c+PC9zdmc+"
              alt=""
            />
            <p className="filter-sidebar-time-text">Before 6AM</p>
          </div>
          <div
            className={`filter-sidebar-time ${
              time6AMPmSelected && "time-selected"
            }`}
            onClick={() => {
              setTimemAMPmSelected(!time6AMPmSelected);
            }}
          >
            <img
              className="filter-sidebar-timings-icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDI1NiAyNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIyNTYiIHdpZHRoPSIyNTYiLz48Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIGZpbGw9Im5vbmUiIHI9IjYwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxNiIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjE2IiB4MT0iMTI4IiB4Mj0iMTI4IiB5MT0iMzYiIHkyPSIxNiIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjE2IiB4MT0iNjIuOSIgeDI9IjQ4LjgiIHkxPSI2Mi45IiB5Mj0iNDguOCIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjE2IiB4MT0iMzYiIHgyPSIxNiIgeTE9IjEyOCIgeTI9IjEyOCIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjE2IiB4MT0iNjIuOSIgeDI9IjQ4LjgiIHkxPSIxOTMuMSIgeTI9IjIwNy4yIi8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMTYiIHgxPSIxMjgiIHgyPSIxMjgiIHkxPSIyMjAiIHkyPSIyNDAiLz48bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxNiIgeDE9IjE5My4xIiB4Mj0iMjA3LjIiIHkxPSIxOTMuMSIgeTI9IjIwNy4yIi8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMTYiIHgxPSIyMjAiIHgyPSIyNDAiIHkxPSIxMjgiIHkyPSIxMjgiLz48bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxNiIgeDE9IjE5My4xIiB4Mj0iMjA3LjIiIHkxPSI2Mi45IiB5Mj0iNDguOCIvPjwvc3ZnPg=="
              alt=""
            />
            <p className="filter-sidebar-time-text">6AM - 6PM</p>
          </div>
          <div
            className={`filter-sidebar-time ${
              timeAfter6PmSelected && "time-selected"
            }`}
            onClick={() => {
              setTimeAfter6PmSelected(!timeAfter6PmSelected);
            }}
          >
            <img
              className="filter-sidebar-timings-icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQgNDQ7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA0NCA0NCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9Imdob3N0Ii8+PGcgaWQ9ImJhdCIvPjxnIGlkPSJtb25zdGVyIi8+PGcgaWQ9Imphc29uIi8+PGcgaWQ9ImdyYXZlIi8+PGcgaWQ9InNrdWxsIi8+PGcgaWQ9ImNhdWxkcm9uIi8+PGcgaWQ9ImNsZWF2ZXIiLz48ZyBpZD0iY2FuZGxlIi8+PGcgaWQ9ImNhdCIvPjxnIGlkPSJvd2wiLz48ZyBpZD0icHVta2luIi8+PGcgaWQ9ImV5ZSIvPjxnIGlkPSJ2YW1waXJlIi8+PGcgaWQ9ImZpbmdlciIvPjxnIGlkPSJsZWFmIi8+PGcgaWQ9ImNvZmZpbiIvPjxnIGlkPSJicm9vbSIvPjxnIGlkPSJtb29uIj48Zz48Zz48Y2lyY2xlIGN4PSI0IiBjeT0iOSIgcj0iMSIvPjwvZz48Zz48Y2lyY2xlIGN4PSIxMCIgY3k9IjciIHI9IjEiLz48L2c+PGc+PGNpcmNsZSBjeD0iNiIgY3k9IjE0IiByPSIxIi8+PC9nPjxnPjxjaXJjbGUgY3g9IjQwIiBjeT0iMzMiIHI9IjEiLz48L2c+PGc+PGNpcmNsZSBjeD0iNCIgY3k9IjI1IiByPSIxIi8+PC9nPjxnPjxwYXRoIGQ9Ik0zNywyMWgtOGMtMC41NTMsMC0xLTAuNDQ3LTEtMXMwLjQ0Ny0xLDEtMWg4YzAuNTUzLDAsMSwwLjQ0NywxLDFTMzcuNTUzLDIxLDM3LDIxeiIvPjwvZz48Zz48cGF0aCBkPSJNMjUsMjFoLTJjLTAuNTUzLDAtMS0wLjQ0Ny0xLTFzMC40NDctMSwxLTFoMmMwLjU1MywwLDEsMC40NDcsMSwxUzI1LjU1MywyMSwyNSwyMXoiLz48L2c+PGc+PHBhdGggZD0iTTM5LjUsOGMtMC40NTYsMC0wLjkxMiwwLjA3My0xLjM1MiwwLjIxNkMzNy4yMzQsNi44NDQsMzUuNjk1LDYsMzQsNmMtMi4xMjUsMC0zLjk1LDEuMzM2LTQuNjY0LDMuMjMzICAgICBDMjguOTEsOS4wOCwyOC40NTksOSwyOCw5Yy0yLjIwNiwwLTQsMS43OTQtNCw0czEuNzk0LDQsNCw0aDExLjVjMi40ODEsMCw0LjUtMi4wMTksNC41LTQuNVM0MS45ODEsOCwzOS41LDh6IE0zOS41LDE1aC0xLjA1NiAgICAgQzM4Ljc4OCwxNC40MDksMzksMTMuNzMyLDM5LDEzYzAtMC41NTMtMC40NDctMS0xLTFzLTEsMC40NDctMSwxYzAsMS4xMDMtMC44OTcsMi0yLDJoLTdjLTEuMTAzLDAtMi0wLjg5Ny0yLTJzMC44OTctMiwyLTIgICAgIGMwLjQ5MiwwLDAuOTcsMC4xODksMS4zNDUsMC41MzJjMC4yODQsMC4yNjMsMC42OTcsMC4zMzUsMS4wNTUsMC4xODljMC4zNTgtMC4xNDcsMC42LTAuNDg3LDAuNjItMC44NzUgICAgIEMzMS4xMDIsOS4yNTEsMzIuNDEsOCwzNCw4YzEuMjI4LDAsMi4zMTcsMC43MzksMi43NzgsMS44ODNjMC4xMDksMC4yNzEsMC4zMzIsMC40OCwwLjYwOSwwLjU3NCAgICAgYzAuMjc2LDAuMDkyLDAuNTgzLDAuMDYyLDAuODMyLTAuMDkxQzM4LjYyNiwxMC4xMjMsMzkuMDU3LDEwLDM5LjUsMTBjMS4zNzksMCwyLjUsMS4xMjEsMi41LDIuNVM0MC44NzksMTUsMzkuNSwxNXoiLz48L2c+PGc+PHBhdGggZD0iTTQwLjQxLDIyLjY1NWMtMC40MTItMC4xODctMC45MDMtMC4wNy0xLjE4OCwwLjI4NGMtMi4zMzUsMi44OTQtNS43OTksNC41NTMtOS41MDMsNC41NTMgICAgIGMtNi43MzMsMC0xMi4yMTEtNS40NzgtMTIuMjExLTEyLjIxMWMwLTMuNzA0LDEuNjU5LTcuMTY4LDQuNTUzLTkuNTAzYzAuMzU0LTAuMjg2LDAuNDcxLTAuNzc0LDAuMjg0LTEuMTg4ICAgICBjLTAuMTg4LTAuNDE0LTAuNjI4LTAuNjUtMS4wNzgtMC41NzZDMTMsNS40MDQsNywxMi40OTcsNywyMC44NzljMCwyLjAzNCwwLjM3NSwzLjk3NywxLjAyOSw1Ljc4OGgwICAgICBjLTIuMDg5LDAuOTg0LTMuNjE4LDIuOTY4LTMuOTU3LDUuMzM0QzQuMDQ4LDMyLDQuMDIzLDMyLDQsMzJjLTIuMjA2LDAtNCwxLjc5NC00LDRzMS43OTQsNCw0LDRoMTQgICAgIGMxLjgxLDAsMy40MzItMC44MDksNC41MzMtMi4wODFDMjMuMDU2LDM3Ljk2OCwyMy41ODUsMzgsMjQuMTIxLDM4YzguMzgyLDAsMTUuNDc1LTYsMTYuODY1LTE0LjI2NyAgICAgQzQxLjA2MiwyMy4yODUsNDAuODI1LDIyLjg0Miw0MC40MSwyMi42NTV6IE0xOCwzOEg5Yy0xLjEwMywwLTItMC44OTctMi0yYzAtMC41NTMtMC40NDctMS0xLTFzLTEsMC40NDctMSwxICAgICBjMCwwLjczMiwwLjIxMiwxLjQwOSwwLjU1NiwySDRjLTEuMTAzLDAtMi0wLjg5Ny0yLTJzMC44OTctMiwyLTJjMC4yMTEsMCwwLjQzMiwwLjA0MiwwLjY3NCwwLjEyOCAgICAgYzAuMzEyLDAuMTExLDAuNjU2LDAuMDYyLDAuOTI1LTAuMTMzYzAuMjY4LTAuMTk1LDAuNDIxLTAuNTEsMC40MTEtMC44NEM2LjAwOSwzMy4xNDIsNi4wMDEsMzMuMDE0LDYsMzNjMC0yLjc1NywyLjI0My01LDUtNSAgICAgYzEuNTk4LDAsMy4xMTIsMC43NzgsNC4wNTIsMi4wODFsMCwwQzE1LjY1MSwzMC45MDUsMTYsMzEuOTA1LDE2LDMzYzAsMC41NTMsMC40NDcsMSwxLDFzMS0wLjQ0NywxLTEgICAgIGMwLTEuMDQ1LTAuMjQxLTIuMDMyLTAuNjU0LTIuOTI0QzE3LjU2NCwzMC4wMzcsMTcuNzgxLDMwLDE4LDMwYzIuMjA2LDAsNCwxLjc5NCw0LDRTMjAuMjA2LDM4LDE4LDM4eiBNMjQuMTIxLDM2ICAgICBjLTAuMTU2LDAtMC4zMDgtMC4wMTktMC40NjMtMC4wMjNsMCwwQzIzLjg3NiwzNS4zNTcsMjQsMzQuNjkzLDI0LDM0YzAtMy4zMDktMi42OTEtNi02LTZjLTAuNjE3LDAtMS4yMjksMC4wOTktMS44MjUsMC4yOTYgICAgIEMxNC44NTYsMjYuODQ2LDEyLjk3NCwyNiwxMSwyNmMtMC4zNiwwLTAuNzExLDAuMDM0LTEuMDU2LDAuMDg2QzkuMzQ0LDI0LjQ2LDksMjIuNzExLDksMjAuODc5ICAgICBjMC02LjE4OSwzLjcwNS0xMS41ODMsOS4xODctMTMuOTAxYy0xLjcyOSwyLjM5Mi0yLjY4LDUuMjc4LTIuNjgsOC4zMDRjMCw3LjgzNiw2LjM3NSwxNC4yMTEsMTQuMjExLDE0LjIxMSAgICAgYzMuMDI1LDAsNS45MTItMC45NSw4LjMwNC0yLjY4QzM1LjcwNCwzMi4yOTUsMzAuMzExLDM2LDI0LjEyMSwzNnoiLz48L2c+PC9nPjwvZz48ZyBpZD0icG9pc29uIi8+PGcgaWQ9InN3ZWV0Ii8+PGcgaWQ9InpvbWJpZSIvPjxnIGlkPSJoYXQiLz48ZyBpZD0iY2FuZHkiLz48L3N2Zz4="
              alt=""
            />
            <p className="filter-sidebar-time-text">After 6PM</p>
          </div>
        </div>
      </div>

      {/* <div className="filter-sidebar-departure">
        <p className="filter-sidebar-departure-title">Arrival :</p>
        <div className="filter-sidebar-timings">
          <div className="filter-sidebar-time">
            <img
              className="filter-sidebar-timings-icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTEsLmNscy0ye2ZpbGw6bm9uZTt9LmNscy0ye3N0cm9rZTojMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9PC9zdHlsZT48L2RlZnM+PGcgZGF0YS1uYW1lPSJMYXllciAyIiBpZD0iTGF5ZXJfMiI+PGcgaWQ9IldvcmtzcGFjZSI+PHJlY3QgY2xhc3M9ImNscy0xIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNiwxM2E0LDQsMCwwLDAtOCwwWiIvPjxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjEyIiB4Mj0iMTIiIHkxPSI1IiB5Mj0iNyIvPjxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjE3LjY2IiB4Mj0iMTYuMjQiIHkxPSI3LjM0IiB5Mj0iOC43NiIvPjxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjIwIiB4Mj0iMTgiIHkxPSIxMyIgeTI9IjEzIi8+PGxpbmUgY2xhc3M9ImNscy0yIiB4MT0iNCIgeDI9IjYiIHkxPSIxMyIgeTI9IjEzIi8+PGxpbmUgY2xhc3M9ImNscy0yIiB4MT0iNi4zNCIgeDI9IjcuNzYiIHkxPSI3LjM0IiB5Mj0iOC43NiIvPjxwb2x5bGluZSBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTAgMTcgMTIgMTUgMTQgMTciLz48bGluZSBjbGFzcz0iY2xzLTIiIHgxPSIxMiIgeDI9IjEyIiB5MT0iMTkiIHkyPSIxNSIvPjwvZz48L2c+PC9zdmc+"
              alt=""
            />
            <p className="filter-sidebar-time-text">Before 6AM</p>
          </div>
          <div className="filter-sidebar-time">
            <img
              className="filter-sidebar-timings-icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDI1NiAyNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIyNTYiIHdpZHRoPSIyNTYiLz48Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIGZpbGw9Im5vbmUiIHI9IjYwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxNiIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjE2IiB4MT0iMTI4IiB4Mj0iMTI4IiB5MT0iMzYiIHkyPSIxNiIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjE2IiB4MT0iNjIuOSIgeDI9IjQ4LjgiIHkxPSI2Mi45IiB5Mj0iNDguOCIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjE2IiB4MT0iMzYiIHgyPSIxNiIgeTE9IjEyOCIgeTI9IjEyOCIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjE2IiB4MT0iNjIuOSIgeDI9IjQ4LjgiIHkxPSIxOTMuMSIgeTI9IjIwNy4yIi8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMTYiIHgxPSIxMjgiIHgyPSIxMjgiIHkxPSIyMjAiIHkyPSIyNDAiLz48bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxNiIgeDE9IjE5My4xIiB4Mj0iMjA3LjIiIHkxPSIxOTMuMSIgeTI9IjIwNy4yIi8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMTYiIHgxPSIyMjAiIHgyPSIyNDAiIHkxPSIxMjgiIHkyPSIxMjgiLz48bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxNiIgeDE9IjE5My4xIiB4Mj0iMjA3LjIiIHkxPSI2Mi45IiB5Mj0iNDguOCIvPjwvc3ZnPg=="
              alt=""
            />
            <p className="filter-sidebar-time-text">6AM - 6PM</p>
          </div>
          <div className="filter-sidebar-time">
            <img
              className="filter-sidebar-timings-icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQgNDQ7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA0NCA0NCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9Imdob3N0Ii8+PGcgaWQ9ImJhdCIvPjxnIGlkPSJtb25zdGVyIi8+PGcgaWQ9Imphc29uIi8+PGcgaWQ9ImdyYXZlIi8+PGcgaWQ9InNrdWxsIi8+PGcgaWQ9ImNhdWxkcm9uIi8+PGcgaWQ9ImNsZWF2ZXIiLz48ZyBpZD0iY2FuZGxlIi8+PGcgaWQ9ImNhdCIvPjxnIGlkPSJvd2wiLz48ZyBpZD0icHVta2luIi8+PGcgaWQ9ImV5ZSIvPjxnIGlkPSJ2YW1waXJlIi8+PGcgaWQ9ImZpbmdlciIvPjxnIGlkPSJsZWFmIi8+PGcgaWQ9ImNvZmZpbiIvPjxnIGlkPSJicm9vbSIvPjxnIGlkPSJtb29uIj48Zz48Zz48Y2lyY2xlIGN4PSI0IiBjeT0iOSIgcj0iMSIvPjwvZz48Zz48Y2lyY2xlIGN4PSIxMCIgY3k9IjciIHI9IjEiLz48L2c+PGc+PGNpcmNsZSBjeD0iNiIgY3k9IjE0IiByPSIxIi8+PC9nPjxnPjxjaXJjbGUgY3g9IjQwIiBjeT0iMzMiIHI9IjEiLz48L2c+PGc+PGNpcmNsZSBjeD0iNCIgY3k9IjI1IiByPSIxIi8+PC9nPjxnPjxwYXRoIGQ9Ik0zNywyMWgtOGMtMC41NTMsMC0xLTAuNDQ3LTEtMXMwLjQ0Ny0xLDEtMWg4YzAuNTUzLDAsMSwwLjQ0NywxLDFTMzcuNTUzLDIxLDM3LDIxeiIvPjwvZz48Zz48cGF0aCBkPSJNMjUsMjFoLTJjLTAuNTUzLDAtMS0wLjQ0Ny0xLTFzMC40NDctMSwxLTFoMmMwLjU1MywwLDEsMC40NDcsMSwxUzI1LjU1MywyMSwyNSwyMXoiLz48L2c+PGc+PHBhdGggZD0iTTM5LjUsOGMtMC40NTYsMC0wLjkxMiwwLjA3My0xLjM1MiwwLjIxNkMzNy4yMzQsNi44NDQsMzUuNjk1LDYsMzQsNmMtMi4xMjUsMC0zLjk1LDEuMzM2LTQuNjY0LDMuMjMzICAgICBDMjguOTEsOS4wOCwyOC40NTksOSwyOCw5Yy0yLjIwNiwwLTQsMS43OTQtNCw0czEuNzk0LDQsNCw0aDExLjVjMi40ODEsMCw0LjUtMi4wMTksNC41LTQuNVM0MS45ODEsOCwzOS41LDh6IE0zOS41LDE1aC0xLjA1NiAgICAgQzM4Ljc4OCwxNC40MDksMzksMTMuNzMyLDM5LDEzYzAtMC41NTMtMC40NDctMS0xLTFzLTEsMC40NDctMSwxYzAsMS4xMDMtMC44OTcsMi0yLDJoLTdjLTEuMTAzLDAtMi0wLjg5Ny0yLTJzMC44OTctMiwyLTIgICAgIGMwLjQ5MiwwLDAuOTcsMC4xODksMS4zNDUsMC41MzJjMC4yODQsMC4yNjMsMC42OTcsMC4zMzUsMS4wNTUsMC4xODljMC4zNTgtMC4xNDcsMC42LTAuNDg3LDAuNjItMC44NzUgICAgIEMzMS4xMDIsOS4yNTEsMzIuNDEsOCwzNCw4YzEuMjI4LDAsMi4zMTcsMC43MzksMi43NzgsMS44ODNjMC4xMDksMC4yNzEsMC4zMzIsMC40OCwwLjYwOSwwLjU3NCAgICAgYzAuMjc2LDAuMDkyLDAuNTgzLDAuMDYyLDAuODMyLTAuMDkxQzM4LjYyNiwxMC4xMjMsMzkuMDU3LDEwLDM5LjUsMTBjMS4zNzksMCwyLjUsMS4xMjEsMi41LDIuNVM0MC44NzksMTUsMzkuNSwxNXoiLz48L2c+PGc+PHBhdGggZD0iTTQwLjQxLDIyLjY1NWMtMC40MTItMC4xODctMC45MDMtMC4wNy0xLjE4OCwwLjI4NGMtMi4zMzUsMi44OTQtNS43OTksNC41NTMtOS41MDMsNC41NTMgICAgIGMtNi43MzMsMC0xMi4yMTEtNS40NzgtMTIuMjExLTEyLjIxMWMwLTMuNzA0LDEuNjU5LTcuMTY4LDQuNTUzLTkuNTAzYzAuMzU0LTAuMjg2LDAuNDcxLTAuNzc0LDAuMjg0LTEuMTg4ICAgICBjLTAuMTg4LTAuNDE0LTAuNjI4LTAuNjUtMS4wNzgtMC41NzZDMTMsNS40MDQsNywxMi40OTcsNywyMC44NzljMCwyLjAzNCwwLjM3NSwzLjk3NywxLjAyOSw1Ljc4OGgwICAgICBjLTIuMDg5LDAuOTg0LTMuNjE4LDIuOTY4LTMuOTU3LDUuMzM0QzQuMDQ4LDMyLDQuMDIzLDMyLDQsMzJjLTIuMjA2LDAtNCwxLjc5NC00LDRzMS43OTQsNCw0LDRoMTQgICAgIGMxLjgxLDAsMy40MzItMC44MDksNC41MzMtMi4wODFDMjMuMDU2LDM3Ljk2OCwyMy41ODUsMzgsMjQuMTIxLDM4YzguMzgyLDAsMTUuNDc1LTYsMTYuODY1LTE0LjI2NyAgICAgQzQxLjA2MiwyMy4yODUsNDAuODI1LDIyLjg0Miw0MC40MSwyMi42NTV6IE0xOCwzOEg5Yy0xLjEwMywwLTItMC44OTctMi0yYzAtMC41NTMtMC40NDctMS0xLTFzLTEsMC40NDctMSwxICAgICBjMCwwLjczMiwwLjIxMiwxLjQwOSwwLjU1NiwySDRjLTEuMTAzLDAtMi0wLjg5Ny0yLTJzMC44OTctMiwyLTJjMC4yMTEsMCwwLjQzMiwwLjA0MiwwLjY3NCwwLjEyOCAgICAgYzAuMzEyLDAuMTExLDAuNjU2LDAuMDYyLDAuOTI1LTAuMTMzYzAuMjY4LTAuMTk1LDAuNDIxLTAuNTEsMC40MTEtMC44NEM2LjAwOSwzMy4xNDIsNi4wMDEsMzMuMDE0LDYsMzNjMC0yLjc1NywyLjI0My01LDUtNSAgICAgYzEuNTk4LDAsMy4xMTIsMC43NzgsNC4wNTIsMi4wODFsMCwwQzE1LjY1MSwzMC45MDUsMTYsMzEuOTA1LDE2LDMzYzAsMC41NTMsMC40NDcsMSwxLDFzMS0wLjQ0NywxLTEgICAgIGMwLTEuMDQ1LTAuMjQxLTIuMDMyLTAuNjU0LTIuOTI0QzE3LjU2NCwzMC4wMzcsMTcuNzgxLDMwLDE4LDMwYzIuMjA2LDAsNCwxLjc5NCw0LDRTMjAuMjA2LDM4LDE4LDM4eiBNMjQuMTIxLDM2ICAgICBjLTAuMTU2LDAtMC4zMDgtMC4wMTktMC40NjMtMC4wMjNsMCwwQzIzLjg3NiwzNS4zNTcsMjQsMzQuNjkzLDI0LDM0YzAtMy4zMDktMi42OTEtNi02LTZjLTAuNjE3LDAtMS4yMjksMC4wOTktMS44MjUsMC4yOTYgICAgIEMxNC44NTYsMjYuODQ2LDEyLjk3NCwyNiwxMSwyNmMtMC4zNiwwLTAuNzExLDAuMDM0LTEuMDU2LDAuMDg2QzkuMzQ0LDI0LjQ2LDksMjIuNzExLDksMjAuODc5ICAgICBjMC02LjE4OSwzLjcwNS0xMS41ODMsOS4xODctMTMuOTAxYy0xLjcyOSwyLjM5Mi0yLjY4LDUuMjc4LTIuNjgsOC4zMDRjMCw3LjgzNiw2LjM3NSwxNC4yMTEsMTQuMjExLDE0LjIxMSAgICAgYzMuMDI1LDAsNS45MTItMC45NSw4LjMwNC0yLjY4QzM1LjcwNCwzMi4yOTUsMzAuMzExLDM2LDI0LjEyMSwzNnoiLz48L2c+PC9nPjwvZz48ZyBpZD0icG9pc29uIi8+PGcgaWQ9InN3ZWV0Ii8+PGcgaWQ9InpvbWJpZSIvPjxnIGlkPSJoYXQiLz48ZyBpZD0iY2FuZHkiLz48L3N2Zz4="
              alt=""
            />
            <p className="filter-sidebar-time-text">After 6PM</p>
          </div>
        </div>
      </div> */}
      <div className="fitler-sidebar-button-container">
        <button className="filter-sidebar-button" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
