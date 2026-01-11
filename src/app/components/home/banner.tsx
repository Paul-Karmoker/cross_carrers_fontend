import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Advertisement} from "@/types"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const Banner: FC = () => {
  
  const advertisements: Advertisement[] = [
    {
      id: 0,
      image: "https://i.ibb.co/HkMRZnb/6.jpg",
      alt: "Advertisement 2",
    },
    {
      id: 1,
      image: "https://i.ibb.co/7x4CmDy8/1.jpg",
      alt: "Advertisement 1",
    },
    {
      id: 2,
      image: "https://i.ibb.co/KxyNXQfz/2.jpg",
      alt: "Advertisement 2",
    },
    {
      id: 3,
      image: "https://i.ibb.co/ZpXSHBPj/3.jpg",
      alt: "Advertisement 3",
    },
    {
      id: 4,
      image: "https://i.ibb.co/ZpHcHMXM/4.jpg",
      alt: "Advertisement 1",
    },
    {
      id: 5,
      image: "https://i.ibb.co.com/FkL4xXDX/5.jpg",
      alt: "Advertisement 1",
    },
  ];

 
  const swiperConfig: SwiperOptions = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    navigation: true,
    modules: [Autoplay, Pagination, Navigation],
  };

  
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row mt-10 -mb-4">
      <div className="w-full md:w-1/2 mt-4 md:mt-14">
        <div>
          <h1 className="text-5xl font-bold mt-20 md:mt-8">
            <img
              src="https://i.ibb.co/Y75Y5NSb/banner.gif"
              alt="banner"
            />
          </h1>
          <br />
          <p className="text-2xl font-bold font-serif text-foreground-600 text-center -mt-2">
            &quot;
            <span className="text-green-700">Empowering </span>
            Future Leaders in the Development &amp; Humanitarian Sector.
            &quot;
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="mt-10 p-8 ml-1 md:ml-6">
          <Swiper {...swiperConfig} className="mySwiper">
            {advertisements.map((ad) => (
              <SwiperSlide key={ad.id}>
                <img
                  src={ad.image}
                  alt={ad.alt}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Banner;
