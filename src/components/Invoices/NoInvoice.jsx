import invoiceBanner from "../../assets/images/invoice-banner.png";
import arrow from "../../assets/images/arrow.png";

const NoInvoice = () => {
  return (
    <div className="no-invoice-wrapper">
      <div className="arrow"><img src={arrow} alt="" width={100}/></div>
      <img src={invoiceBanner} width={380} alt=""/>
      <p>You don't have any saved Invoice</p>
    </div>
  );
};

export default NoInvoice;
