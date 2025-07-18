import AnimatedSection from "../Animation/AnimatedSection";
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
      <AnimatedSection animation="fade-up">
        <Overview />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <TourismAndTravelGuide />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <TouristStories />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <WhyChooseUs />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
      <SubscribeSection />
      </AnimatedSection>
    </>
  );
};

export default Home;
