import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AccommodationSection from "@/components/AccommodationSection";
import RestaurantSection from "@/components/RestaurantSection";
import Footer from "@/components/Footer";
import Display from "@/components/display/Display";

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
