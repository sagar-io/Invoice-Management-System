import { useDispatch, useSelector } from "react-redux";
import InvoicesList from "./InvoicesList";
import { useState } from "react";
import { deleted } from "../../features/invoices/invoicesSlice";
import InvoiceModal from "../InvoiceForm/InvoiceModal";
import NoInvoice from "./NoInvoice";

const Invoices = () => {
  const dispatch = useDispatch();
  const invoicesData = useSelector((state) => state.invoices);
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    data: "",
  });
  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  const handleInvoiceDeletion = () => dispatch(deleted(selectedInvoice));

  return (
    <div className="invoices-wrapper">
      {invoicesData.length > 0 ? (
        <>
          <h2>Your Invoices</h2>
          <div className="invoice-commands">
            <button
              onClick={handleInvoiceDeletion}
              disabled={selectedInvoice.length === 0}
            >
              Delete Selected
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  <span className="optional">Invoice</span> No.
                </th>
                <th>Bill From</th>
                <th>Bill To</th>
                <th className="optional">Due Date</th>
                <th>Total</th>
                <th>Edit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                <InvoicesList
                  selectedInvoice={selectedInvoice}
                  setSelectedInvoice={setSelectedInvoice}
                  setModal={setModal}
                />
              }
            </tbody>
          </table>
        </>
      ) : (
        <NoInvoice />
      )}
      {modal.isOpen && (
        <InvoiceModal
          showModal={modal.isOpen}
          closeModal={closeModal}
          formData={modal.data}
          isReview={false}
        />
      )}
    </div>
  );
};

export default Invoices;
