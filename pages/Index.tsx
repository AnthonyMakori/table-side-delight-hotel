import Navigation from "../src/components/Navigation";
import HeroSection from "../src/components/HeroSection";
import AccommodationSection from "../src/components/AccommodationSection";
import RestaurantSection from "../src/components/RestaurantSection";
import Footer from "../src/components/Footer";
import Display from "../src/components/display/Display";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AccommodationSection />
      <RestaurantSection />
      <Display />
      <Footer />
    </div>
  );
};

export default Index;
