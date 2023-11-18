import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/css/main.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root";
import { ErrorPage } from "./routes/ErrorPage";
import Home from "./routes/Home";
import { Provider } from "react-redux";
import store from "./app/store";
import NewInvoice from "./routes/NewInvoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "new-invoice",
        element: <NewInvoice />,
      },
      {
        path: "edit-invoice/:id",
        element: <NewInvoice />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
reportWebVitals();
