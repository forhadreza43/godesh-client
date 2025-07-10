import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Overview from "../components/Overview";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <Hero /> 
      <Overview />
    </div>
  );
};

export default Home;
