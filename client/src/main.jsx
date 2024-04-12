import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./Components/ThemeProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
          <App />

          </ThemeProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
