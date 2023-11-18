import { useSelector } from "react-redux";

export const useIsInvoiceUnique = (invoiceNumber) => {
  const invoices = useSelector((state) => state.invoices);
  return !invoices.some((invoice) => invoice.invoiceNumber === invoiceNumber);
};
