import React, { Component } from "react";
// import OwlCarousel from 'react-owl-carousel';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./testimonial.css";
import { Qoutes, Salonimg2 } from "../../../Assets/index";
import { profile1, profile2, profile3, profile4, profile5 } from "../../../Assets/index";


function MultiSlisder() {
  const slide_img = [
    {
      detail:
        "The Salon Substitute is the best idea ever! As a massage therapist it’s a great way to change up my days and get out and meet new people. Everyone has been super helpful and great to work with. The website is quick and easy to use. There’s no time commitment and I only work when my schedule allows. I highly recommend this new service to anyone in the salon and spa industry!.",
      name: "Lisa",
      ref: "Massage Therapist",
      img: Salonimg2
    },
    {
      detail:
        "Salon Substitute is an amazing innovative idea. as a salon owner and stylist I am always looking for professionals to fill in the gaps.  With everything from maternity leave, large spa party's or unforeseen health issues, salon substitute gives me the opportunity to keep my business going.",
      name: "Jessica",
      ref: "Harbour Salon and Spa",
      img: Salonimg2

    },
    {
      detail:
        "Salon substitute is a brilliant idea. I love the whole concept and knowing i now have a place to find support if i have a last minute emergency to find qualified provider takes the weight off my shoulders.",
      name: "Isla",
      ref: "Flawless Makeup",
      img: Salonimg2

    }
    // {
    //   detail:
    //     "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    //   name: "Rowhan Marlin",
    //   ref: "CEO Lyra’s Hair Design",
    //   img: profile3

    // },
    // {
    //   detail:
    //     "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    //   name: "Rowhan Marlin",
    //   ref: "CEO Lyra’s Hair Design",
    //   img: profile4

    // },
    // {
    //   detail:
    //     "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    //   name: "Rowhan Marlin",
    //   ref: "CEO Lyra’s Hair Design",
    //   img: profile2
    // },
    // {
    //   detail:
    //     "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    //   name: "Rowhan Marlin",
    //   ref: "CEO Lyra’s Hair Design",
    //   img: profile1
    // },
    // {
    //   detail:
    //     "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    //   name: "Rowhan Marlin",
    //   ref: "CEO Lyra’s Hair Design",
    //   img: profile3
    // },
    // {
    //   detail:
    //     "Learning is a Global training provider based across the UK that specialises in accrediated and bespoke training courses.",
    //   name: "Rowhan Marlin",
    //   ref: "CEO Lyra’s Hair Design",
    //   img: profile4
    // },
  ];

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  };
  // const dotsAble = (index) =>{
  //   

  // }
  const CustomDot = ({ onMove, index, onClick, active }) => {
    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.

    // 
    // if(active){
    //   
    //  const  acttives = index
    // }
    // const dotsAbles = () =>{
    //   if(active){
    //    const  acttives = index
    //    dotsAble(acttives)
    //   }

    // }

    return (
      <>
        <li className={active ? "active clicking marg wiidthh" : "inactive diss wiidthh"} style={{cursor:"pointer"}} onClick={() => onClick()}>
          <img src={slide_img[index].img} />
        </li>


      </>
    );
  };
  return (
    <div id="main-slide" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner corsaaalBack">
        <div class="divLanding">
          <h1 class="paragraph btm">
            Our Customers
            <br /> <span class="span2">Testimonials</span>
          </h1>
        </div>
        <Carousel
          responsive={responsive}
          additionalTransfrom={0}
          arrows={false}
          autoPlaySpeed={99999999000}
          centerMode={false}
          className=""
          dotListClass=""
          draggable={true}
          focusOnSelect={true}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
          customDot={<CustomDot />}
        >
          {slide_img.map((item, i) => {
            return (
              <div className="carousel-item active">
                <div className="itemss">
                  <div className="imgg">
                    <img src={Qoutes}></img>
                  </div>
                  <div className="contentss">
                    <h5>{item.detail}</h5>
                  </div>
                  <div className="contentname">
                    <p className="namess">{item.name}</p>
                    <p className="rrefff">{item.ref}</p>
                  </div>

                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default MultiSlisder;
