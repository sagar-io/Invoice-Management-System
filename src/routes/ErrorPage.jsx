import { BiError } from "react-icons/bi";

export const ErrorPage = () => {
  return (
    <div className="error-wrapper">
      <div className="warning my-1">
        <BiError size={100} />
        <p>404</p>
      </div>
      <h1>Not Found</h1>
    </div>
  );
};
