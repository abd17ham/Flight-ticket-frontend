import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
