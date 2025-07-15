import Hero from "../components/Hero";
import Overview from "../components/Overview";
import SubscribeSection from "../components/SubscribeSection";
import TourismAndTravelGuide from "../components/TourismAndTravelGuide";
import TouristStories from "../components/TouristStories";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Hero />
      <Overview />
      <TourismAndTravelGuide />
      <TouristStories />
      <WhyChooseUs />
      <SubscribeSection/>
    </>
  );
};

export default Home;
