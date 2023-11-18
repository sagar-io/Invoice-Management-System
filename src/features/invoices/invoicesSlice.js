import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    added: (state, action) => {
      state.push(action.payload);
    },
    deleted: (state, action) => {
      action.payload.forEach((invoiceNumber) =>
        state.forEach((invoice, index) => {
          if (invoice.invoiceNumber === invoiceNumber) state.splice(index, 1);
        })
      );
    },
    edited: (state, action) => {
      const { editableInvoiceNumber, newData } = action.payload;
      const index = state.findIndex(
        (invoice) => invoice.invoiceNumber === editableInvoiceNumber
      );
      state.splice(index, 1);
      state.push(newData);
    },
  },
});

export default invoiceSlice.reducer;
export const { added, deleted, edited } = invoiceSlice.actions;
