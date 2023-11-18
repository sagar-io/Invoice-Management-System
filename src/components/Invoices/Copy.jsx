import { useNavigate } from "react-router-dom";

const Copy = ({ invoiceNumber }) => {
  const handleCopy = () => {
    navigate("/new-invoice", { state: invoiceNumber });
  };
  const navigate = useNavigate();
  return (
    <button className="copy" onClick={handleCopy}>
      Copy
    </button>
  );
};

export default Copy;
