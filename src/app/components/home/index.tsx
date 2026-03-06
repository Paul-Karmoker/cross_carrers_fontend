import Navbar from "./navbar";
import Footer from "./footer";
import Marqueel from "./marqueel";
import Banner from "./banner";
import Slider from "./slider";
import Guide from "./guide"
function index() {
  return (
    <>
      <Navbar />
      <Marqueel />
      <Banner />
      <Slider />
      <Guide />
      <Footer />
    </>
  );
}
export default index;