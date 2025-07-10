import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100dvh-353px)] w-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
