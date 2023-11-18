import Form from "react-bootstrap/Form";

const CurrencySelector = ({ handleInputChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">Currency:</Form.Label>
      <Form.Select
        name="currency"
        onChange={handleInputChange}
        className="btn btn-light my-1"
        aria-label="Change Currency"
      >
        <option value="$">USD (United formDatas Dollar)</option>
        <option value="£">GBP (British Pound Sterling)</option>
        <option value="¥">JPY (Japanese Yen)</option>
        <option value="$">CAD (Canadian Dollar)</option>
        <option value="$">AUD (Australian Dollar)</option>
        <option value="$">SGD (Signapore Dollar)</option>
        <option value="¥">CNY (Chinese Renminbi)</option>
        <option value="₿">BTC (Bitcoin)</option>
      </Form.Select>
    </Form.Group>
  );
};

export default CurrencySelector;
