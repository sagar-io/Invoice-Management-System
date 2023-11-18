import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "../features/invoices/invoicesSlice";

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
});

export default store;
