"use client";

import { useState } from "react";
import Image from "next/image";

import { TrailProps } from "@types";
import CustomButton from "./CustomButton";
import TrailDetails from "./TrailDetails";

export interface TrailCardProps {
  trail: TrailProps;
}

export default function TrailCard({ trail }: TrailCardProps) {
  const { name, location, difficulty, length, noise, rating } = trail;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="trail-card group">
      <div className="trail-card__content">
        <h2 className="trail-card__content-title">{name}</h2>
        <p className="text-[14px]">{location}</p>
      </div>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src="https://cdn.onlyinyourstate.com/wp-content/uploads/2018/03/extra_large_3f8a776ebf0fb244626adc1d304e4931.jpg"
          alt="car model"
          fill
          priority
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/noise.png"
              width={30}
              height={30}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">{noise}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/difficulty.png"
              width={30}
              height={30}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">{difficulty}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/length.png"
              width={30}
              height={30}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">{length}</p>
          </div>{" "}
          <div className="trail-card__icon">
            <Image src="/rate.png" width={30} height={30} alt="seat" />
            <p className="trail-card__icon-text">{rating}</p>
          </div>
        </div>

        <div className="trail-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] bg-primary-blue rounded-full hover:bg-blue-800 transition-colors duration-300 ease-in-out"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            // rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <TrailDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        trail={trail}
      />
    </div>
  );
}
