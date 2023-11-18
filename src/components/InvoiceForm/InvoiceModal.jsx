import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { BiCloudDownload } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useIsInvoiceUnique } from "../../utils/hooks/useIsInvoiceUnique";
import { BiError } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { added, edited } from "../../features/invoices/invoicesSlice";
import { Link, useNavigate } from "react-router-dom";

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792],
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-001.pdf");
  });
}

const InvoiceModal = ({
  showModal,
  closeModal,
  formData,
  isReview = true,
  preInvoiceNumber,
  isEdit
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInvoiceUnique = useIsInvoiceUnique(formData.invoiceNumber);
  const saveInvoice = () => {
    dispatch(added(formData));
    navigate("/");
  };
  const editInvoice = () => {
    const editData = {
      preInvoiceNumber,
      newData: formData,
    };
    dispatch(edited(editData));
    navigate("/");
  };

  return (
    <>
      <Modal show={showModal} onHide={closeModal} size="lg" centered className="modal">
        <div id="invoiceCapture">
          <div className=" d-flex flex-row justify-content-between align-items-start bg-light w-100 px-4 py-2 pt-4">
            <div className="w-100">
              <h4 className="fw-bold my-1 bold">
                {formData.billFrom.name || "John Doe"}
              </h4>
              <h6 className="fw-bold text-secondary mb-1">
                Invoice #: {formData.invoiceNumber || ""}
              </h6>
            </div>
            <div className="text-end ms-4">
              <h6 className="fw-bold mt-1 mb-1 ">Amount&nbsp;Due:</h6>
              <h5 className="fw-bold text-secondary ">
                {" "}
                {formData.currency} {formData.calculations.total}
              </h5>
            </div>
          </div>
          <div className="py-2 px-4">
            <Row className="mb-4">
              <Col md={4}>
                <div className="fw-bold">Billed to:</div>
                <div>{formData.billTo.name || ""}</div>
                <div>{formData.billTo.billingAddress || ""}</div>
                <div>{formData.billTo.email || ""}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold">Billed From:</div>
                <div>{formData.billFrom.name || ""}</div>
                <div>{formData.billFrom.billingAddress || ""}</div>
                <div>{formData.billFrom.email || ""}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold mt-2">Date Of Issue:</div>
                <div>{formData.dueDate || ""}</div>
              </Col>
            </Row>
            <Table className="mb-0">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">PRICE</th>
                  <th className="text-end">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, i) => {
                  return (
                    <tr id={i} key={i}>
                      <td style={{ width: "70px" }}>{item.quantity}</td>
                      <td>
                        {item.name} - {item.description}
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {formData.currency} {item.price}
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {formData.currency} {item.price * item.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Table>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    SUBTOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {formData.currency} {formData.calculations.subTotal}
                  </td>
                </tr>
                {formData.calculations.tax !== 0.0 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      TAX
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {formData.currency} {formData.calculations.tax}
                    </td>
                  </tr>
                )}
                {formData.calculations.discount !== 0.0 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      DISCOUNT
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {formData.currency} {formData.calculations.discount}
                    </td>
                  </tr>
                )}
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    TOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {formData.currency} {formData.calculations.total}
                  </td>
                </tr>
              </tbody>
            </Table>
            {formData.notes && (
              <div className="bg-light py-3 px-4 rounded">{formData.notes}</div>
            )}
          </div>
        </div>
        <div className="pb-4 px-4">
          <Row>
            <Col md={6}>
              {isEdit ? (
                <Button
                  variant="primary"
                  className="d-block w-100 save-btn"
                  onClick={editInvoice}
                >
                  <FaSave
                    style={{ width: "15px", height: "15px", marginTop: "-3px" }}
                    className="me-2"
                  />
                  Save Edit
                </Button>
              ) : (
                isReview && (
                  <Button
                    variant="primary"
                    className="d-block w-100 save-btn"
                    disabled={!isInvoiceUnique}
                    onClick={saveInvoice}
                  >
                    <FaSave
                      style={{
                        width: "15px",
                        height: "15px",
                        marginTop: "-3px",
                      }}
                      className="me-2"
                    />
                    {isInvoiceUnique ? "Save Invoice" : "Saved"}
                  </Button>
                )
              )}
            </Col>
            <Col md={6}>
              <Button
                variant="outline-primary"
                className="d-block w-100 mt-3 mt-md-0 download-btn"
                onClick={GenerateInvoice}
                disabled={
                  !isInvoiceUnique && isReview && !isEdit
                }
              >
                <BiCloudDownload
                  style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                  className="me-2"
                />
                Download Copy
              </Button>
            </Col>
          </Row>

          {!isInvoiceUnique && isReview && !isEdit && (
            <p className="warn">
              <BiError />
              Invoice already exist with the same Invoice number
              <Link to="/">&#40;See&#41;</Link>
            </p>
          )}
        </div>
      </Modal>
      <hr className="mt-4 mb-3" />
    </>
  );
};

export default InvoiceModal;
