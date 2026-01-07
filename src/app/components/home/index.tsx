import Navbar from "./navbar";
import Footer from "./footer";
import Marqueel from "./marqueel";
import Marqueer from "./marqueel";
import Slider from "./slider";
import Banner from "./banner";
function index() {
  return (
    <>
      <Navbar />
      <Marqueel/>
      <Banner />
      <Slider />
      <Marqueer/>
      <Footer />
    </>
  );
}

export default index;
