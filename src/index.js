import React from "react";
import App from "./App";
import { makeServer } from "./server";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Call make Server
makeServer();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
