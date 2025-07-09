import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const RootLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-[calc(100vh-353px)] w-full flex items-center justify-center">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
