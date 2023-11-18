import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const EditableField = ({ onItemizedItemEdit, cellData }) => {
  return (
    <InputGroup className="my-1">
      {cellData.leading != null && (
        <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2">
          <span
            className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
            style={{ width: "20px", height: "20px" }}
          >
            {cellData.leading}
          </span>
        </InputGroup.Text>
      )}
      <Form.Control
        className={`${cellData.textAlign} items-inputs`}
        type={cellData.type}
        placeholder={cellData.placeholder}
        min={cellData.min}
        name={cellData.name}
        id={cellData.id}
        value={cellData.value}
        step={cellData.step}
        presicion={cellData.presicion}
        aria-label={cellData.name}
        onChange={onItemizedItemEdit}
        required
      />
    </InputGroup>
  );
};

export default EditableField;
