import { FaMapMarkedAlt } from "react-icons/fa";

const Loading = ({ fullscreen = true }) => {
  return (
    <div
      className={`${
        fullscreen ? "fixed inset-0" : ""
      } z-50 flex items-center justify-center bg-white dark:bg-gray-100`}
    >
      <div className="flex animate-pulse flex-col items-center justify-center space-y-4">
        <FaMapMarkedAlt className="animate-bounce text-5xl text-accent" />
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
