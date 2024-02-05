import React from "react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./testimonial.css";
import { Qoutes, profile1,profile2,profile3,profile4,profile5} from "../../../Assets/index";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

SwiperCore.use([EffectCoverflow, Pagination]);
// if you want to use array
const slide_img = [
  {
    detail:
      "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    name: "Rowhan Marlin",
    ref: "CEO Lyra’s Hair Design",
  },
  {
    detail:
      "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    name: "Rowhan Marlin",
    ref: "CEO Lyra’s Hair Design",
  },
  {
    detail:
      "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    name: "Rowhan Marlin",
    ref: "CEO Lyra’s Hair Design",
  },
  {
    detail:
      "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    name: "Rowhan Marlin",
    ref: "CEO Lyra’s Hair Design",
  },
  {
    detail:
      "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    name: "Rowhan Marlin",
    ref: "CEO Lyra’s Hair Design",
  },
  {
    detail:
      "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    name: "Rowhan Marlin",
    ref: "CEO Lyra’s Hair Design",
  },
  {
    detail:
      "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    name: "Rowhan Marlin",
    ref: "CEO Lyra’s Hair Design",
  },
  {
    detail:
      "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    name: "Rowhan Marlin",
    ref: "CEO Lyra’s Hair Design",
  },
  {
    detail:
      "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    name: "Rowhan Marlin",
    ref: "CEO Lyra’s Hair Design",
  },
];

const TestimonialsSlider = (props) => {
   
 
  return (
    <>

      <div class="divLanding">
        <h1 class="paragraph btm">
          Our Customers
          <br /> <span class="span2">Testimonials</span>
        </h1>
      </div>
      <div className="sliiess">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 40,
            stretch: 20,
            depth: 50,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          className="mySwiper"
        >
          {slide_img.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="itemss">
                    <div className="imgg">
                    <img src={Qoutes}></img>

                    </div>
                  <div className="content">
                    <h5>{item.detail}</h5>
                    <p>{item.name}</p>
                    <span>{item.ref}</span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default TestimonialsSlider;
