"use client";

import Image from "next/image";

import { CustomButton } from "@components";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find hiking trails quick and super easy!
        </h1>

        <p className="hero__subtitle">
          Discover the best hiking trails in New York City with HikerAI. We
          provide you with the best trails, so you can enjoy the great outdoors
          without any hassle.
        </p>

        <CustomButton
          title="Explore Trails"
          containerStyles="bg-primary-blue text-white rounded-full mt-10 hover:bg-blue-800 transition-colors duration-300 ease-in-out font-semibold px-8 py-3"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/heroo.png" alt="hero" fill className="object-contain" />
        </div>

        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
