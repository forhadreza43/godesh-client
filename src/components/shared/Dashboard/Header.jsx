const Header = ({title="DashBoard"}) => {
  return (
    <div className="sticky top-0 z-20 border-b-1 border-accent/70  px-4 py-2  md:px-6">
          <h1 className="text-lg font-semibold text-gray-800">{ title}</h1>
    </div>
  );
};

export default Header;