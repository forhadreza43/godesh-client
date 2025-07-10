const Header = ({ title = "DashBoard" }) => {
  return (
    <div className="sticky top-0 z-20 mb-5 border-b-1 border-accent/70 bg-green-50 px-4 py-3 lg:py-6 md:px-6">
      <h1 className="text-center text-lg font-semibold text-gray-800">
        {title}
      </h1>
    </div>
  );
};

export default Header;
