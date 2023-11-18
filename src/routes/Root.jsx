import { Link, Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div>
      <header>
        <div>
          <Link to="/">
            <h2>Invoice Generator</h2>
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
