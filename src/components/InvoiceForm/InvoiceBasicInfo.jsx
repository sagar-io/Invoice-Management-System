import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const InvoiceBasicInfo = ({ formData, setFormData, handleInputChange }) => {
  return (
    <>
      <div className="d-flex flex-row align-items-start justify-content-between mb-3 flex-wrap">
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <div className="mb-2">
              <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
              <span className="current-date">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center my-2">
            <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
            <Form.Control
              type="date"
              value={formData.dueDate}
              name={"dueDate"}
              onChange={handleInputChange}
              style={{
                maxWidth: "150px",
              }}
              required="required"
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center">
          <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
          <Form.Control
            type="number"
            value={formData.invoiceNumber}
            name={"invoiceNumber"}
            onChange={handleInputChange}
            min="1"
            style={{
              maxWidth: "70px",
            }}
            required="required"
          />
        </div>
      </div>
      <hr className="my-4" />
      <Row className="mb-5">
        <Col>
          <Form.Label className="fw-bold">Bill to:</Form.Label>
          <Form.Control
            placeholder={"Who is this invoice to?"}
            rows={3}
            value={formData.billTo.name}
            type="text"
            name="billTo"
            className="my-2"
            onChange={(e) =>
              setFormData((draft) => {
                draft.billTo.name = e.target.value;
              })
            }
            autoComplete="name"
            required="required"
          />
          <Form.Control
            placeholder={"Email address"}
            value={formData.billTo.email}
            type="email"
            name="billToEmail"
            className="my-2"
            onChange={(e) =>
              setFormData((draft) => {
                draft.billTo.email = e.target.value;
              })
            }
            autoComplete="email"
            required="required"
          />
          <Form.Control
            placeholder={"Billing address"}
            value={formData.billTo.billingAddress}
            type="text"
            name="billToAddress"
            className="my-2"
            autoComplete="address"
            onChange={(e) =>
              setFormData((draft) => {
                draft.billTo.billingAddress = e.target.value;
              })
            }
            required="required"
          />
        </Col>
        <Col>
          <Form.Label className="fw-bold">Bill from:</Form.Label>
          <Form.Control
            placeholder={"Who is this invoice from?"}
            rows={3}
            value={formData.billFrom.name}
            type="text"
            name="billFrom"
            className="my-2"
            onChange={(e) =>
              setFormData((draft) => {
                draft.billFrom.name = e.target.value;
              })
            }
            autoComplete="name"
            required="required"
          />
          <Form.Control
            placeholder={"Email address"}
            value={formData.billFrom.email}
            type="email"
            name="billFromEmail"
            className="my-2"
            onChange={(e) =>
              setFormData((draft) => {
                draft.billFrom.email = e.target.value;
              })
            }
            autoComplete="email"
            required="required"
          />
          <Form.Control
            placeholder={"Billing address"}
            value={formData.billFrom.billingAddress}
            type="text"
            name="billFromAddress"
            className="my-2"
            autoComplete="address"
            onChange={(e) =>
              setFormData((draft) => {
                draft.billFrom.billingAddress = e.target.value;
              })
            }
            required="required"
          />
        </Col>
      </Row>
    </>
  );
};

export default InvoiceBasicInfo;
