import { Link } from "react-router-dom";
import newInvoiceImg from "../../assets/images/add-file.png";

const Menubar = () => {
  return (
    <section className="menubar-wrapper">
      <Link to="new-invoice">
        <div className="new-card">
          <img src={newInvoiceImg} width={100} alt="New Document" />
        </div>
      </Link>
    </section>
  );
};

export default Menubar;
