import Invoices from "../components/Invoices";
import Menubar from "../components/Menubar";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Menubar />
      <Invoices />
    </div>
  );
};

export default Home;
