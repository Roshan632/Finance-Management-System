import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import { store } from "./app/store";

import { Toaster } from "react-hot-toast";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
        <Toaster position="top-right"/>
      </Provider>
    </React.StrictMode>
  );
});