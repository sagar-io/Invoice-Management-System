const Checkbox = ({ invoiceNumber, selectedInvoice, setSelectedInvoice }) => {
  const handleCheckBox = () => {
    const indexOfInvoice = selectedInvoice.indexOf(invoiceNumber);
    if (indexOfInvoice !== -1) {
      setSelectedInvoice((allInvoices) => {
        allInvoices.splice(indexOfInvoice, 1);
        return [...allInvoices];
      });
    } else {
      setSelectedInvoice((allInvoices) => {
        allInvoices.push(invoiceNumber);
        return [...allInvoices];
      });
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        onClick={(e) => {e.stopPropagation()}}
        checked={selectedInvoice.includes(invoiceNumber)}
        onChange={handleCheckBox}
      />
    </div>
  );
};

export default Checkbox;
