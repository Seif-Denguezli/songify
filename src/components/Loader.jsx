import { loader } from "../assets";

const Loader = ({ title }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <img src={loader} alt="loader" className="w-32 h-32" />
      <h1 className="font-bold text-3xl text-white mt-2">
        {title || "Loading ..."}
      </h1>
    </div>
  );
};

export default Loader;
