import Navbar from "@/app/components/main/navbar";
import Banner from "@/app/components/main/banner";
import Slider from "@/app/components/main/slider";
import Footer from "@/app/components/main/footer";
import Marqueer from "@/app/components/main/marqueer";
import Marqueel from "@/app/components/main/marqueel";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Marqueer />
      <Banner />
      <Slider />
      <Marqueel />
      <Footer />
    </>
  );
};

export default HomePage;
