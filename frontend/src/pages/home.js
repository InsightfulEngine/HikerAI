import React, { useState, useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "../App.css";
import logo from "../images/logo2.png";
import { Link } from "react-router-dom";
import ParallaxLoader from "../components/ParallaxLoader";
import ScrollingArrow from "../components/ScrollingArrow";

function Home() {
  const [parallaxReady, setParallaxReady] = useState(false);
  const parallaxRef = useRef(null);

  const handleParallaxReady = () => {
    setParallaxReady(true);
  };

  return (
    <div className="App">
      {!parallaxReady && <ParallaxLoader />}

      <Parallax
        pages={2}
        style={{ top: "0", left: "0" }}
        className="animation"
        ref={parallaxRef}
        onScroll={handleParallaxReady}
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

        <ParallaxLayer offset={0.9} speed={-10}>
          <ScrollingArrow targetRef={parallaxRef} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.25}>
          <div className="h-dvh bg-[#210002] flex flex-col justify-between animate-fadeIn">
            <div className="w-2/3 mx-auto flex flex-col items-center justify-center h-[70%]">
              <h1 className="cursor-default text-5xl sm:text-6xl font-bold tracking-wide ml-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 ">
                HIKER AI
              </h1>
              <h4 className="cursor-default mt-2 text-sm sm:text-md font-bold tracking-wide ml-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 ">
                HIKING {"   "} TRAIL {"   "} ADVISOR
              </h4>
              <div className="text-center space-y-6">
                <p className="text-md sm:text-lg md:text-xl text-[#ffaf1b] mt-10 mb-10 font-light leading-relaxed animate-slideIn">
                  Discover the finest hiking trails in New York City with
                  HikerAI. Enjoy the great outdoors without any hassle—we've got
                  you covered.
                </p>
                <Link to="/search">
                  <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600  text-white py-3 px-8 rounded-full text-xs sm:text-md md:text-lg font-semibold shadow-lg transform transition-transform hover:scale-105 mt-10 sm:mt-20 animate-bounceIn">
                    Find a Hiking Trail
                  </button>
                </Link>
              </div>
            </div>
            <footer className="w-full flex justify-center items-center text-center text-yellow-300 text-xs font-normal py-2 bg-gray-900 bg-opacity-50 border-t border-yellow-300">
              Created with ❤️ by the HikerAI Team
            </footer>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default Home;
