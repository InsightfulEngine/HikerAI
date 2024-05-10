import React, { useState, useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "../App.css";
import logo from "../images/logo2.png";
import { Link } from "react-router-dom";
import ParallaxLoader from "../components/ParallaxLoader";
import { FaArrowDown } from "react-icons/fa";

function Home() {
  const [parallaxReady, setParallaxReady] = useState(false);
  const parallaxRef = useRef(null);

  const handleParallaxReady = () => {
    setParallaxReady(true);
  };

  const handleScrollDown = () => {
    if (parallaxRef.current) {
      parallaxRef.current.scrollTo(1);
    }
  };
  return (
    <div className="App">
      {!parallaxReady && <ParallaxLoader />}

      <Parallax
        pages={2}
        style={{ top: "0", left: "0" }}
        className="animation"
        ready={handleParallaxReady}
        ref={parallaxRef}
      >
        <ParallaxLayer offset={0} speed={0.25}>
          <div className="animation_layer parallax" id="artback"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div className="animation_layer parallax" id="mountain"></div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={-1}
          className="animation_layer parallax"
        >
          <div className="flex justify-center mt-[30%] lg:mt-[15%]">
            <img src={logo} alt="logo" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.1} speed={-0.1}>
          <div className="animation_layer parallax" id="jungle1"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.25} speed={0.3}>
          <div className="animation_layer parallax" id="jungle1"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.25} speed={0.35}>
          <div className="animation_layer parallax" id="jungle2"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.25} speed={0.5}>
          <div className="animation_layer parallax" id="jungle3"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.3} speed={0.45}>
          <div className="animation_layer parallax" id="jungle4"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.27} speed={0.4}>
          <div className="animation_layer parallax" id="manonmountain"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.23} speed={0.3}>
          <div className="animation_layer parallax" id="jungle5"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0.9} speed={0.8}>
          <div
            className=" z-50 cursor-pointer flex justify-center items-center "
            onClick={handleScrollDown}
          >
            <div className="">
              <FaArrowDown
                className="text-white bg-black bg-opacity-50 rounded-full p-2 animate-bounce"
                size={42}
              />
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.25}>
          <div className="h-dvh bg-[#210002]">
            <div className="w-1/2 mx-auto flex flex-col items-center justify-center h-[70%]">
              <img src={logo} className="mb-8" alt="logo" />
              <div className="text-center">
                <p className="text-xs sm:text-sm md:text-lg text-[#ffaf1b] mt-10 mb-10">
                  Discover the best hiking trails in New York City with HikerAI.
                  We provide you with the best trails, so you can enjoy the
                  great outdoors without any hassle.
                </p>
                <Link to="/search">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-xs sm:text-md md:text-lg font-semibold mt-20">
                    Find a Hiking Trail
                  </button>
                </Link>
              </div>
            </div>
            <footer className="fixed w-full bottom-0 flex justify-center items-center text-center text-yellow-300 text-xs font-normal py-2 bg-gray-900 bg-opacity-50 ">
              Created With By HikerAI Team
            </footer>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default Home;
