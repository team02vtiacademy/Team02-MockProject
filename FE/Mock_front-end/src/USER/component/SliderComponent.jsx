import React from 'react';
import "../css/Slider.css";
import Slider from "react-slick";
import anh1  from "../images/anh1.jpg";
import anh2  from "../images/anh2.jpg";
import anh3  from "../images/anh3.jpg";
import anh4  from "../images/anh4.png";
import anh5  from "../images/anh5.png";

const SliderComponent = (arrImg) => {
    
  const  settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
         pauseOnHover: true
      };
    
    return (
        <div className='slider'>
            <Slider {...settings}>
               <div>
               <img src={anh1} alt='anh 1' />
               </div>
               <div>
               <img src={anh2} alt='anh 1' />
               </div>
               <div>
               <img src={anh3} alt='anh 1' />
               </div>
               <div>
               <img src={anh4} alt='anh 1' />
               </div>
               <div>
               <img src={anh5} alt='anh 1' />
               </div>
              
            </Slider>
        </div>
    );
};

export default SliderComponent;

