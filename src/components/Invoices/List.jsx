import Checkbox from "./Checkbox";
import Copy from "./Copy";
import Edit from "./Edit";

const List = ({ invoice, selectedInvoice, setSelectedInvoice }) => {
  return (
    <>
      <td>
        <Checkbox
          invoiceNumber={invoice.invoiceNumber}
          selectedInvoice={selectedInvoice}
          setSelectedInvoice={setSelectedInvoice}
        />
      </td>
      <td>{invoice.invoiceNumber}</td>
      <td>{invoice.billFrom.name}</td>
      <td>{invoice.billTo.name}</td>
      <td className="optional">{invoice.dueDate}</td>
      <td>
        {invoice.currency} {invoice.calculations.total}
      </td>
      <td>
        <Edit invoiceNumber={invoice.invoiceNumber} />
      </td>
      <td>
        <Copy invoiceNumber={invoice.invoiceNumber}/>
      </td>
    </>
  );
};

export default List;
