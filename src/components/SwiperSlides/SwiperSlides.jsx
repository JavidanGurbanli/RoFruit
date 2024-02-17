import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./SwiperSlides.scss";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import FruitsSwiper from "../../assets/images/yay-mehsullari_swiper.jpg";
import SvgShape from "../../assets/images/shape.svg";
import VegetablesSwiper from "../../assets/images/terevezler-1_swiper.jpg";
import BerriesSwiper from "../../assets/images/berries_swiper.jpg";
import DryFruitsSwiper from "../../assets/images/dryFruits_swiper.jpeg";
import ExoticSwiper from "../../assets/images/exotic_swiper.webp";
import NutsSwiper from "../../assets/images/nuts_swiper.jpg";
import { useTranslation } from "react-i18next";

const SwiperSlides = () => {
  const { t } = useTranslation(["home"]);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);
  };

  return (
    <Swiper
      speed={1100}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={handleSlideChange}
      className="swiper2"
    >
      {t("home:slides", { returnObjects: true }).map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="slide">
            <div className="slide_image">
              {index === 0 && <img src={FruitsSwiper} alt="fruits" />}
              {index === 1 && <img src={VegetablesSwiper} alt="vegetables" />}
              {index === 2 && <img src={BerriesSwiper} alt="berries" />}
              {index === 3 && <img src={DryFruitsSwiper} alt="dry fruits" />}
              {index === 4 && <img src={ExoticSwiper} alt="exotic fruits" />}
              {index === 5 && <img src={NutsSwiper} alt="nuts" />}
            </div>
            <div
              className={`slide_shape ${
                activeSlide === index ? "active-shape" : ""
              }`}
            >
              <img src={SvgShape} alt="svg shape" />
            </div>
            <div className="slide_text">{slide.title}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlides;
