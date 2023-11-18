import { TiEdit } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Edit = ({ invoiceNumber }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`edit-invoice/${invoiceNumber}`);
  };
  return (
    <div onClick={handleEdit}>
      <TiEdit size={25} />
    </div>
  );
};

export default Edit;
