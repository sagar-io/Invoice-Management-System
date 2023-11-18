import { useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetInvoice } from "../../utils/hooks/useGetInvoice";
import { Container } from "react-bootstrap";
import { formSchema } from "../../utils/schema/invoiceFormSchema";
import { handleCalculateTotal } from "./calculator";
import InvoiceBasicInfo from "./InvoiceBasicInfo";
import CurrencySelector from "./CurrencySelector";

const InvoiceForm = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation(); // for copied Invoice
  const { id } = useParams(); // for edit Invoice

  const preInvoice = useGetInvoice(id || state);
  console.log(id);
  console.log(typeof id);

  const [formData, setFormData] = useImmer(formSchema);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    handleCalculateTotal(formData, setFormData);
  }, [formData]);

  useEffect(() => {
    console.log(preInvoice);
    if (id && !preInvoice) {
      navigate("/error-page");
    }
    if (preInvoice) {
      setFormData(preInvoice);
    }
  }, []);

  const handleRowDel = (item) => {
    const index = formData.items.indexOf(item);
    setFormData((draft) => {
      draft.items.splice(index, 1);
    });
  };

  const handleAdded = (e) => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const item = {
      id: id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setFormData((draft) => {
      draft.items.push(item);
    });
  };

  const onItemizedItemEdit = (e) => {
    const { id, name, value } = e.target;
    setFormData((draft) => {
      draft.items.map((item) => item.id === id && (item[name] = value));
    });
  };

  const handleInputChange = (e) => {
    setFormData((draft) => {
      draft[e.target.name] = e.target.value;
    });
  };
  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const closeModal = (e) => setIsModalOpen(false);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 invoice-form">
      <Container>
        <Form ref={formRef} onSubmit={openModal} name="invoice-form">
          <Row>
            <Col md={8} lg={9}>
              <Card className="p-4 p-xl-5 my-3 my-xl-4">
                <InvoiceBasicInfo
                  formData={formData}
                  setFormData={setFormData}
                  handleInputChange={handleInputChange}
                />
                <InvoiceItem
                  onItemizedItemEdit={onItemizedItemEdit}
                  onRowAdd={handleAdded}
                  onRowDel={handleRowDel}
                  currency={formData.currency}
                  items={formData.items}
                />
                <Row className="mt-4 justify-content-end">
                  <Col lg={6}>
                    <div className="d-flex flex-row align-items-start justify-content-between">
                      <span className="fw-bold">Subtotal:</span>
                      <span>
                        {formData.currency}
                        {formData.calculations.subTotal}
                      </span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                      <span className="fw-bold">Discount:</span>
                      <span>
                        <span className="small ">
                          ({formData.discountRate || 0}%)
                        </span>
                        {formData.currency}
                        {formData.calculations.discount || 0}
                      </span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                      <span className="fw-bold">Tax:</span>
                      <span>
                        <span className="small ">
                          ({formData.taxRate || 0}%)
                        </span>
                        {formData.currency}
                        {formData.calculations.tax || 0}
                      </span>
                    </div>
                    <hr />
                    <div
                      className="d-flex flex-row align-items-start justify-content-between"
                      style={{
                        fontSize: "1.125rem",
                      }}
                    >
                      <span className="fw-bold">Total:</span>
                      <span className="fw-bold">
                        {formData.currency}
                        {formData.calculations.total || 0}
                      </span>
                    </div>
                  </Col>
                </Row>
                <hr className="my-4" />
                <Form.Label className="fw-bold">Notes:</Form.Label>
                <Form.Control
                  placeholder="Thanks for your business!"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  as="textarea"
                  className="my-2 notes"
                  rows={1}
                />
              </Card>
            </Col>
            <Col md={4} lg={3}>
              <div className="sticky-top pt-md-3 pt-xl-4">
                <Button
                  constiant="primary"
                  type="submit"
                  className="d-block w-100"
                >
                  Review Invoice
                </Button>

                {isModalOpen && (
                  <InvoiceModal
                    showModal={isModalOpen}
                    closeModal={closeModal}
                    formData={formData}
                    preInvoiceNumber={preInvoice?.invoiceNumber}
                    isEdit={1 && typeof id != "undefined"}
                  />
                )}
                <CurrencySelector handleInputChange={handleInputChange} />

                <Form.Group className="my-3">
                  <Form.Label className="fw-bold">Tax rate:</Form.Label>
                  <InputGroup className="my-1 flex-nowrap">
                    <Form.Control
                      name="taxRate"
                      type="number"
                      value={formData.taxRate}
                      onChange={handleInputChange}
                      className="bg-white border"
                      placeholder="0.0"
                      min="0.00"
                      step="0.01"
                      max="100.00"
                    />
                    <InputGroup.Text className="bg-light fw-bold text-secondary small">
                      %
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="my-3">
                  <Form.Label className="fw-bold">Discount rate:</Form.Label>
                  <InputGroup className="my-1 flex-nowrap">
                    <Form.Control
                      name="discountRate"
                      type="number"
                      value={formData.discountRate}
                      onChange={handleInputChange}
                      className="bg-white border"
                      placeholder="0.0"
                      min="0.00"
                      step="0.01"
                      max="100.00"
                    />
                    <InputGroup.Text className="bg-light fw-bold text-secondary small">
                      %
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default InvoiceForm;
