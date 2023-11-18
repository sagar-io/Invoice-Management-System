import { useSelector } from "react-redux";
import List from "./List";

const InvoicesList = ({ selectedInvoice, setSelectedInvoice, setModal }) => {
  const invoicesData = useSelector((state) => state.invoices);

  const invoiceListElements = invoicesData.map((invoice, id) => (
    <tr
      key={`invoice-list-${id}`}
      onClick={() =>
        setModal((prev) => ({ ...prev, isOpen: true, data: invoice }))
      }
    >
      <List
        invoice={invoice}
        selectedInvoice={selectedInvoice}
        setSelectedInvoice={setSelectedInvoice}
      />
    </tr>
  ));
  return <>{invoiceListElements}</>;
};

export default InvoicesList;
