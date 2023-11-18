import { useSelector } from "react-redux";

export const useGetInvoice = (invoiceNumber) => {
  const invoices = useSelector((state) => state.invoices);

  return invoices.find((invoice) => invoice.invoiceNumber === invoiceNumber);
};
