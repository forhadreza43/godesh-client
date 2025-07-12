import clsx from "clsx";

const Badge = ({ children, className = "" }) => {
  const baseStyles =
    "bg-yellow-600 text-white text-xs px-4 py-1 rounded-full text-center text-nowrap";
  return <span className={clsx(baseStyles, className)}>{children.toUpperCase()}</span>;
};

export default Badge;
